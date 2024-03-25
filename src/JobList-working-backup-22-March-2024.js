import React, { useState } from 'react';
import './JobList.css'; // Import CSS file for styling

const JobList = () => {
  const [jobs, setJobs] = useState([
    { id: 1, name: 'Job 1', status: 'success' },
    { id: 2, name: 'Job 2', status: 'success' },
    { id: 3, name: 'Job 3', status: 'success' },
  ]);

  const handleToggle = (id) => {
    const updatedJobs = jobs.map(job => {
      if (job.id === id) {
        job.status = job.status === 'success' ? 'failure' : 'success';
        // Assuming you want to send data to API here
        if (job.status === 'failure') {
          sendDataToAPI(job);
        }
      }
      return job;
    });
    setJobs(updatedJobs);
  };

  const sendDataToAPI = (job) => {
    // Code to send job data to API
    console.log(`Sending data to API for job ${job.name} with status ${job.status}`);
  };

  return (
    <div>
      <h2>Job List</h2>
      <table>
        <thead>
          <tr>
            <th>Job Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id}>
              <td>{job.name}</td>
              <td>
                <div className={`toggle ${job.status}`} onClick={() => handleToggle(job.id)}>
                  <div className="failure">Failure</div>
                  <div className="success">Success</div>
                  <div className="slider"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
