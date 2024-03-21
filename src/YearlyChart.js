import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { getYear } from 'date-fns';
import YearPicker from './YearPicker'; // Import the YearPicker component

let myChart = null;

const YearlyChart = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    const currentYear = getYear(new Date());
    setSelectedYear(currentYear);
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedYear]);

  const fetchData = async () => {
    try {
      let endpoint = 'https://1ysnzjg1h6.execute-api.eu-central-1.amazonaws.com/prod/get-yearly';

      if (selectedYear) {
        endpoint += `?year=${selectedYear}`;
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

    const formatData = (rawData) => {
      const formattedData = {};

      rawData.forEach(item => {
        const year = item.year.N;

        Object.entries(item).forEach(([key, value]) => {
          if (key !== 'year') {
            const jobName = key;
            const jobValue = parseInt(value.S);
            if (!formattedData[year]) {
              formattedData[year] = {};
            }
            formattedData[year][jobName] = jobValue;
          }
        });
      });

      return formattedData;
    };



  useEffect(() => {
    if (data && data.length > 0) {
      renderChart(data);
    }
  }, [data]);

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

    Object.keys(formattedData).forEach((year, yearIndex) => {
      const jobs = formattedData[year];
      let dataIndex = 0;

      Object.keys(jobs).forEach((jobName) => {
        if (!jobNames.includes(jobName)) {
          backgroundColors.push(`rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`);
          jobNames.push(jobName);
        }

        const jobIndex = jobNames.indexOf(jobName);

        datasets[jobIndex].label = jobName;
        datasets[jobIndex].backgroundColor = backgroundColors[jobIndex];

        if (datasets[jobIndex].data.length < yearIndex) {
          datasets[jobIndex].data = Array(yearIndex).fill(null);
        }

        datasets[jobIndex].data[yearIndex] = jobs[jobName];
        dataIndex++;
      });

      for (let i = dataIndex; i < maxDataPoints; i++) {
        if (datasets[i].data.length < yearIndex) {
          datasets[i].data = Array(yearIndex).fill(null);
        }
        datasets[i].data[yearIndex] = null;
      }
    });

    const ctx = document.getElementById('myChart').getContext('2d');

    if (myChart instanceof Chart) {
      myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels.map(label => `Year ${label}`),
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

  const handleYearChange = (newYear) => {
    setSelectedYear(newYear);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <YearPicker currentYear={selectedYear} onYearChange={handleYearChange} />
      </div>
      <div style={{ width: '80%', margin: 'auto' }}>
        <canvas id="myChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default YearlyChart;
