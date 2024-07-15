import React, { useState } from 'react';
import Header from './components/Header';
import StaysList from './components/StaysList';
import FilteredStaysList from './components/FilteredStaysList';

const App = () => {
  const [filteredStays, setFilteredStays] = useState([]);
  const [showFilteredStays, setShowFilteredStays] = useState(false);

  const applyFilters = (location, totalGuests) => {
    fetch('/stays.json')
      .then(response => response.json())
      .then(data => {
        const filtered = data.filter(stay => {
          const matchesLocation = location ? stay.city + ', ' + stay.country === location : true;
          const matchesGuests = totalGuests ? stay.maxGuests >= totalGuests : true;
          return matchesLocation && matchesGuests;
        });
        setFilteredStays(filtered);
        setShowFilteredStays(true);
      })
      .catch(error => console.error('Error fetching stays.json:', error));
  };

  return (
    <div className="app">
      <Header applyFilters={applyFilters} />
      {showFilteredStays ? <FilteredStaysList filteredStays={filteredStays} /> : <StaysList />}
    </div>
  );
};

export default App;
