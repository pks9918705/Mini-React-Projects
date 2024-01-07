// TicketCard.js
import React, { useState } from 'react';
import axios from 'axios';

const getColor = (priority) => {
  switch (priority) {
    case 'Low':
      return 'green';
    case 'Medium':
      return 'orange';
    case 'High':
      return 'red';
    default:
      return 'gray'; // Default color for unknown priorities
  }
};


const TicketCard = ({ ticket, onUpdate, onDelete }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedTicket, setEditedTicket] = useState({ ...ticket });

  const handleEditToggle = () => {
    setEditing(!isEditing);
    setEditedTicket({ ...ticket });
  };

  const handleInputChange = (e) => {
    setEditedTicket({ ...editedTicket, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tickets/${ticket._id}`, editedTicket);
      onUpdate(editedTicket);
      setEditing(false);
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tickets/${ticket._id}`);
      onDelete(ticket._id);
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <div className="ticket-card" style={{ borderColor: getColor(ticket.priority) }}>
       
        
      {!isEditing ? (
        <>
          <h3>{ticket.heading}</h3>
          <p className='ticket-description'>{ticket.description}</p>
          <p className='ticket-priority'><span>Priority:</span> <span className='priority-tag' style={{ backgroundColor: getColor(ticket.priority) }}> {ticket.priority}</span></p>
          <div className="button-container">
            <button onClick={handleEditToggle}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      ) : (
        <>
          <label htmlFor="editHeading">Heading:</label>
          <input
            type="text"
            id="editHeading"
            name="heading"
            value={editedTicket.heading}
            onChange={handleInputChange}
          />

          <label htmlFor="editDescription">Description:</label>
          <textarea
            id="editDescription"
            name="description"
            value={editedTicket.description}
            onChange={handleInputChange}
          />

          <label htmlFor="editPriority">Priority:</label>
          <select
            id="editPriority"
            name="priority"
            value={editedTicket.priority}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <div className="button-container">
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleEditToggle}>Cancel</button>
          </div>
        </>
      )}

    </div>



  )}

export default TicketCard;
