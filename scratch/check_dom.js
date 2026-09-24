import { INITIAL_TICKETS } from '../js/dataset.js';

console.log("Total tickets in dataset:", INITIAL_TICKETS.length);

const ids = INITIAL_TICKETS.map(t => t.id);
console.log("Ticket IDs in dataset:", ids.join(", "));
