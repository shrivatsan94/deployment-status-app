import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

      let endpoint = 'https://1ysnzjg1h6.execute-api.eu-central-1.amazonaws.com/prod/';


            if (startDate && endDate) {
              endpoint += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
            }

            const response = await fetch(endpoint);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

      const jsonData = await response.json();
      if (jsonData && jsonData.body) {
        const parsedData = JSON.parse(jsonData.body);
        setData(parsedData.Items);
        console.log(parsedData.Items);
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

  const renderChart = () => {
    const allDates = new Set(); // Using Set to ensure unique dates
    const datasets = [];

    // Extract all dates from data
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== 'jobName') {
          allDates.add(key);
        }
      });
    });

    // Sort the dates
    const sortedDates = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b));

    // Populate datasets
    data.forEach((item, index) => {
      const values = sortedDates.map(date => parseInt(item[date] || 0)); // Default to 0 if date value is missing
      datasets.push({
        label: item.jobName,
        data: values,
        backgroundColor: `rgba(${index * 70}, ${index * 100}, ${index * 50}, 0.6)`,
        borderWidth: 1
      });
    });

    const ctx = document.getElementById('myChart').getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sortedDates.map(label => label.toUpperCase()),
        datasets: datasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  };

  return (
  <div>

          <div style={{ margin: '10%'}}>
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
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  </div>
  );
};

export default ChartComponent;
