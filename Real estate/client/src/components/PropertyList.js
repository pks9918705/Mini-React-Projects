// src/components/PropertyList.js
import React from 'react';

const PropertyList = ({ properties, onContactOwner, onDeleteProperty }) => {
  return (
    <div className='list' >
      <h2 style={{"color":"#007BFF"}} >Property List</h2>
      <div className='list-container'>
      {properties.map(property => (
        <div key={property._id} className="property-card">
          <h3><span style={{"fontWeight":"bold"}}>{property.title}</span></h3>
          <p><span style={{"fontWeight":"bold"}}>Description:</span>{property.description}</p>
          <p> <span style={{"fontWeight":"bold"}}>Contact:</span> {property.contact}</p>
          <img src={property.image} alt="" />
          <div style={{"display":"flex","flexDirection":"row","justifyContent":"space-evenly"}}>
          <button onClick={() => onContactOwner(property.contact)}>Contact Owner</button>
          <button onClick={() => onDeleteProperty(property._id)}>Delete Property</button>

          </div>
          
        </div>
      ))}
      </div>
      
    </div>
  );
};

export default PropertyList;
