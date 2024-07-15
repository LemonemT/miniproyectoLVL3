import React from 'react';
import Card from './Card';

const FilteredStaysList = ({ filteredStays }) => {
  return (
    <div className="stays-list">
      <div className="stays-header">
        <h1>Filtered Stays</h1>
        <span className="stays-count">{filteredStays.length} Stays</span>
      </div>

      <div className="stays-grid">
        {filteredStays.map((stay, index) => (
          <Card key={index} stay={stay} />
        ))}
      </div>
    </div>
  );
};

export default FilteredStaysList;
