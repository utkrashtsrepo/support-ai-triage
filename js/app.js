/**
 * Support Triage AI - Main Application Module
 * Controls state management, keyboard shortcuts, UI rendering, agent human-in-the-loop workflows.
 * Quiet Luxury & Premium Modern SaaS Aesthetic
 */

import { INITIAL_TICKETS } from './dataset.js';
import { AITriageEngine } from './ai-engine.js';

class TriageApp {
  constructor() {
    this.tickets = [...INITIAL_TICKETS];
    this.currentTicket = null;
    this.aiPredictions = {};
    this.agentDecisions = {}; // Stores human override/approval/feedback status
    this.activeFilter = 'all';
    
    this.aiEngine = new AITriageEngine({ mode: 'mock' });

    this.initElements();
    this.initEventListeners();
    this.loadTickets();
  }

  initElements() {
    this.inboxList = document.getElementById('inbox-list');
    this.searchInput = document.getElementById('search-input');
    this.inboxCount = document.getElementById('inbox-count');

    // Detail Panel
    this.detailSubject = document.getElementById('detail-subject');
    this.detailTicketId = document.getElementById('detail-ticket-id');
    this.customerName = document.getElementById('customer-name');
    this.customerEmail = document.getElementById('customer-email');
    this.customerAvatar = document.getElementById('customer-avatar');
    this.messageText = document.getElementById('message-text');
    this.messageTime = document.getElementById('message-time');

    // Operational Context & Activity Timeline Elements
    this.metaTicketId = document.getElementById('meta-ticket-id');
    this.metaCustomerName = document.getElementById('meta-customer-name');
    this.metaCustomerEmail = document.getElementById('meta-customer-email');
    this.metaReceivedTime = document.getElementById('meta-received-time');
    this.metaDatasetType = document.getElementById('meta-dataset-type');
    this.metaActionState = document.getElementById('meta-action-state');
    this.activityTimeline = document.getElementById('activity-timeline');

    // AI Copilot Panel
    this.recCategoryBadge = document.getElementById('rec-category-badge');
    this.confidenceScore = document.getElementById('confidence-score');
    this.progressBarFill = document.getElementById('progress-bar-fill');
    this.explanationText = document.getElementById('explanation-text');
    this.intentsList = document.getElementById('intents-list');
    this.missingInfoSection = document.getElementById('missing-info-section');
    this.missingInfoList = document.getElementById('missing-info-list');
    this.copyPromptBtn = document.getElementById('copy-prompt-btn');

    // Ambiguity / Review Warning Box
    this.reviewWarningBox = document.getElementById('review-warning-box');
    this.reviewWarningText = document.getElementById('review-warning-text');

    // Action Buttons
    this.btnApprove = document.getElementById('btn-approve');
    this.btnOverride = document.getElementById('btn-override');
    this.btnReview = document.getElementById('btn-review');
    this.btnResetAction = document.getElementById('btn-reset-action');
    this.btnFeedback = document.getElementById('btn-feedback');
    this.btnShortcutsHelp = document.getElementById('btn-shortcuts-help');

    // Overlays & Modals
    this.overrideModal = document.getElementById('override-modal');
    this.shortcutsModal = document.getElementById('shortcuts-modal');
    this.feedbackModal = document.getElementById('feedback-modal');
    this.toastContainer = document.getElementById('toast-container');
    
    // Status badges
    this.currentStatusBadge = document.getElementById('current-status-badge');
  }

