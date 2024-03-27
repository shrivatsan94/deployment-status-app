import React, { useState, useEffect } from 'react';
import './JobList.css'; // Import CSS file for styling
import 'chartjs-adapter-date-fns';

const JobList = () => {
  const [jobs, setJobs] = useState([]); // Initialize jobs state with an empty array
  const [selectedJobName, setSelectedJobName] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [listCount, setListCount] = useState(0)
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    // Fetch data from API on component mount
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let endpoint = "https://1ysnzjg1h6.execute-api.eu-central-1.amazonaws.com/prod/get-jobdetails"

      endpoint += `?jobName=${selectedJobName}`;

      const response = await fetch(endpoint);
      const data = await response.json();

      console.log("data:", data.jobDetails);

      setJobs(data.jobDetails);

      console.log(data.count);
      setListCount(data.count);

      console.log("jobs:", jobs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };


  const fetchDataJobName = async (jobname) => {
    try {
      let endpoint = "https://1ysnzjg1h6.execute-api.eu-central-1.amazonaws.com/prod/get-jobdetails"

      endpoint += `?jobName=${jobname}&jobStatus=${selectedStatus}`;

      const response = await fetch(endpoint);
      const data = await response.json();

      console.log("data:", data.jobDetails);

      setJobs(data.jobDetails);

      console.log(data.count);
      setListCount(data.count);

      console.log("jobs:", jobs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

    const fetchDataJobStatus= async (jobstatus) => {
      try {
        let endpoint = "https://1ysnzjg1h6.execute-api.eu-central-1.amazonaws.com/prod/get-jobdetails"

        endpoint += `?jobName=${selectedJobName}&jobStatus=${jobstatus}`;

        const response = await fetch(endpoint);
        const data = await response.json();

        console.log("data:", data.jobDetails);

        setJobs(data.jobDetails);

        console.log(data.count);
        setListCount(data.count);

        console.log("jobs:", jobs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

const handleToggle = async (jobName, buildNumber, currentStatus, time) => {
  const newStatus = currentStatus === 'success' ? 'failure' : 'success';

  // Update status locally
  const updatedJobs = jobs.map(job => {
    if (job.buildNumber === buildNumber) {
      job.status = newStatus;
    }
    return job;
  });
  setJobs(updatedJobs);

  // Send updated status to API
  try {
    const response = await fetch('https://1ysnzjg1h6.execute-api.eu-central-1.amazonaws.com/prod/update-jobdetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '7P7ntMrQ0V1kCVOBOtZpiam9JbViedtq2mJSMIkv'
      },
      body: JSON.stringify({ jobName, buildNumber, status: newStatus, time: time})
    });
    // Handle response if needed
  } catch (error) {
    console.error('Error updating status:', error);
  }
};

const handleSort = () => {
  const sortedJobs = [...jobs].sort((a, b) => {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();
    return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
  });
    setJobs(sortedJobs);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
};


  const handleJobNameChange = (event) => {
    setSelectedJobName(event.target.value);
    console.log(event.target.value);
    setLoading(true);
    fetchDataJobName(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setLoading(true);
    fetchDataJobStatus(event.target.value);
  };

  return (
    <div>
      <h2>Job List</h2>
      <p>
      <h3> count: {listCount} </h3>
      </p>
      <div>
        <p>
          <label htmlFor="jobName">Choose Job Name:</label>
          <select id="jobName" value={selectedJobName} onChange={handleJobNameChange}>
            <option value="all">All</option>
            {Array.from(new Set(jobs.map(job => job.jobName))).map(jobName => (
              <option key={jobName} value={jobName}>{jobName}</option>
            ))}
          </select>
          &nbsp; &nbsp; &nbsp; &nbsp;
           <label htmlFor="status">Filter by Status:</label>
           <select id="status" value={selectedStatus} onChange={handleStatusChange}>
             <option value="all">All</option>
             <option value="success">Success</option>
             <option value="failure">Failure</option>
           </select>
        </p>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Job Name</th>
              <th>Build Number</th>
              <th onClick={handleSort} style={{ cursor: 'pointer' }}>Time {sortOrder === 'asc' ? '↑' : '↓'}</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs && jobs.map(job => (
              <tr key={job.buildNumber}>
                <td>{job.jobName}</td>
                <td>{job.buildNumber}</td>
                <td>{job.time}</td>
                <td>

                    <div className={`toggle ${job.status}`} onClick={() => handleToggle(job.jobName, job.buildNumber, job.status, job.time)}>
                      <div className="failure">Failure</div>
                      <div className="success">Success</div>
                      <div className="slider"></div>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobList;
