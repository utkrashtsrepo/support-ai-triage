import { INITIAL_TICKETS, MOCK_AI_PREDICTIONS } from '../js/dataset.js';

console.log("INITIAL_TICKETS count:", INITIAL_TICKETS.length);
console.log("MOCK_AI_PREDICTIONS keys count:", Object.keys(MOCK_AI_PREDICTIONS).length);

const missing = INITIAL_TICKETS.filter(t => !MOCK_AI_PREDICTIONS[t.id]);
console.log("Tickets missing prediction in MOCK_AI_PREDICTIONS:", missing.map(t => t.id));
