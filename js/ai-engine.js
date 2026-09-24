/**
 * Support Triage AI - AI Engine Module
 * Front-end AI engine communicating with secure backend /api/triage endpoint.
 * Zero API keys exposed to browser client.
 */

import { MOCK_AI_PREDICTIONS } from './dataset.js';

export class AITriageEngine {
  constructor(config = {}) {
    this.mode = config.mode || 'mock'; // 'mock' | 'api' | 'simulate_error'
  }

  setMode(mode) {
    this.mode = mode;
  }

  /**
   * Classifies a ticket object.
   * @param {Object} ticket - { id, subject, customer_message }
   * @returns {Promise<Object>} Triage prediction object
   */
  async classifyTicket(ticket) {
    if (this.mode === 'simulate_error') {
      return this.handleError(ticket, new Error("Simulated Provider Network Timeout (504 Service Unavailable)"));
    }

    if (this.mode === 'api') {
      try {
        return await this.callBackendTriageAPI(ticket);
      } catch (err) {
        console.warn("Backend Gemini API call failed, falling back to mock prediction wrapper:", err);
        return this.handleError(ticket, err);
      }
    }

    // Default: Mock Offline Engine (Pre-computed V2 predictions)
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResult = MOCK_AI_PREDICTIONS[ticket.id] || this.fallbackRuleBasedTriage(ticket);
        resolve(this.validateAndNormalizeSchema(ticket.id, mockResult));
      }, 300); // Realistic slight latency simulation
    });
  }

  /**
   * Calls secure backend server endpoint /api/triage.
   * API key is kept exclusively on backend server.
   */
  async callBackendTriageAPI(ticket) {
    // Ground Truth Isolation: Only send content fields
    const payload = {
      id: ticket.id,
      subject: ticket.subject,
      customer_message: ticket.customer_message
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s client timeout

    try {
      const response = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server HTTP ${response.status}`);
      }

      const data = await response.json();
      return this.validateAndNormalizeSchema(ticket.id, data);
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error('API Request timed out after 12 seconds');
      }
      throw err;
    }
  }

  /**
   * Rule-based fallback if ticket is not in mock pre-computed database.
   */
  fallbackRuleBasedTriage(ticket) {
    const text = (ticket.subject + " " + ticket.customer_message).toLowerCase();
    const intents = [];

    if (text.includes("refund") || text.includes("money back") || text.includes("return")) intents.push("Refund");
    if (text.includes("charge") || text.includes("billed") || text.includes("payment") || text.includes("invoice")) intents.push("Billing");
    if (text.includes("login") || text.includes("password") || text.includes("otp") || text.includes("sign in")) intents.push("Login");
    if (text.includes("crash") || text.includes("error") || text.includes("bug") || text.includes("button") || text.includes("not working")) intents.push("Technical");

    const isMultiIntent = intents.length >= 2;
    const isVague = intents.length === 0;

    let category = "Needs Review";
    let confidence = 0.50;
    let explanation = "Fallback classifier detected multiple or unclear intents.";
    let ambiguity = isMultiIntent || isVague;
    let missingInfo = [];

    if (!isMultiIntent && !isVague) {
      category = intents[0];
      confidence = 0.85;
      explanation = `Ticket mentions keywords related to ${category}.`;
    } else if (isMultiIntent) {
      explanation = `Ticket contains competing intents (${intents.join(" and ")}). Sent for human review.`;
      confidence = 0.45;
    } else {
      explanation = "Message text is ambiguous or lacks specific problem context.";
      confidence = 0.20;
      missingInfo = ["Detailed problem description"];
    }

    return {
      id: ticket.id,
      category: confidence < 0.70 ? "Needs Review" : category,
      confidence_score: confidence,
      explanation: explanation,
      missing_information: missingInfo,
      detected_intents: intents.length > 0 ? intents : ["Unclear"],
      ambiguity_flag: ambiguity,
      requires_human_review: confidence < 0.70 || ambiguity
    };
  }

  /**
   * Validates & normalizes AI output schema to guarantee application stability.
   */
  validateAndNormalizeSchema(ticketId, raw) {
    const validCategories = ["Billing", "Login", "Refund", "Technical", "Needs Review"];
    let category = validCategories.includes(raw.category) ? raw.category : "Needs Review";
    let confidence = typeof raw.confidence_score === "number" ? Math.max(0, Math.min(1, raw.confidence_score)) : 0.5;
    let explanation = raw.explanation || "No rationale provided by classifier.";
    let missingInfo = Array.isArray(raw.missing_information) ? raw.missing_information : [];
    let intents = Array.isArray(raw.detected_intents) ? raw.detected_intents : [];
    let ambiguity = Boolean(raw.ambiguity_flag);
    let requiresReview = Boolean(raw.requires_human_review);

    // Enforce guardrail constraints
    if (confidence < 0.70 || ambiguity) {
      category = "Needs Review";
      requiresReview = true;
    }

    return {
      id: ticketId,
      category,
      confidence_score: confidence,
      explanation,
      missing_information: missingInfo,
      detected_intents: intents,
      ambiguity_flag: ambiguity,
      requires_human_review: requiresReview,
      is_fallback_error: false
    };
  }

  /**
   * Fallback object on API or network errors.
   */
  handleError(ticket, error) {
    return {
      id: ticket.id,
      category: "Needs Review",
      confidence_score: 0.00,
      explanation: `System Error: Unable to run AI triage (${error.message || 'Network Timeout'}). Flagged for manual agent review.`,
      missing_information: ["System Log Audit"],
      detected_intents: ["System Failure"],
      ambiguity_flag: true,
      requires_human_review: true,
      is_fallback_error: true
    };
  }
}
