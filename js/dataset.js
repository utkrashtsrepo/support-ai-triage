/**
 * Support Triage AI - Dataset Module
 * Contains complete authentic ticket dataset (T01-T30 from tickets.json + U01-U10 from unseen_tickets.json)
 * for development, testing, and offline demo mode.
 */

export const INITIAL_TICKETS = [
  {
    "id": "T01",
    "type": "clear_billing",
    "subject": "Unexpected subscription charge",
    "customer_message": "I was charged ₹999 for my subscription this month. Can you explain what this charge is for?",
    "customer_name": "Rajesh Kumar",
    "customer_email": "rajesh.k@example.com",
    "created_at": "10 mins ago"
  },
  {
    "id": "T02",
    "type": "clear_billing",
    "subject": "Payment failed during renewal",
    "customer_message": "My card was declined when I tried to renew my subscription.",
    "customer_name": "Anita Sharma",
    "customer_email": "anita.s@example.com",
    "created_at": "22 mins ago"
  },
  {
    "id": "T03",
    "type": "clear_billing",
    "subject": "Duplicate subscription charge",
    "customer_message": "I see two identical charges of ₹499 on my bank statement for the same subscription.",
    "customer_name": "Vikram Patel",
    "customer_email": "vikram.p@example.com",
    "created_at": "35 mins ago"
  },
  {
    "id": "T04",
    "type": "clear_billing",
    "subject": "Request for invoice",
    "customer_message": "Can I get an invoice for my payment from yesterday?",
    "customer_name": "Sophia Chen",
    "customer_email": "sophia.c@example.com",
    "created_at": "48 mins ago"
  },
  {
    "id": "T05",
    "type": "clear_login",
    "subject": "Forgot password",
    "customer_message": "I forgot my password and can't log into my account.",
    "customer_name": "David Miller",
    "customer_email": "david.m@example.com",
    "created_at": "1 hour ago"
  },
  {
    "id": "T06",
    "type": "clear_login",
    "subject": "OTP not arriving",
    "customer_message": "The OTP never arrives when I try to sign in.",
    "customer_name": "Priya Nair",
    "customer_email": "priya.n@example.com",
    "created_at": "1.2 hours ago"
  },
  {
    "id": "T07",
    "type": "clear_login",
    "subject": "Login rejected",
    "customer_message": "My account credentials are correct but the website keeps rejecting my login.",
    "customer_name": "Marcus Vance",
    "customer_email": "marcus.v@example.com",
    "created_at": "1.5 hours ago"
  },
  {
    "id": "T08",
    "type": "clear_login",
    "subject": "Password reset instructions",
    "customer_message": "How do I reset my account password?",
    "customer_name": "Elena Rostova",
    "customer_email": "elena.r@example.com",
    "created_at": "2 hours ago"
  },
  {
    "id": "T09",
    "type": "clear_refund",
    "subject": "Refund request",
    "customer_message": "I want a refund for my subscription.",
    "customer_name": "Liam O'Connor",
    "customer_email": "liam.oc@example.com",
    "created_at": "2.2 hours ago"
  },
  {
    "id": "T10",
    "type": "clear_refund",
    "subject": "Refund status",
    "customer_message": "I cancelled my subscription last week. When will I receive my refund?",
    "customer_name": "Fatima Al-Mansoor",
    "customer_email": "fatima.a@example.com",
    "created_at": "2.5 hours ago"
  },
  {
    "id": "T11",
    "type": "clear_refund",
    "subject": "Return subscription payment",
    "customer_message": "Please return the ₹799 I paid for this month's subscription.",
    "customer_name": "Arjun Das",
    "customer_email": "arjun.d@example.com",
    "created_at": "3 hours ago"
  },
  {
    "id": "T12",
    "type": "clear_refund",
    "subject": "Refund not received",
    "customer_message": "My refund was approved three days ago but I haven't received the money yet.",
    "customer_name": "Chloe Dubois",
    "customer_email": "chloe.d@example.com",
    "created_at": "3.5 hours ago"
  },
  {
    "id": "T13",
    "type": "clear_technical",
    "subject": "Android app crashes",
    "customer_message": "The Android app crashes every time I open the settings page.",
    "customer_name": "Kenji Sato",
    "customer_email": "kenji.s@example.com",
    "created_at": "4 hours ago"
  },
  {
    "id": "T14",
    "type": "clear_technical",
    "subject": "Export button not working",
    "customer_message": "The export button does nothing when I click it.",
    "customer_name": "Sarah Jenkins",
    "customer_email": "sarah.j@example.com",
    "created_at": "4.2 hours ago"
  },
  {
    "id": "T15",
    "type": "clear_technical",
    "subject": "500 error during upload",
    "customer_message": "I'm getting a 500 error when trying to upload a file.",
    "customer_name": "Alex Rivera",
    "customer_email": "alex.r@example.com",
    "created_at": "4.5 hours ago"
  },
  {
    "id": "T16",
    "type": "clear_technical",
    "subject": "Dashboard stuck loading",
    "customer_message": "The dashboard has been loading indefinitely for the last ten minutes.",
    "customer_name": "Nisha Gupta",
    "customer_email": "nisha.g@example.com",
    "created_at": "5 hours ago"
  },
  {
    "id": "T17",
    "type": "boundary",
    "subject": "Duplicate charge refund request",
    "customer_message": "I was charged twice. Can I get one of the payments back?",
    "customer_name": "Omar Farooq",
    "customer_email": "omar.f@example.com",
    "created_at": "5.5 hours ago"
  },
  {
    "id": "T18",
    "type": "boundary",
    "subject": "Login blocked by payment issue",
    "customer_message": "I can't log in because my subscription payment failed.",
    "customer_name": "Hannah Abbott",
    "customer_email": "hannah.a@example.com",
    "created_at": "6 hours ago"
  },
  {
    "id": "T19",
    "type": "boundary",
    "subject": "Charged after cancellation",
    "customer_message": "Why was I charged after I cancelled my subscription?",
    "customer_name": "Mateo Rossi",
    "customer_email": "mateo.r@example.com",
    "created_at": "6.5 hours ago"
  },
  {
    "id": "T20",
    "type": "boundary",
    "subject": "App broken and possible charge",
    "customer_message": "The app isn't working and I think I was charged for it too.",
    "customer_name": "Zoe Taylor",
    "customer_email": "zoe.t@example.com",
    "created_at": "7 hours ago"
  },
  {
    "id": "T21",
    "type": "multi_intent",
    "subject": "Login and refund",
    "customer_message": "I can't log into my account. Also, please refund my subscription.",
    "customer_name": "Lucas Silva",
    "customer_email": "lucas.s@example.com",
    "created_at": "7.5 hours ago"
  },
  {
    "id": "T22",
    "type": "multi_intent",
    "subject": "App crash and duplicate charge",
    "customer_message": "The app keeps crashing and I was charged twice this month.",
    "customer_name": "Emily Watson",
    "customer_email": "emily.w@example.com",
    "created_at": "8 hours ago"
  },
  {
    "id": "T23",
    "type": "multi_intent",
    "subject": "Password reset and refund",
    "customer_message": "My password reset isn't working, and I want to cancel and get my money back.",
    "customer_name": "Tariq Ali",
    "customer_email": "tariq.a@example.com",
    "created_at": "8.5 hours ago"
  },
  {
    "id": "T24",
    "type": "multi_intent",
    "subject": "Account access and payment error",
    "customer_message": "I can't access my account and the payment page is also showing an error.",
    "customer_name": "Laura Gomez",
    "customer_email": "laura.g@example.com",
    "created_at": "9 hours ago"
  },
  {
    "id": "T25",
    "type": "missing_information",
    "subject": "App crashes",
    "customer_message": "The app crashes whenever I open it.",
    "customer_name": "Kevin Zhang",
    "customer_email": "kevin.z@example.com",
    "created_at": "9.5 hours ago"
  },
  {
    "id": "T26",
    "type": "missing_information",
    "subject": "Refund for purchase",
    "customer_message": "I need a refund for my purchase.",
    "customer_name": "Isabella Santos",
    "customer_email": "isabella.s@example.com",
    "created_at": "10 hours ago"
  },
  {
    "id": "T27",
    "type": "missing_information",
    "subject": "Can't log in",
    "customer_message": "I can't log in to my account.",
    "customer_name": "Daniel Kim",
    "customer_email": "daniel.k@example.com",
    "created_at": "11 hours ago"
  },
  {
    "id": "T28",
    "type": "edge_case",
    "subject": "Not working",
    "customer_message": "It doesn't work.",
    "customer_name": "Anonymous User",
    "customer_email": "user.anon@example.com",
    "created_at": "12 hours ago"
  },
  {
    "id": "T29",
    "type": "edge_case",
    "subject": "Help",
    "customer_message": "HELP!!!",
    "customer_name": "Guest Customer",
    "customer_email": "guest.992@example.com",
    "created_at": "13 hours ago"
  },
  {
    "id": "T30",
    "type": "edge_case",
    "subject": "Frustrated customer",
    "customer_message": "Your service is terrible. I've been trying to fix this all morning and nobody is helping me.",
    "customer_name": "Angry User",
    "customer_email": "frustrated@example.com",
    "created_at": "14 hours ago"
  },
  {
    "id": "U01",
    "type": "clear_billing",
    "subject": "Charged after changing plans",
    "customer_message": "I downgraded my subscription yesterday, but I was still charged the old monthly amount today. Why did this happen?",
    "customer_name": "Grace Hopper",
    "customer_email": "grace.h@example.com",
    "created_at": "Yesterday"
  },
  {
    "id": "U02",
    "type": "clear_login",
    "subject": "OTP arrives too late",
    "customer_message": "The login OTP eventually arrives, but by then it has already expired. I still can't sign in.",
    "customer_name": "Linus Torvalds",
    "customer_email": "linus.t@example.com",
    "created_at": "Yesterday"
  },
  {
    "id": "U03",
    "type": "clear_refund",
    "subject": "Refund for duplicate payment",
    "customer_message": "I accidentally paid twice for the same order. Please refund the extra payment.",
    "customer_name": "Margaret Hamilton",
    "customer_email": "margaret.h@example.com",
    "created_at": "Yesterday"
  },
  {
    "id": "U04",
    "type": "multi_intent",
    "subject": "Payment page keeps failing",
    "customer_message": "I can't complete my subscription because the payment page keeps showing an error. I've tried three times.",
    "customer_name": "Alan Turing",
    "customer_email": "alan.t@example.com",
    "created_at": "Yesterday"
  },
  {
    "id": "U05",
    "type": "clear_technical",
    "subject": "App crashes after update",
    "customer_message": "The app worked yesterday, but after today's update it crashes every time I open the notifications screen.",
    "customer_name": "Guido van Rossum",
    "customer_email": "guido.v@example.com",
    "created_at": "2 days ago"
  },
  {
    "id": "U06",
    "type": "clear_login",
    "subject": "Account locked after password attempts",
    "customer_message": "I entered the wrong password several times and now my account is locked. How can I get back in?",
    "customer_name": "Barbara Liskov",
    "customer_email": "barbara.l@example.com",
    "created_at": "2 days ago"
  },
  {
    "id": "U07",
    "type": "edge_case",
    "subject": "Money missing",
    "customer_message": "Money disappeared from my account and I don't know why. Please fix this.",
    "customer_name": "Ada Lovelace",
    "customer_email": "ada.l@example.com",
    "created_at": "2 days ago"
  },
  {
    "id": "U08",
    "type": "multi_intent",
    "subject": "Can't access account after payment",
    "customer_message": "My subscription payment went through, but now I can't log into my account. I need access urgently.",
    "customer_name": "Claude Shannon",
    "customer_email": "claude.s@example.com",
    "created_at": "2 days ago"
  },
  {
    "id": "U09",
    "type": "clear_technical",
    "subject": "Export worked before",
    "customer_message": "The CSV export was working last week, but now clicking Export does nothing. Can you fix it?",
    "customer_name": "Donald Knuth",
    "customer_email": "donald.k@example.com",
    "created_at": "3 days ago"
  },
  {
    "id": "U10",
    "type": "clear_refund",
    "subject": "Refund status after cancellation",
    "customer_message": "I cancelled my subscription five days ago and was told I would get my money back, but I haven't received it yet. Can you check the refund?",
    "customer_name": "Dennis Ritchie",
    "customer_email": "dennis.r@example.com",
    "created_at": "3 days ago"
  }
];

