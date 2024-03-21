import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'chartjs-adapter-date-fns';

let myChart = null; // Define myChart variable

const ChartComponent = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    // Set default dates as one week from now
    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultStartDate.getDate() - 7);
    setStartDate(defaultStartDate);
    setEndDate(new Date());
  }, []);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      let endpoint = 'https://1ysnzjg1h6.execute-api.eu-central-1.amazonaws.com/prod/get-timely';

      // Adjust endpoint based on selected date range
      if (startDate && endDate) {
        endpoint += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
      }

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      if (Array.isArray(jsonData)) {
        const formattedData = formatData(jsonData);
        setData(formattedData);
        renderChart();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      renderChart();
    }
  }, [data]);

  const formatData = (rawData) => {
    const formattedData = {};

    rawData.forEach(item => {
      const date = item.date.S;

      Object.entries(item).forEach(([key, value]) => {
        if (key !== 'date') {
          const jobName = key;
          const jobValue = parseInt(value.S);
          if (!formattedData[date]) {
            formattedData[date] = {};
          }
          formattedData[date][jobName] = jobValue;
        }
      });
    });

    // Fill missing dates with empty data
    const allDates = Object.keys(formattedData).sort();
    const firstDate = new Date(allDates[0]);
    const lastDate = new Date(allDates[allDates.length - 1]);
    const currentDate = new Date(firstDate);
    while (currentDate <= lastDate) {
      const formattedDate = currentDate.toISOString().split('T')[0];
      if (!formattedData[formattedDate]) {
        formattedData[formattedDate] = {};
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Convert formattedData into an array
    const dataArray = [];
    Object.keys(formattedData).forEach(date => {
      console.log ("date:", date)
      console.log("formatted date:", formattedData[date])
      const item = { date };
      Object.entries(formattedData[date]).forEach(([key, value]) => {
        item[key] = value;
      });
      dataArray.push(item);
    });

    return dataArray;
  };

  const renderChart = () => {
    if (!data || data.length === 0) {
      console.error('No data available to render chart.');
      return;
    }

    if (!myChart) {
      const ctx = document.getElementById('myChart').getContext('2d');
      myChart = new Chart(ctx, {
        type: 'bar',
        data: {},
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'dd Mm yyyy'
                },
                tooltipFormat: 'll',
              },
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              beginAtZero: true,
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
    }

    const labels = data.map(item => item.date);

    const datasets = [];

    data.forEach(dateData => {
      const jobNames = Object.keys(dateData);
      jobNames.forEach(jobName => {
        if (jobName !== 'date') {
          const dataPoints = labels.map(date => dateData[date] || 0);
          datasets.push({
            label: jobName,
            data: dataPoints,
            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`,
            borderWidth: 1
          });
        }
      });
    });

    myChart.data.labels = labels;
    myChart.data.datasets = datasets;
    myChart.update();
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <span style={{ margin: '0 10px' }}></span> {/* Spacer */}
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
        />
        <button onClick={fetchData}>Fetch Data</button>
      </div>
      <div style={{width: '80%', margin: 'auto'}}>
        <canvas id="myChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;
