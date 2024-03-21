import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';

const ChartComponent = ({ data }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const labels = Object.keys(data[0]).filter(key => key !== 'jobName');
      const datasets = [];

      data.forEach((item, index) => {
        const values = labels.map(label => parseInt(item[label]));
        datasets.push({
          label: item.jobName,
          data: values,
          borderColor: `rgb(${index * 70}, ${index * 100}, ${index * 50})`,
          backgroundColor: `rgba(${index * 70}, ${index * 100}, ${index * 50}, 0.2)`,
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

      setChart(newChart);
    }
  }, [data]);

  return (
    <div>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
};

const App = () => {
  const data = [
    {"05-may-2024": "1", "jobName": "meinfoto.de", "04-may-2024": "2"},
    {"05-may-2024": "0", "jobName": "picturator-webworker", "04-may-2024": "1"}
  ];

  return (
    <div>
      <h1>Chart Example</h1>
      <ChartComponent data={data} />
    </div>
  );
};

export default App;