/**
 * Pre-computed mock AI triage predictions derived from validated V2 classification model.
 * Enables zero-latency, realistic offline demonstration without API keys for all 40 tickets.
 */
export const MOCK_AI_PREDICTIONS = {
  "T01": {
    "category": "Billing",
    "confidence_score": 0.95,
    "explanation": "Customer asks for an explanation of a ₹999 subscription charge on their account.",
    "missing_information": [],
    "detected_intents": ["Billing"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T02": {
    "category": "Billing",
    "confidence_score": 0.95,
    "explanation": "Customer reports a declined credit card payment during subscription renewal.",
    "missing_information": [],
    "detected_intents": ["Billing"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T03": {
    "category": "Billing",
    "confidence_score": 0.95,
    "explanation": "Customer reports two identical ₹499 charges on their statement for one subscription.",
    "missing_information": [],
    "detected_intents": ["Billing"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T04": {
    "category": "Billing",
    "confidence_score": 0.90,
    "explanation": "Customer requests an invoice for a payment made yesterday.",
    "missing_information": ["Transaction or invoice identifier"],
    "detected_intents": ["Billing"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T05": {
    "category": "Login",
    "confidence_score": 0.95,
    "explanation": "Customer forgot password and cannot log into account.",
    "missing_information": [],
    "detected_intents": ["Login"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T06": {
    "category": "Login",
    "confidence_score": 0.95,
    "explanation": "Customer reports that sign-in OTP is not being received.",
    "missing_information": [],
    "detected_intents": ["Login"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T07": {
    "category": "Login",
    "confidence_score": 0.95,
    "explanation": "Website rejects sign-in attempt despite correct account credentials.",
    "missing_information": [],
    "detected_intents": ["Login"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T08": {
    "category": "Login",
    "confidence_score": 0.95,
    "explanation": "Customer asks for instructions to reset account password.",
    "missing_information": [],
    "detected_intents": ["Login"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T09": {
    "category": "Refund",
    "confidence_score": 0.95,
    "explanation": "Customer explicitly requests a refund for their subscription.",
    "missing_information": ["Transaction or subscription identifier", "Purchase date"],
    "detected_intents": ["Refund"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T10": {
    "category": "Refund",
    "confidence_score": 0.95,
    "explanation": "Customer inquires about refund timing following subscription cancellation.",
    "missing_information": ["Transaction or subscription identifier"],
    "detected_intents": ["Refund"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T11": {
    "category": "Refund",
    "confidence_score": 0.95,
    "explanation": "Customer explicitly requests the return of a ₹799 subscription payment.",
    "missing_information": ["Transaction or subscription identifier", "Purchase date"],
    "detected_intents": ["Refund"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T12": {
    "category": "Refund",
    "confidence_score": 0.95,
    "explanation": "Customer reports that an approved refund has not arrived after three days.",
    "missing_information": ["Transaction or refund identifier"],
    "detected_intents": ["Refund"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T13": {
    "category": "Technical",
    "confidence_score": 0.90,
    "explanation": "Customer reports Android app crashing upon opening settings page.",
    "missing_information": ["Device/OS version", "App version", "Steps to reproduce"],
    "detected_intents": ["Technical"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T14": {
    "category": "Technical",
    "confidence_score": 0.90,
    "explanation": "Customer reports export button fails to respond when clicked.",
    "missing_information": ["Browser/device details", "Steps to reproduce"],
    "detected_intents": ["Technical"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T15": {
    "category": "Technical",
    "confidence_score": 0.90,
    "explanation": "Customer encounters a 500 error while uploading a file.",
    "missing_information": ["File type/size", "Browser/device details", "Steps to reproduce"],
    "detected_intents": ["Technical"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T16": {
    "category": "Technical",
    "confidence_score": 0.90,
    "explanation": "Customer reports dashboard stuck loading indefinitely.",
    "missing_information": ["Browser/device details", "Steps to reproduce"],
    "detected_intents": ["Technical"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T17": {
    "category": "Refund",
    "confidence_score": 0.90,
    "explanation": "Customer explicitly requests one payment back after being charged twice.",
    "missing_information": ["Transaction identifier", "Date of transaction"],
    "detected_intents": ["Billing", "Refund"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T18": {
    "category": "Needs Review",
    "confidence_score": 0.50,
    "explanation": "Ticket contains competing login access failure and subscription payment failure intents.",
    "missing_information": [],
    "detected_intents": ["Login", "Billing"],
    "ambiguity_flag": true,
    "requires_human_review": true
  },
  "T19": {
    "category": "Billing",
    "confidence_score": 0.90,
    "explanation": "Customer asks why a charge occurred after subscription cancellation.",
    "missing_information": ["Transaction identifier", "Cancellation date"],
    "detected_intents": ["Billing"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T20": {
    "category": "Needs Review",
    "confidence_score": 0.50,
    "explanation": "Ticket contains dual technical malfunction and billing charge concerns without a dominant intent.",
    "missing_information": ["Details of technical problem", "Transaction details"],
    "detected_intents": ["Technical", "Billing"],
    "ambiguity_flag": true,
    "requires_human_review": true
  },
  "T21": {
    "category": "Needs Review",
    "confidence_score": 0.40,
    "explanation": "Ticket contains two competing intents: account login failure and subscription refund request.",
    "missing_information": [],
    "detected_intents": ["Login", "Refund"],
    "ambiguity_flag": true,
    "requires_human_review": true
  },
  "T22": {
    "category": "Needs Review",
    "confidence_score": 0.40,
    "explanation": "Ticket contains two competing intents: application crashing and duplicate charges.",
    "missing_information": ["Technical diagnostic details", "Transaction details"],
    "detected_intents": ["Technical", "Billing"],
    "ambiguity_flag": true,
    "requires_human_review": true
  },
  "T23": {
    "category": "Needs Review",
    "confidence_score": 0.40,
    "explanation": "Ticket combines password reset issue with subscription cancellation and refund request.",
    "missing_information": [],
    "detected_intents": ["Login", "Refund"],
    "ambiguity_flag": true,
    "requires_human_review": true
  },
  "T24": {
    "category": "Needs Review",
    "confidence_score": 0.40,
    "explanation": "Ticket combines account access failure with payment page error.",
    "missing_information": ["Details of payment error"],
    "detected_intents": ["Login", "Billing"],
    "ambiguity_flag": true,
    "requires_human_review": true
  },
  "T25": {
    "category": "Technical",
    "confidence_score": 0.85,
    "explanation": "Customer reports app crashing whenever opened.",
    "missing_information": ["Device/OS", "App version", "Steps to reproduce"],
    "detected_intents": ["Technical"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T26": {
    "category": "Refund",
    "confidence_score": 0.90,
    "explanation": "Customer explicitly requests a refund for a purchase.",
    "missing_information": ["Transaction/order ID", "Purchase date"],
    "detected_intents": ["Refund"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T27": {
    "category": "Login",
    "confidence_score": 0.90,
    "explanation": "Customer reports inability to log into account.",
    "missing_information": ["Account identifier/email", "Exact login error message"],
    "detected_intents": ["Login"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "T28": {
    "category": "Needs Review",
    "confidence_score": 0.20,
    "explanation": "Message lacks sufficient detail to identify a specific support intent.",
    "missing_information": ["Detailed problem description"],
    "detected_intents": [],
    "ambiguity_flag": false,
    "requires_human_review": true
  },
  "T29": {
    "category": "Needs Review",
    "confidence_score": 0.10,
    "explanation": "Message contains exclamation without specifying problem details.",
    "missing_information": ["Detailed problem description"],
    "detected_intents": [],
    "ambiguity_flag": false,
    "requires_human_review": true
  },
  "T30": {
    "category": "Needs Review",
    "confidence_score": 0.20,
    "explanation": "Customer expresses frustration without describing the underlying issue.",
    "missing_information": ["Detailed problem description"],
    "detected_intents": [],
    "ambiguity_flag": false,
    "requires_human_review": true
  },
  "U01": {
    "category": "Billing",
    "confidence_score": 0.90,
    "explanation": "Customer inquires why they were charged the old plan amount today after downgrading their subscription.",
    "missing_information": ["Account identifier", "Transaction ID"],
    "detected_intents": ["Billing"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "U02": {
    "category": "Login",
    "confidence_score": 0.95,
    "explanation": "Customer cannot sign in because authentication OTP arrives after it has already expired.",
    "missing_information": [],
    "detected_intents": ["Login"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "U03": {
    "category": "Refund",
    "confidence_score": 0.95,
    "explanation": "Customer explicitly requests a refund for an extra payment made accidentally for the same order.",
    "missing_information": ["Order ID or transaction identifier"],
    "detected_intents": ["Refund"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "U04": {
    "category": "Needs Review",
    "confidence_score": 0.50,
    "explanation": "Ticket describes a technical error on the payment page during subscription completion, involving both Billing and Technical intents.",
    "missing_information": ["Error message/code", "Browser or device details"],
    "detected_intents": ["Billing", "Technical"],
    "ambiguity_flag": true,
    "requires_human_review": true
  },
  "U05": {
    "category": "Technical",
    "confidence_score": 0.90,
    "explanation": "Customer reports app crashing upon opening notifications screen following recent update.",
    "missing_information": ["Device/OS version", "App version"],
    "detected_intents": ["Technical"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "U06": {
    "category": "Login",
    "confidence_score": 0.95,
    "explanation": "Customer account is locked after entering wrong password several times.",
    "missing_information": ["Account email or username"],
    "detected_intents": ["Login"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "U07": {
    "category": "Needs Review",
    "confidence_score": 0.40,
    "explanation": "Ticket mentions missing money without providing sufficient evidence to determine if the issue is a billing charge, error, or refund.",
    "missing_information": ["Account ID", "Transaction details or amount"],
    "detected_intents": ["Billing"],
    "ambiguity_flag": true,
    "requires_human_review": true
  },
  "U08": {
    "category": "Needs Review",
    "confidence_score": 0.50,
    "explanation": "Ticket contains competing intents between subscription payment processing and account login access failure.",
    "missing_information": ["Account email or username"],
    "detected_intents": ["Login", "Billing"],
    "ambiguity_flag": true,
    "requires_human_review": true
  },
  "U09": {
    "category": "Technical",
    "confidence_score": 0.90,
    "explanation": "Customer reports CSV export button fails to respond when clicked.",
    "missing_information": ["Browser/device details", "Steps to reproduce"],
    "detected_intents": ["Technical"],
    "ambiguity_flag": false,
    "requires_human_review": false
  },
  "U10": {
    "category": "Refund",
    "confidence_score": 0.95,
    "explanation": "Customer inquires about status of unreceived refund following subscription cancellation five days ago.",
    "missing_information": ["Transaction or subscription identifier"],
    "detected_intents": ["Refund"],
    "ambiguity_flag": false,
    "requires_human_review": false
  }
};
