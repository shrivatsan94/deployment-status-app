// MainComponent.js

import React, { useState } from 'react';
import ChartComponent from './ChartComponent';
import LeftPane from './LeftPane';
import WeeklyChart from './WeeklyChart'
import MonthlyChart from './MonthlyChart'
import YearlyChart from './YearlyChart'

const MainComponent = () => {
  const [selectedOption, setSelectedOption] = useState('datewise');

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="main-container">
      <LeftPane onSelectOption={handleSelectOption} />
      <div className="main-content">
        {selectedOption === 'datewise' && <ChartComponent/>}
        {selectedOption === 'weekly' && <WeeklyChart/>}
        {selectedOption === 'monthly' && <MonthlyChart/>}
        {selectedOption === 'yearly' && <YearlyChart/>}
      </div>
    </div>
  );
};

export default MainComponent;
