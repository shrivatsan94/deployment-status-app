import React, { useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
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
          const jobValue = parseInt(value.N);
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
  // Assuming formattedData is an object with week numbers as keys and job counts as values.
  const labels = Object.keys(formattedData); // Weeks as labels
  const datasets = [];

  const backgroundColors = []; // Array to hold background colors for each job
  const jobNames = []; // Array to hold job names for legend
  let maxDataPoints = 0; // Variable to track the maximum number of data points

  Object.values(formattedData).forEach((jobs) => {
    // Determine the max length of data points across all weeks
    maxDataPoints = Math.max(maxDataPoints, Object.keys(jobs).length);
  });

  // Initialize the datasets array with the correct number of datasets
  for (let i = 0; i < maxDataPoints; i++) {
    datasets.push({
      label: '', // Placeholder, will set the label later
      data: [], // Placeholder, will add data later
      backgroundColor: '', // Placeholder, will set the color later
      borderWidth: 1,
    });
  }

  let formattedDataArray = null;

  Object.keys(formattedData).forEach((week, weekIndex) => {
    const jobs = formattedData[week];
    let dataIndex = 0;
    console.log("jobs", typeof(jobs))
    formattedDataArray = jobs;

      //let formattedDataIndex = 0
      //let formattedDataArray = []

        //for (let i = formattedDataIndex; i < 2; i++) {
        //    formattedDataArray[formattedDataIndex] = jobs[i];
        //    formattedDataIndex++;
        //}
        //console.log("formattedDataArry:", formattedDataArray)

    //jobs.forEach((jobName) => {
    //    formattedDataArray.push(jobName)
    //})
    //console.log("formattedDataArray:", formattedDataArray)

    Object.keys(jobs).forEach((jobName) => {
      if (!jobNames.includes(jobName)) {
        // Assign a unique color to each job
        backgroundColors.push(`rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`);
        jobNames.push(jobName);
      }

      const jobIndex = jobNames.indexOf(jobName); // Get the index of the job name

      console.log("index of jobname:",jobName, jobIndex);

      // Set the label and background color for the dataset corresponding to this job
      datasets[jobIndex].label = jobName;
      datasets[jobIndex].backgroundColor = backgroundColors[jobIndex];

      // Initialize the data array for this dataset with null values for previous weeks
      if (datasets[jobIndex].data.length < weekIndex) {
        datasets[jobIndex].data = Array(weekIndex).fill(null);
      }

      // Add the data point for this week
      datasets[jobIndex].data[weekIndex] = jobs[jobName];
      dataIndex++;
    });

     //Fill in any missing data points with null for this week
    for (let i = dataIndex; i < maxDataPoints; i++) {
      if (datasets[i].data.length < weekIndex) {
        datasets[i].data = Array(weekIndex).fill(null);
      }
      datasets[i].data[weekIndex] = null;
    }
  });
    console.log("datasets:", datasets);




  const ctx = document.getElementById('myChart').getContext('2d');

  if (myChart instanceof Chart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.map(label => `Week ${label}`), // Map labels to display as "Week <number>"
      datasets: datasets
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          min: 0, // Explicitly set the minimum value for the y-axis to 0
          ticks: {
            stepSize: 1, // You can define the step size
            precision: 0 // Avoid non-integer values on the y-axis
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
