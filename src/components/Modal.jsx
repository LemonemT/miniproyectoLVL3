import React, { useState, useEffect } from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, onClose, activeInput, setActiveInput }) => {
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [totalGuests, setTotalGuests] = useState(0);
  const [stays, setStays] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetching stays.json from the public folder
    fetch('/stays.json')
      .then(response => response.json())
      .then(data => {
        setStays(data);
        const uniqueLocations = data.map(stay => `${stay.city}, ${stay.country}`);
        setLocations([...new Set(uniqueLocations)]);
      })
      .catch(error => console.error('Error fetching stays.json:', error));
  }, []);

  useEffect(() => {
    setTotalGuests(adultCount + childCount);
  }, [adultCount, childCount]);

  const handleIncrementAdult = () => {
    setAdultCount(adultCount + 1);
    resetLocationInput();
  };

  const handleDecrementAdult = () => {
    if (adultCount > 0) setAdultCount(adultCount - 1);
    resetLocationInput();
  };

  const handleIncrementChild = () => {
    setChildCount(childCount + 1);
    resetLocationInput();
  };

  const handleDecrementChild = () => {
    if (childCount > 0) setChildCount(childCount - 1);
    resetLocationInput();
  };

  const resetLocationInput = () => {
    const locationInput = document.querySelector('.input-container-location input');
    if (locationInput) {
      locationInput.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-search-bar">
          <div className="input-container-location" onClick={() => setActiveInput('location')}>
            <span className="static-text">LOCATION</span>
            <input type="text" placeholder="Helsinki, Finland" />
          </div>
          <div className={`input-container-guest ${totalGuests > 0 ? 'guests-selected' : ''}`} onClick={() => setActiveInput('guest')}>
            <span className="static-text">GUESTS</span>
            <input
              type="text"
              placeholder={totalGuests > 0 ? `${totalGuests} Guests` : 'Add guests'} />
          </div>
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <span>Search</span>
          </button>
        </div>
        {activeInput === 'location' ? (
          <ul className="location-list">
            {locations.map((location, index) => (
              <li key={index}>
                <FontAwesomeIcon icon={faLocationDot} />
                {location}
              </li>
            ))}
          </ul>
        ) : activeInput === 'guest' ? (
          <div className="guest-counter">
            <div className="guest-counter-text">
              <p className="guest-counter-title">Adults</p>
              <p className="guest-counter-subtitle">Age 13 or above</p>
            </div>
            <div className="counter-control">
              <button onClick={handleDecrementAdult}>-</button>
              <span>{adultCount}</span>
              <button onClick={handleIncrementAdult}>+</button>
            </div>
            <div className="guest-counter-text">
              <p className="guest-counter-title-child">Children</p>
              <p className="guest-counter-subtitle-child">Age 2-12</p>
            </div>
            <div className="counter-control">
              <button onClick={handleDecrementChild}>-</button>
              <span>{childCount}</span>
              <button onClick={handleIncrementChild}>+</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