  initEventListeners() {
    // Search
    this.searchInput.addEventListener('input', (e) => this.filterTickets(e.target.value));

    // Preset State Filters
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.dataset.filter;
        this.renderInbox();
      });
    });

    // Action Handlers
    this.btnApprove.addEventListener('click', () => this.handleAgentApprove());
    this.btnOverride.addEventListener('click', () => this.openOverrideModal());
    this.btnReview.addEventListener('click', () => this.handleAgentSendReview());
    this.btnResetAction.addEventListener('click', () => this.handleResetAction());
    this.btnFeedback.addEventListener('click', () => this.openFeedbackModal());
    this.btnShortcutsHelp.addEventListener('click', () => this.openShortcutsModal());
    this.copyPromptBtn.addEventListener('click', () => this.handleCopyPrompt());

    // Modal Closes
    document.querySelectorAll('.close-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => this.closeModals());
    });

    // Feedback Submission
    document.querySelectorAll('.feedback-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const rating = btn.dataset.rating;
        this.handleFeedbackSubmit(rating);
        this.closeModals();
      });
    });

    // Override Category Selection
    document.querySelectorAll('.override-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedCat = btn.dataset.category;
        this.handleAgentOverride(selectedCat);
        this.closeModals();
      });
    });

    // Mode Switcher (Mock vs API vs Error Simulation)
    document.getElementById('mode-select')?.addEventListener('change', async (e) => {
      const mode = e.target.value;
      this.aiEngine.setMode(mode);
      this.showToast(`AI Engine mode set to: ${mode.toUpperCase()}`);
      
      // Clear cached predictions for current engine mode re-evaluation
      this.aiPredictions = {};
      await this.preloadPredictions();
      if (this.currentTicket) {
        this.selectTicket(this.currentTicket.id);
      }
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      if (e.key === 'Escape') this.closeModals();
      if (e.key === '?') this.openShortcutsModal();
      if (e.key.toLowerCase() === 'a') this.handleAgentApprove();
      if (e.key.toLowerCase() === 'o') this.openOverrideModal();
      if (e.key.toLowerCase() === 'r') this.handleAgentSendReview();
      if (e.key.toLowerCase() === 'f') this.openFeedbackModal();
      if (e.key.toLowerCase() === 'j') this.navigateTicket(1);
      if (e.key.toLowerCase() === 'k') this.navigateTicket(-1);
    });
  }

  async loadTickets() {
    await this.preloadPredictions();
    this.renderInbox();
    if (this.tickets.length > 0) {
      this.selectTicket(this.tickets[0].id);
    }
  }

  async preloadPredictions() {
    // Pre-populate predictions for all initial tickets for seamless inbox badge rendering
    const promises = this.tickets.map(async (t) => {
      if (!this.aiPredictions[t.id]) {
        this.aiPredictions[t.id] = await this.aiEngine.classifyTicket(t);
      }
    });
    await Promise.all(promises);
  }

  filterTickets() {
    this.renderInbox();
  }

  renderInbox() {
    this.inboxList.innerHTML = '';
    const query = this.searchInput.value.toLowerCase();

    const filtered = this.tickets.filter(ticket => {
      const matchesSearch = ticket.subject.toLowerCase().includes(query) || 
                            ticket.customer_message.toLowerCase().includes(query) ||
                            ticket.id.toLowerCase().includes(query);
      
      if (!matchesSearch) return false;

      const pred = this.aiPredictions[ticket.id];
      const decision = this.agentDecisions[ticket.id];

      if (this.activeFilter === 'all') return true;
      if (this.activeFilter === 'review') return pred?.requires_human_review || pred?.category === 'Needs Review';
      if (this.activeFilter === 'missing_info') return pred?.missing_information?.length > 0;
      if (this.activeFilter === 'multi_intent') return pred?.ambiguity_flag || pred?.detected_intents?.length > 1;
      if (this.activeFilter === 'high_confidence') return pred && pred.confidence_score >= 0.85 && !pred.ambiguity_flag;
      if (this.activeFilter === 'actioned') return decision !== undefined;

      return true;
    });

    // Dynamic header count derived from actual filtered dataset length
    this.inboxCount.textContent = `${filtered.length} tickets`;

    // Render Empty State if 0 matching items
    if (filtered.length === 0) {
      this.inboxList.innerHTML = `
        <div class="empty-state-card">
          <div class="empty-state-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>
          </div>
          <div class="empty-state-title">No tickets match criteria</div>
          <div class="empty-state-desc">Try clearing your search query or selecting a different queue filter.</div>
          <button class="btn btn-secondary" id="btn-reset-filters" style="font-size: 11px; padding: 6px 12px; margin: 0 auto; width: auto;">Reset Queue Filters</button>
        </div>
      `;

      document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
        this.searchInput.value = '';
        this.activeFilter = 'all';
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('preset-all')?.classList.add('active');
        this.renderInbox();
      });

      return;
    }

    // Render ALL filtered ticket cards in scrollable inbox container
    filtered.forEach(ticket => {
      const card = document.createElement('div');
      card.className = `ticket-card ${this.currentTicket?.id === ticket.id ? 'selected' : ''}`;
      card.dataset.id = ticket.id;

      const pred = this.aiPredictions[ticket.id];
      const decision = this.agentDecisions[ticket.id];

      const categoryName = decision ? decision.final_category : (pred ? pred.category : 'Processing...');
      const categoryClass = this.getCategoryBadgeClass(categoryName);

      let decisionTagHTML = '';
      if (decision) {
        if (decision.type === 'approve') decisionTagHTML = `<span class="badge badge-status-approved">Approved</span>`;
        else if (decision.type === 'override') decisionTagHTML = `<span class="badge badge-status-override">Overridden</span>`;
        else if (decision.type === 'review') decisionTagHTML = `<span class="badge badge-status-review">In Review</span>`;
      } else if (pred?.requires_human_review) {
        decisionTagHTML = `<span class="badge badge-review">Needs Review</span>`;
      }

      card.innerHTML = `
        <div class="ticket-meta-top">
          <span class="ticket-id">${ticket.id}</span>
          <span class="ticket-time">${ticket.created_at}</span>
        </div>
        <div class="ticket-subject">${this.escapeHTML(ticket.subject)}</div>
        <div class="ticket-snippet">${this.escapeHTML(ticket.customer_message)}</div>
        <div class="ticket-tags">
          <span class="badge ${categoryClass}">${categoryName}</span>
          ${pred ? `<span class="badge badge-subtle">${Math.round(pred.confidence_score * 100)}%</span>` : ''}
          ${decisionTagHTML}
        </div>
      `;

      card.addEventListener('click', () => this.selectTicket(ticket.id));
      this.inboxList.appendChild(card);
    });

    if (this.currentTicket) {
      const selectedCard = this.inboxList.querySelector(`.ticket-card[data-id="${this.currentTicket.id}"]`);
      selectedCard?.scrollIntoView({ block: 'nearest' });
    }
  }

  async selectTicket(id) {
    const ticket = this.tickets.find(t => t.id === id);
    if (!ticket) return;

    this.currentTicket = ticket;
    this.renderInbox();

    // Render Ticket Details
    this.detailSubject.textContent = ticket.subject;
    this.detailTicketId.textContent = ticket.id;
    this.customerName.textContent = ticket.customer_name || 'Customer';
    this.customerEmail.textContent = ticket.customer_email || 'user@example.com';
    this.customerAvatar.textContent = (ticket.customer_name || 'C').charAt(0);
    this.messageText.textContent = ticket.customer_message;
    this.messageTime.textContent = `Received ${ticket.created_at}`;

    // Process Triage via AI Engine
    await this.processTicketTriage(ticket);
  }

  async processTicketTriage(ticket) {
    let pred = this.aiPredictions[ticket.id];
    if (!pred) {
      pred = await this.aiEngine.classifyTicket(ticket);
      this.aiPredictions[ticket.id] = pred;
      this.renderInbox();
    }

    this.renderCopilotPanel(ticket, pred);
  }

  renderCopilotPanel(ticket, pred) {
    const decision = this.agentDecisions[ticket.id];
    const categoryToDisplay = decision ? decision.final_category : pred.category;
    const badgeClass = this.getCategoryBadgeClass(categoryToDisplay);

    // Hero Badge
    this.recCategoryBadge.className = `rec-badge-large ${badgeClass}`;
    this.recCategoryBadge.textContent = categoryToDisplay;

    // Confidence Score
    const confPct = Math.round(pred.confidence_score * 100);
    this.confidenceScore.textContent = `${confPct}%`;
    this.progressBarFill.style.width = `${confPct}%`;
    
    if (pred.confidence_score >= 0.70) {
      this.progressBarFill.style.background = '#047857'; // muted emerald
    } else {
      this.progressBarFill.style.background = '#be123c'; // muted rose
    }

    // Explanation
    this.explanationText.innerHTML = this.highlightKeywords(pred.explanation);

    // Detected Intents
    this.intentsList.innerHTML = '';
    (pred.detected_intents || []).forEach(intent => {
      const pill = document.createElement('span');
      pill.className = 'intent-pill';
      pill.textContent = intent;
      this.intentsList.appendChild(pill);
    });

    // Missing Information Section
    if (pred.missing_information && pred.missing_information.length > 0) {
      this.missingInfoSection.style.display = 'block';
      this.missingInfoList.innerHTML = '';
      pred.missing_information.forEach(info => {
        const item = document.createElement('div');
        item.className = 'missing-info-item';
        item.innerHTML = `<span>Missing: ${this.escapeHTML(info)}</span>`;
        this.missingInfoList.appendChild(item);
      });
    } else {
      this.missingInfoSection.style.display = 'none';
    }

    // Ambiguity / Review Warning Box
    if (pred.requires_human_review || pred.ambiguity_flag || pred.is_fallback_error) {
      this.reviewWarningBox.style.display = 'block';
      if (pred.is_fallback_error) {
        this.reviewWarningText.textContent = `Provider execution failed (504). Routed to Needs Review for manual handling.`;
      } else if (pred.ambiguity_flag) {
        this.reviewWarningText.textContent = `Multi-intent ambiguity detected. Human review recommended.`;
      } else {
        this.reviewWarningText.textContent = `Low confidence score (< 70%). Human review recommended.`;
      }
    } else {
      this.reviewWarningBox.style.display = 'none';
    }

    // Update Status Badge & Action Controls
    if (decision) {
      this.currentStatusBadge.className = `badge ${decision.type === 'approve' ? 'badge-status-approved' : 'badge-status-override'}`;
      this.currentStatusBadge.textContent = decision.type === 'approve' ? 'Status: Approved' : `Status: Overridden (${decision.final_category})`;
      this.btnResetAction.style.display = 'flex';
    } else {
      this.currentStatusBadge.className = 'badge badge-subtle';
      this.currentStatusBadge.textContent = 'Status: Pending Action';
      this.btnResetAction.style.display = 'none';
    }

    // Render Operational Context & Timeline in Center Column
    this.renderCenterContextAndTimeline(ticket, pred);
  }

  renderCenterContextAndTimeline(ticket, pred) {
    if (!ticket) return;
    const decision = this.agentDecisions[ticket.id];

    // Context metadata
    if (this.metaTicketId) this.metaTicketId.textContent = ticket.id;
    if (this.metaCustomerName) this.metaCustomerName.textContent = ticket.customer_name || 'Customer';
    if (this.metaCustomerEmail) this.metaCustomerEmail.textContent = ticket.customer_email || 'user@example.com';
    if (this.metaReceivedTime) this.metaReceivedTime.textContent = ticket.created_at;
    if (this.metaDatasetType) this.metaDatasetType.textContent = ticket.type || 'standard_ticket';

    let actionStateText = 'Pending Review';
    if (decision) {
      if (decision.type === 'approve') actionStateText = `Approved (${decision.final_category})`;
      else if (decision.type === 'override') actionStateText = `Overridden (${decision.final_category})`;
      else if (decision.type === 'review') actionStateText = 'In Senior Review';
    } else if (pred?.requires_human_review) {
      actionStateText = 'Needs Review Signal';
    }
    if (this.metaActionState) this.metaActionState.textContent = actionStateText;

    // Build timeline items
    if (!this.activityTimeline) return;
    this.activityTimeline.innerHTML = '';

    // 1. Ticket Received Event
    const eventReceived = document.createElement('div');
    eventReceived.className = 'timeline-item';
    eventReceived.innerHTML = `
      <div class="timeline-dot dot-received"></div>
      <div class="timeline-header-row">
        <span class="timeline-title">Ticket Ingested</span>
        <span class="timeline-time">${ticket.created_at}</span>
      </div>
      <div class="timeline-desc">Inbound support query received from ${this.escapeHTML(ticket.customer_name || 'Customer')} via gateway.</div>
    `;
    this.activityTimeline.appendChild(eventReceived);

    // 2. AI Analysis Completed Event
    if (pred) {
      const eventAI = document.createElement('div');
      eventAI.className = 'timeline-item';
      eventAI.innerHTML = `
        <div class="timeline-dot dot-ai"></div>
        <div class="timeline-header-row">
          <span class="timeline-title">AI Copilot Analysis Completed</span>
          <span class="timeline-time">Automated</span>
        </div>
        <div class="timeline-desc">Generated confidence score of <strong>${Math.round(pred.confidence_score * 100)}%</strong> across ${(pred.detected_intents || []).length} detected intent(s).</div>
      `;
      this.activityTimeline.appendChild(eventAI);
    }

    // 3. Agent Decision / Activity Event
    const eventAgent = document.createElement('div');
    eventAgent.className = 'timeline-item';

    if (decision) {
      const timeStr = decision.timestamp ? new Date(decision.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently';
      if (decision.type === 'approve') {
        eventAgent.innerHTML = `
          <div class="timeline-dot dot-approved"></div>
          <div class="timeline-header-row">
            <span class="timeline-title">Recommendation Approved</span>
            <span class="timeline-time">${timeStr}</span>
          </div>
          <div class="timeline-desc">Agent validated category <strong>${this.escapeHTML(decision.final_category)}</strong>. Ticket queued for execution.</div>
        `;
      } else if (decision.type === 'override') {
        eventAgent.innerHTML = `
          <div class="timeline-dot dot-override"></div>
          <div class="timeline-header-row">
            <span class="timeline-title">Category Overridden</span>
            <span class="timeline-time">${timeStr}</span>
          </div>
          <div class="timeline-desc">Agent adjusted category from <em>${this.escapeHTML(decision.original_category || 'AI default')}</em> to <strong>${this.escapeHTML(decision.final_category)}</strong>.</div>
        `;
      } else if (decision.type === 'review') {
        eventAgent.innerHTML = `
          <div class="timeline-dot dot-review"></div>
          <div class="timeline-header-row">
            <span class="timeline-title">Sent to Senior Review</span>
            <span class="timeline-time">${timeStr}</span>
          </div>
          <div class="timeline-desc">Agent flagged ticket for Tier 2 manual inspection.</div>
        `;
      }
      this.activityTimeline.appendChild(eventAgent);

      // Feedback event if present
      if (decision.feedback) {
        const eventFeedback = document.createElement('div');
        eventFeedback.className = 'timeline-item';
        eventFeedback.innerHTML = `
          <div class="timeline-dot dot-received"></div>
          <div class="timeline-header-row">
            <span class="timeline-title">Agent Feedback Logged</span>
            <span class="timeline-time">Logged</span>
          </div>
          <div class="timeline-desc">Rating recorded: <strong>${decision.feedback === 'accurate' ? 'Accurate Model Output' : 'Inaccurate / Hallucinated'}</strong>.</div>
        `;
        this.activityTimeline.appendChild(eventFeedback);
      }
    } else {
      eventAgent.innerHTML = `
        <div class="timeline-dot dot-pending"></div>
        <div class="timeline-header-row">
          <span class="timeline-title">Awaiting Agent Decision</span>
          <span class="timeline-time">Pending</span>
        </div>
        <div class="timeline-desc">Ticket is open in copilot workspace awaiting Tier 1 agent approval or override.</div>
      `;
      this.activityTimeline.appendChild(eventAgent);
    }
  }

  handleAgentApprove() {
    if (!this.currentTicket) return;
    const pred = this.aiPredictions[this.currentTicket.id];
    if (!pred) return;

    this.agentDecisions[this.currentTicket.id] = {
      type: 'approve',
      final_category: pred.category,
      timestamp: new Date().toISOString()
    };

    this.showToast(`Category "${pred.category}" approved`);
    this.renderInbox();
    this.renderCopilotPanel(this.currentTicket, pred);
  }

  handleAgentOverride(newCategory) {
    if (!this.currentTicket) return;
    const pred = this.aiPredictions[this.currentTicket.id];

    this.agentDecisions[this.currentTicket.id] = {
      type: 'override',
      original_category: pred?.category,
      final_category: newCategory,
      timestamp: new Date().toISOString()
    };

    this.showToast(`Category overridden to "${newCategory}"`);
    this.renderInbox();
    this.renderCopilotPanel(this.currentTicket, pred);
  }

  handleAgentSendReview() {
    if (!this.currentTicket) return;
    
    this.agentDecisions[this.currentTicket.id] = {
      type: 'review',
      final_category: 'Needs Review',
      timestamp: new Date().toISOString()
    };

    this.showToast(`Ticket escalated to Senior Review queue`);
    this.renderInbox();
    if (this.aiPredictions[this.currentTicket.id]) {
      this.renderCopilotPanel(this.currentTicket, this.aiPredictions[this.currentTicket.id]);
    }
  }

  handleResetAction() {
    if (!this.currentTicket) return;
    delete this.agentDecisions[this.currentTicket.id];
    this.showToast(`Agent action reset to pending`);
    this.renderInbox();
    if (this.aiPredictions[this.currentTicket.id]) {
      this.renderCopilotPanel(this.currentTicket, this.aiPredictions[this.currentTicket.id]);
    }
  }

  handleFeedbackSubmit(rating) {
    if (!this.currentTicket) return;
    if (!this.agentDecisions[this.currentTicket.id]) {
      this.agentDecisions[this.currentTicket.id] = {
        type: 'feedback_only',
        final_category: this.aiPredictions[this.currentTicket.id]?.category || 'Needs Review',
        timestamp: new Date().toISOString()
      };
    }
    this.agentDecisions[this.currentTicket.id].feedback = rating;
    this.showToast(`Model feedback logged: ${rating === 'accurate' ? 'Category Accurate' : 'Inaccurate / Hallucinated'}`);
    const pred = this.aiPredictions[this.currentTicket.id];
    if (pred) this.renderCopilotPanel(this.currentTicket, pred);
  }

  handleCopyPrompt() {
    if (!this.currentTicket) return;
    const pred = this.aiPredictions[this.currentTicket.id];
    if (!pred || !pred.missing_information || pred.missing_information.length === 0) return;

    const cannedPrompt = `Hi ${this.currentTicket.customer_name || 'Customer'},\n\nThank you for reaching out to support. To assist with your request, could you please provide the following details:\n- ${pred.missing_information.join("\n- ")}\n\nThank you,\nSupport Operations`;

    navigator.clipboard.writeText(cannedPrompt);
    this.showToast(`Response macro copied to clipboard`);
  }

  openOverrideModal() {
    this.overrideModal.classList.add('active');
  }

  openFeedbackModal() {
    this.feedbackModal.classList.add('active');
  }

  openShortcutsModal() {
    this.shortcutsModal.classList.add('active');
  }

  closeModals() {
    this.overrideModal.classList.remove('active');
    this.feedbackModal.classList.remove('active');
    this.shortcutsModal.classList.remove('active');
  }

  navigateTicket(direction) {
    const currentIndex = this.tickets.findIndex(t => t.id === this.currentTicket?.id);
    if (currentIndex === -1) return;
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < this.tickets.length) {
      this.selectTicket(this.tickets[newIndex].id);
    }
  }

  getCategoryBadgeClass(category) {
    switch (category) {
      case 'Billing': return 'badge-billing';
      case 'Login': return 'badge-login';
      case 'Refund': return 'badge-refund';
      case 'Technical': return 'badge-technical';
      default: return 'badge-review';
    }
  }

  highlightKeywords(text) {
    if (!text) return '';
    return text.replace(/(billing|charge|payment|refund|login|password|otp|crashes|error|export|500|declined|invoice)/gi, '<strong>$1</strong>');
  }

  escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    this.toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new TriageApp();
});
