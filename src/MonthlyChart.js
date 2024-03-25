import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { getMonth } from 'date-fns';
import MonthPicker from './MonthPicker'; // Import the MonthPicker component

let myChart = null;

const MonthlyChart = () => {
  const [data, setData] = useState([]);
  const [monthNumber, setMonthNumber] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonthNumber = getMonth(currentDate);
    setMonthNumber(currentMonthNumber);
  }, []);

  useEffect(() => {
    fetchData();
  }, [monthNumber]);

  const fetchData = async () => {
    try {
      let endpoint = 'https://1ysnzjg1h6.execute-api.eu-central-1.amazonaws.com/prod/get-monthly';

      if (monthNumber) {
        endpoint += `?monthNumber=${monthNumber}`;
      }

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      if (Array.isArray(jsonData)) {
        const formattedData = formatData(jsonData);
        setData(formattedData);
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
      const month = item.month.N;

      Object.entries(item).forEach(([key, value]) => {
        if (key !== 'month') {
          const jobName = key;
          const jobValue = parseInt(value.N);
          if (!formattedData[month]) {
            formattedData[month] = {};
          }
          formattedData[month][jobName] = jobValue;
        }
      });
    });

    return formattedData;
  };

  const renderChart = (formattedData) => {
    const labels = Object.keys(formattedData);
    const datasets = [];
    const backgroundColors = [];
    const jobNames = [];
    let maxDataPoints = 0;

    Object.values(formattedData).forEach((jobs) => {
      maxDataPoints = Math.max(maxDataPoints, Object.keys(jobs).length);
    });

    for (let i = 0; i < maxDataPoints; i++) {
      datasets.push({
        label: '',
        data: [],
        backgroundColor: '',
        borderWidth: 1,
      });
    }

    Object.keys(formattedData).forEach((month, monthIndex) => {
      const jobs = formattedData[month];
      let dataIndex = 0;

      Object.keys(jobs).forEach((jobName) => {
        if (!jobNames.includes(jobName)) {
          backgroundColors.push(`rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`);
          jobNames.push(jobName);
        }

        const jobIndex = jobNames.indexOf(jobName);

        datasets[jobIndex].label = jobName;
        datasets[jobIndex].backgroundColor = backgroundColors[jobIndex];

        if (datasets[jobIndex].data.length < monthIndex) {
          datasets[jobIndex].data = Array(monthIndex).fill(null);
        }

        datasets[jobIndex].data[monthIndex] = jobs[jobName];
        dataIndex++;
      });

      for (let i = dataIndex; i < maxDataPoints; i++) {
        if (datasets[i].data.length < monthIndex) {
          datasets[i].data = Array(monthIndex).fill(null);
        }
        datasets[i].data[monthIndex] = null;
      }
    });

    const ctx = document.getElementById('myChart').getContext('2d');

    if (myChart instanceof Chart) {
      myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.map(label => `Month ${label}`),
        datasets: datasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            ticks: {
              stepSize: 1,
              precision: 0
            },
            title: {
              display: true,
              text: 'Number of builds'
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

  const handleMonthChange = (newMonth) => {
    setMonthNumber(newMonth);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <MonthPicker currentMonth={monthNumber} onMonthChange={handleMonthChange} />
      </div>
      <div style={{ width: '80%', margin: 'auto' }}>
        <canvas id="myChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default MonthlyChart;
