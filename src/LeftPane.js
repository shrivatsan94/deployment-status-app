// LeftPane.js

import React from 'react';

const LeftPane = ({ onSelectOption }) => {
  return (
    <div className="left-pane">
      <ul>
        <li onClick={() => onSelectOption('datewise')}>Datewise</li>
        <li onClick={() => onSelectOption('weekly')}>Weekly</li>
        <li onClick={() => onSelectOption('monthly')}>Monthly</li>
        <li onClick={() => onSelectOption('yearly')}>Yearly</li>
        <li onClick={() => onSelectOption('joblist')}>JobList</li>
      </ul>
    </div>
  );
};

export default LeftPane;
