// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import './App.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tickets');
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleTicketCreate = (newTicket) => {
    setTickets([...tickets, newTicket]);
    setShowCreateForm(false); // Hide the form after creating a ticket
  };

  const handleToggleCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleDelete=(id)=>{
    setTickets(tickets.filter((ticket) => ticket._id !== id));
  }

  const handleUpdate = (updatedTicket) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket._id === updatedTicket._id ? updatedTicket : ticket
    );
    setTickets(updatedTickets);
  };

  return (
    <div className='main-container'>
      <div className="header">
      <h1 className='gfg'>GFG Ticket Raising Platform</h1>
      <button style={{marginBottom:"20px"}} onClick={handleToggleCreateForm}>
        {showCreateForm ? 'Hide Form' : 'New Ticket '}
      </button>
      </div>
      
      {showCreateForm && <TicketForm onTicketCreate={handleTicketCreate} />}
      <TicketList onUpdate={handleUpdate} onDelete={handleDelete} tickets={tickets} />
    </div>
  );
};

export default App;
