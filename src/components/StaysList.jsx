import React, { useEffect, useState } from 'react';
import Card from './Card';

const StaysList = () => {
  const [stays, setStays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/stays.json');
      const data = await response.json();

      const staysArray = [];
      data.forEach(stay => {
        staysArray.push(stay);
      });

      setStays(staysArray);
    };

    fetchData();
  }, []);

  return (
    <div className="stays-list">
      <div className="stays-header">
        <h1>Stays in Finland</h1>
        <span className="stays-count">+14 Stays</span>
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
