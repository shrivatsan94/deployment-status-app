import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import './JobList.css'; // Import CSS file for styling

const JobList = () => {
  const [jobs, setJobs] = useState([]); // Initialize jobs state with an empty array
  const [selectedJobName, setSelectedJobName] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [listCount, setListCount] = useState(0);
  const [sortOrder, setSortOrder] = useState('desc');
  //const [selectedDate, setSelectedDate] = useState(new Date()); // Default selected date is today
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

    useEffect(() => {
      // Set default dates as one week from now
      const defaultStartDate = new Date();
      defaultStartDate.setDate(defaultStartDate.getDate() - 7);
      setStartDate(defaultStartDate);
      setEndDate(new Date());
    }, []);

      const handleStartDateChange = date => {
        setStartDate(date);
        if (startDate && date > endDate) {
          // If start date is later than end date, reset end date
          setEndDate(null);
        }
      };

      //const handleEndDateChange = date => {
      //  setEndDate(date);
      //  if (startDate && date < startDate) {
      //    // If end date is earlier than start date, reset start date
      //    setStartDate(null);
      //  }
      //};

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);// Refetch data when selectedDate changes

  const fetchData = async () => {
    try {
      // Calculate date range for the past 7 days

      let endpoint = "https://1ysnzjg1h6.execute-api.eu-central-1.amazonaws.com/prod/get-jobDetailsTimeBased"
      endpoint += `?jobName=${selectedJobName}&jobStatus=${selectedStatus}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;

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
      let endpoint = "https://1ysnzjg1h6.execute-api.eu-central-1.amazonaws.com/prod/get-jobDetailsTimeBased"

      endpoint += `?jobName=${jobname}&jobStatus=${selectedStatus}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;

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
        let endpoint = "https://1ysnzjg1h6.execute-api.eu-central-1.amazonaws.com/prod/get-jobDetailsTimeBased"

        endpoint += `?jobName=${selectedJobName}&jobStatus=${jobstatus}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;

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
    setLoading(true);
    fetchDataJobName(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setLoading(true);
    fetchDataJobStatus(event.target.value);
  };

  const handleUpdateFailureReason = async (job) => {
    try {
      const response = await fetch('https://1ysnzjg1h6.execute-api.eu-central-1.amazonaws.com/prod/update-jobdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '7P7ntMrQ0V1kCVOBOtZpiam9JbViedtq2mJSMIkv'
        },
        body: JSON.stringify({ jobName: job.jobName, buildNumber: job.buildNumber, status: job.status, failureReason: job.failureReason, time: job.time})
      });
      // Handle response if needed
    } catch (error) {
      console.error('Error updating failure reason:', error);
    }
  };

  const handleFailureReasonChange = (event, job) => {
    const updatedJobs = jobs.map(j => {
      if (j.buildNumber === job.buildNumber) {
        return { ...j, failureReason: event.target.value };
      }
      return j;
    });
    setJobs(updatedJobs);
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
          &nbsp; &nbsp; &nbsp; &nbsp;
          <label htmlFor="datePicker">Select Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => handleStartDateChange(date)}
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
              <th>Failure description if any</th>
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
                <td>
                  {job.status === 'failure' ? (
                       <textarea
                         value={job.failureReason || ''}
                         onChange={(event) => handleFailureReasonChange(event, job)}
                         rows={8} // Set the number of visible text lines
                         cols={100} // Set the number of visible text columns
                         style={{ resize: 'vertical' }} // Allow vertical resizing
                       />
                     ) : null}
                </td>
                <td>
                  {job.status === 'failure' ? (
                    <button onClick={() => handleUpdateFailureReason(job)}>Update</button>
                  ) : null}
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
