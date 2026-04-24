import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const getDemoApplications = () =>
    JSON.parse(localStorage.getItem("demoApplications") || "[]");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const demoApplications = getDemoApplications();
        if (user && user.role === "Employer") {
          const res = await axios.get(
            "http://localhost:4000/api/v1/application/employer/getall",
            {
              withCredentials: true,
            }
          );
          setApplications(res.data.applications || []);
        } else {
          const res = await axios.get(
            "http://localhost:4000/api/v1/application/jobseeker/getall",
            {
              withCredentials: true,
            }
          );
          setApplications([...(res.data.applications || []), ...demoApplications]);
        }
      } catch (error) {
        const demoApplications = getDemoApplications();
        if (user && user.role !== "Employer") {
          setApplications(demoApplications);
        }
        toast.error(error.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [isAuthorized]);

  if (!isAuthorized) {
    return <Navigate to="/" />;
  }

  const deleteApplication = (id) => {
    if (id.startsWith("demo-app-")) {
      const nextApplications = applications.filter(
        (application) => application._id !== id
      );
      const demoOnly = nextApplications.filter((item) => item.isDemoApplication);
      localStorage.setItem("demoApplications", JSON.stringify(demoOnly));
      setApplications(nextApplications);
      toast.success("Demo application deleted");
      return;
    }

    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {loading ? (
            <div className="applicationsState">Loading applications...</div>
          ) : applications.length <= 0 ? (
            <div className="applicationsState">No applications found.</div>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Job Seekers</h1>
          {loading ? (
            <div className="applicationsState">Loading applications...</div>
          ) : applications.length <= 0 ? (
            <div className="applicationsState">No applications found.</div>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          {element.jobTitle && (
            <p>
              <span>Job Title:</span> {element.jobTitle}
            </p>
          )}
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          {element.resume?.url ? (
            <img
              src={element.resume.url}
              alt="resume"
              onClick={() => openModal(element.resume.url)}
            />
          ) : (
            <div className="resumePlaceholder">Resume attached in demo mode</div>
          )}
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </>
  );
};
