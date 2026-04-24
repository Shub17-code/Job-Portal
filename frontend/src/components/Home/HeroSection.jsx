import React from "react";
import { useContext } from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Context } from "../../main";

const HeroSection = () => {
  const { user } = useContext(Context);
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <span className="heroBadge">Smart matching for jobs and talent</span>
            <h1>Find opportunities that align with your career goals</h1>
            <p>
              Discover role-specific opportunities, apply in minutes, and track
              progress in one streamlined dashboard built for job seekers and
              employers.
            </p>
            <div className="heroActions">
              <Link to="/job/getall">Find Jobs</Link>
              {user && user.role === "Employer" ? (
                <Link to="/job/post">Post A Job</Link>
              ) : (
                <Link to="/applications/me">My Applications</Link>
              )}
            </div>
          </div>
          <div className="image">
            <img src="/heroS.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
