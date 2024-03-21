import React from 'react';

const MonthPicker = ({ currentMonth, onMonthChange }) => {
  // Function to handle month change
  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    onMonthChange(newMonth);
  };

  // Generate options for month selection
  const monthOptions = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  return (
    <select value={currentMonth} onChange={handleMonthChange}>
      {monthOptions.map((month, index) => (
        <option key={index} value={index + 1}>{month}</option>
      ))}
    </select>
  );
};

export default MonthPicker;
