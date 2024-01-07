// TicketList.js
import React from 'react';
import TicketCard from './TicketCard';

const TicketList = ({ tickets, onUpdate, onDelete }) => {
  return (
    <div className="ticket-list">
      {tickets.map((ticket) => (
        <TicketCard key={ticket._id} ticket={ticket} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TicketList;
