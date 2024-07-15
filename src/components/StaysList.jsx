import React, { useEffect, useState } from 'react';
import Card from './Card';

const StaysList = () => {
  const [stays, setStays] = useState([]);

  useEffect(() => {
    fetch('/stays.json')
      .then((response) => response.json())
      .then((data) => setStays(data));
  }, []);

  return (
    <div className="stays-list">
      <div className="stays-header">
        <h1>Stays in Finland</h1>
        <span className="stays-count">12+ Stays</span>
      </div>

      <div className="stays-grid">
        {stays.map((stay, index) => (
          <Card key={index} stay={stay} />
        ))}
      </div>
    </div>
  );
};

export default StaysList;
