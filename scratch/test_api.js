/**
 * Test script to evaluate server-side /api/triage endpoint with representative tickets:
 * 1. Clear Billing ticket (T01)
 * 2. Clear Technical ticket (T13)
 * 3. Multi-intent ticket (T21 / U08)
 * 4. Vague ticket (T28)
 * 5. Payment-flow error ticket (U04)
 */

const testTickets = [
  {
    type: "Clear Billing Ticket",
    ticket: {
      id: "T01",
      subject: "Unexpected subscription charge",
      customer_message: "I was charged ₹999 for my subscription this month. Can you explain what this charge is for?"
    }
  },
  {
    type: "Clear Technical Ticket",
    ticket: {
      id: "T13",
      subject: "Android app crashes",
      customer_message: "The Android app crashes every time I open the settings page."
    }
  },
  {
    type: "Multi-Intent Ticket",
    ticket: {
      id: "T21",
      subject: "Login and refund",
      customer_message: "I can't log into my account. Also, please refund my subscription."
    }
  },
  {
    type: "Vague Ticket",
    ticket: {
      id: "T28",
      subject: "Not working",
      customer_message: "It doesn't work."
    }
  },
  {
    type: "Payment-Flow Error Ticket",
    ticket: {
      id: "U04",
      subject: "Payment page keeps failing",
      customer_message: "I can't complete my subscription because the payment page keeps showing an error. I've tried three times."
    }
  }
];

async function runTests() {
  console.log("=== RUNNING SUPPORT TRIAGE AI BACKEND INTEGRATION TESTS ===\n");

  for (const item of testTickets) {
    console.log(`[TESTING]: ${item.type} (${item.ticket.id})`);
    console.log(`Subject: "${item.ticket.subject}"`);
    console.log(`Message: "${item.ticket.customer_message}"`);

    // Ground Truth Isolation Check: Verify NO expected_category or ground-truth fields are passed
    const payloadSent = {
      id: item.ticket.id,
      subject: item.ticket.subject,
      customer_message: item.ticket.customer_message
    };

    console.log(`Payload sent to backend (Ground truth isolated):`, JSON.stringify(payloadSent));

    try {
      const res = await fetch('http://localhost:8080/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadSent)
      });

      const responseData = await res.json();
      console.log(`HTTP Status: ${res.status}`);
      console.log(`Response Payload:`, JSON.stringify(responseData, null, 2));

      // Validate Schema compliance
      const keys = Object.keys(responseData);
      const expectedKeys = ["category", "confidence_score", "explanation", "missing_information", "detected_intents", "ambiguity_flag", "requires_human_review"];
      const missingKeys = expectedKeys.filter(k => !(k in responseData));

      if (missingKeys.length === 0) {
        console.log(`✅ Schema Validation: PASSED (All required keys present)`);
      } else {
        console.log(`❌ Schema Validation: FAILED (Missing keys: ${missingKeys.join(', ')})`);
      }
    } catch (err) {
      console.error(`❌ Request Failed:`, err.message);
    }
    console.log("-".repeat(60) + "\n");
  }
}

runTests();
