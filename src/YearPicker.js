import React from 'react';

const YearPicker = ({ selectedYear, onYearChange }) => {
  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    onYearChange(newYear);
  };

  const years = [];
  const currentYearValue = new Date().getFullYear();
  for (let year = currentYearValue; year >= currentYearValue - 10; year--) {
    years.push(<option key={year} value={year}>{year}</option>);
  }

  return (
    <select value={selectedYear} onChange={handleYearChange}>
      {years}
    </select>
  );
};

export default YearPicker;
