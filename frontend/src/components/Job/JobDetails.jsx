import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { demoJobs, isDemoJob } from "../../data/demoData";
const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    if (isDemoJob(id)) {
      const demoJob = demoJobs.find((item) => item._id === id);
      if (demoJob) {
        setJob(demoJob);
      } else {
        navigateTo("/notfound");
      }
      return;
    }

    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) return <Navigate to="/login" />;

  const postedOn = job.jobPostedOn
    ? new Date(job.jobPostedOn).toLocaleDateString()
    : "Not available";

  const salaryText = job.fixedSalary
    ? `Rs ${job.fixedSalary}`
    : job.salaryFrom && job.salaryTo
    ? `Rs ${job.salaryFrom} - Rs ${job.salaryTo}`
    : "Not disclosed";

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <div className="jobDetailHeader">
            <h4>{job.title || "Role not available"}</h4>
            <div className="jobDetailTags">
              {job.category && <span>{job.category}</span>}
              {job.country && <span>{job.country}</span>}
              {job.city && <span>{job.city}</span>}
              {job.location && <span>{job.location}</span>}
            </div>
          </div>

          <div className="jobDetailGrid">
            <p>
              Salary: <span>{salaryText}</span>
            </p>
            <p>
              Posted On: <span>{postedOn}</span>
            </p>
          </div>

          <div className="jobDescription">
            <p>Job Description</p>
            <span>{job.description || "No description provided."}</span>
          </div>

          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
