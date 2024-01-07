// models/Ticket.js (updated)
const mongoose = require('mongoose');
const ticketSchema = new mongoose.Schema({
    heading: String,
    description: String,
    priority: { type: String, enum: ['Low', 'Medium', 'High'] },
    color: String, // Add color property for visualization
  });
  
  const Ticket = mongoose.model('Ticket', ticketSchema);
  
  module.exports = Ticket;
  