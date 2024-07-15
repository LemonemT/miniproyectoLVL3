import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

const Header = ({ applyFilters }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeInput, setActiveInput] = useState('');

  const handleLocationClick = () => {
    setActiveInput('location');
    setIsModalOpen(true);
  };

  const handleGuestClick = () => {
    setActiveInput('guest');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="header">
      <img src="/logo.svg" alt="Logo" className="logo" />
      <div className="search-bar">
        <div className="input-container" onClick={handleLocationClick}>
          <input type="text" placeholder="Helsinki, Finland" readOnly />
        </div>
        <div className="input-container" onClick={handleGuestClick}>
          <input type="text" placeholder="Add guests" readOnly />
        </div>
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#eb5757" }} />
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        activeInput={activeInput}
        setActiveInput={setActiveInput}
        applyFilters={applyFilters}
      />
    </header>
  );
};

export default Header;
