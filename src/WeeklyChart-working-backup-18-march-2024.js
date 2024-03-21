import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import { getISOWeek } from 'date-fns';
import WeekPicker from './WeekPicker';

let myChart = null;

const WeeklyChart = () => {
  const [data, setData] = useState([]);
  const [weekNumber, setWeekNumber] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    const currentWeekNumber = getISOWeek(currentDate);
    setWeekNumber(currentWeekNumber);
  }, []);

  useEffect(() => {
    fetchData();
  }, [weekNumber]);

  const fetchData = async () => {
    try {
      let endpoint = 'https://1ysnzjg1h6.execute-api.eu-central-1.amazonaws.com/prod/get-weekly';

      if (weekNumber) {
        endpoint += `?weekNumber=${weekNumber}`;
      }

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      if (Array.isArray(jsonData)) {
        const formattedData = formatData(jsonData);
        setData(formattedData);
        console.log("formatted data:", formattedData)
        renderChart(formattedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      renderChart(data);
    }
  }, [data]);

  const formatData = (rawData) => {
    const formattedData = {};

    rawData.forEach(item => {
      const week = item.week.N;

      Object.entries(item).forEach(([key, value]) => {
        if (key !== 'week') {
          const jobName = key;
          const jobValue = parseInt(value.S);
          if (!formattedData[week]) {
            formattedData[week] = {};
          }
          formattedData[week][jobName] = jobValue;
        }
      });
    });

    return formattedData;
  };

const renderChart = (formattedData) => {
  const labels = Object.keys(formattedData);
  const datasets = [];

  // Find the minimum value in the dataset
  let minValue = Infinity;
  Object.values(formattedData).forEach(weekData => {
    const weekValues = Object.values(weekData);
    const minWeekValue = Math.min(...weekValues);
    if (minWeekValue < minValue) {
      minValue = minWeekValue;
    }
  });

  // If the minimum value is less than zero, adjust all data points to shift the chart up
  if (minValue < 0) {
    Object.keys(formattedData).forEach(week => {
      const jobNames = Object.keys(formattedData[week]);
      jobNames.forEach((jobName, index) => {
        formattedData[week][jobName] -= minValue;
      });
    });
  }

  Object.keys(formattedData).forEach(week => {
    const dataPoints = Object.values(formattedData[week]);
    const jobNames = Object.keys(formattedData[week]);

    jobNames.forEach((jobName, index) => {
      const backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`;
      datasets.push({
        label: jobName,
        data: [dataPoints[index]],
        backgroundColor: backgroundColor,
        borderWidth: 1
      });
    });
  });

  const ctx = document.getElementById('myChart').getContext('2d');

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      scales: {
        y: {
          beginAtZero: true, // Start y-axis at 0
          title: {
            display: true,
            text: 'Value'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom'
        }
      },
      responsive: true,
      hover: {
        mode: 'nearest',
        intersect: false
      }
    }
  });
};





  const handleWeekChange = (newWeek) => {
    setWeekNumber(newWeek);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <WeekPicker currentWeek={weekNumber} onWeekChange={handleWeekChange} />
      </div>
      <div style={{ width: '80%', margin: 'auto' }}>
        <canvas id="myChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default WeeklyChart;
