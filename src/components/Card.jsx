import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Card = ({ stay }) => {
  return (
    <div className="card">
      <img src={stay.photo} alt={stay.title} className="card-image" />
      <div className="card-content">
        <div className="card-header">
          {stay.superHost && <span className="superhost">SUPER HOST</span>}
          <span className="type">{stay.type}</span>
          <span className="rating">
            <FontAwesomeIcon icon={faStar} style={{ color: "#eb5757" }} /> {stay.rating}
          </span>
        </div>
        <h3 className="title">{stay.title}</h3>
      </div>
    </div>
  );
};

export default Card;
