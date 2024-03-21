import React from 'react';

const WeekPicker = ({ currentWeek, onWeekChange }) => {
  // Function to handle week change
  const handleWeekChange = (e) => {
    const newWeek = parseInt(e.target.value);
    onWeekChange(newWeek);
  };

  // Generate options for week selection
  const weekOptions = [];
  for (let i = 1; i <= 52; i++) {
    weekOptions.push(<option key={i} value={i}>{`Week ${i}`}</option>);
  }

  return (
    <select value={currentWeek} onChange={handleWeekChange}>
      {weekOptions}
    </select>
  );
};

export default WeekPicker;
