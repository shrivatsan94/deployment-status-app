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
    const formattedData = [];

    rawData.forEach(item => {
      const date = item['date']['S'];
      delete item['date'];

      Object.keys(item).forEach(key => {
        const jobName = key;
        const value = parseInt(item[key]['S']);
        const existingItem = formattedData.find(d => d.date === date);

        if (existingItem) {
          existingItem[jobName] = value;
        } else {
          const newItem = { date: date };
          newItem[jobName] = value;
          formattedData.push(newItem);
        }
      });
    });

    return formattedData;
  };

const renderChart = () => {
  const labels = [...new Set(data.map(item => item.date))]; // Extract unique dates
  const datasets = [];

  // Initialize dataset objects for each job name
  const jobNames = Object.keys(data[0]).filter(key => key !== 'date');
  jobNames.forEach(jobName => {
    datasets.push({
      label: jobName,
      data: [],
      backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`,
      borderWidth: 1
    });
  });

  // Populate datasets with data
  data.forEach(item => {
    jobNames.forEach((jobName, index) => {
      datasets[index].data.push(item[jobName] || 0); // If data is missing, default to 0
    });
  });

  const ctx = document.getElementById('myChart').getContext('2d');

const newChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: datasets
  },
  options: {
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Date'
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true, // Ensure y-axis starts at zero
        },
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    },
    responsive: true,
    hover: {
      mode: 'nearest', // Set hover mode to 'nearest' to prevent changing color of hovered dataset
      intersect: false
    }
  }
});

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
