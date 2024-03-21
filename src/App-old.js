import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

function App() {
  const [deploymentData, setDeploymentData] = useState([]);

  const fetchDeploymentData = async () => {
    try {
      const response = await fetch('https://1ysnzjg1h6.execute-api.eu-central-1.amazonaws.com/prod');
      const responseData = await response.json();
      const parsedBody = JSON.parse(responseData.body);
      console.log(parsedBody);
      setDeploymentData(parsedBody);
    } catch (error) {
      console.error('Error fetching deployment data:', error);
    }
  };

  const prepareChartData = () => {
    const uniqueDates = [...new Set(deploymentData.map(item => item.deploymentDate))];
    const datasets = [];

    deploymentData.forEach(item => {
      const dateIndex = uniqueDates.indexOf(item.deploymentDate);
      if (!datasets[dateIndex]) {
        datasets[dateIndex] = {
          label: item.deploymentDate,
          data: Array(uniqueDates.length).fill(0),
          backgroundColor: getRandomColor(),
          borderColor: getRandomColor(),
          borderWidth: 1
        };
      }
      const jobIndex = uniqueDates.indexOf(item.deploymentDate);
      datasets[dateIndex].data[jobIndex] += parseInt(item.count);
    });

    const labels = uniqueDates;
    return { labels, datasets };
  };

  const renderChart = () => {
    const chartData = prepareChartData();
    const ctx = document.getElementById('deploymentChart');

    if (window.myChart) {
      window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.labels,
        datasets: chartData.datasets
      },
      options: {
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    });
  };

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g},${b},0.2)`;
  };

  useEffect(() => {
    fetchDeploymentData();
  }, []);

  useEffect(() => {
    if (deploymentData.length > 0) {
      renderChart();
    }
  }, [deploymentData]);

  return (
    <div className="App">
      <h1>Jenkins Job Deployments</h1>
      <canvas id="deploymentChart" width="800" height="400"></canvas>
    </div>
  );
}

export default App;