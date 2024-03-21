import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';

const ChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://1ysnzjg1h6.execute-api.eu-central-1.amazonaws.com/prod');
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
    const labels = Object.keys(data[0]).filter(key => key !== 'jobName');
    const datasets = [];

    data.forEach((item, index) => {
      const values = labels.map(label => parseInt(item[label]));
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
        labels: labels.map(label => label.toUpperCase()),
        datasets: datasets
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div style={{width: '80%', margin: 'auto'}}>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
};

export default ChartComponent;
