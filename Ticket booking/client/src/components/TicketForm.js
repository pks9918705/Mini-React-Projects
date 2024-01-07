// TicketForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TicketForm = ({ onTicketCreate }) => {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!heading || !description || !priority) {
      alert('Please fill in all fields.');
      return;
    }

    const newTicket = {
      heading,
      description,
      priority,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/tickets', newTicket);
      onTicketCreate(response.data);
    } catch (error) {
      console.error('Error creating ticket:', error);
    }

    // Clear form fields after submission
    setHeading('');
    setDescription('');
    setPriority('');
  };

  return (
    <div className="ticket-form-container">
      <h2>Create a New Ticket</h2>
      <form onSubmit={handleSubmit} className="ticket-form">
        <label htmlFor="heading">Heading:</label>
        <input type="text" id="heading" value={heading} onChange={(e) => setHeading(e.target.value)} />

        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label htmlFor="priority">Priority:</label>
        <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="submit">Create Ticket</button>
      </form>
    </div>
  );
};

export default TicketForm;
