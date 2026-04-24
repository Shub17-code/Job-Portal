import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Link, Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const Home = () => {
  const { isAuthorized, user } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
        <div className="homeTestimonials">
          <div className="container">
            <h3>Success Stories</h3>
            <p>
              Professionals and recruiters trust Career Connect for faster
              hiring and better role matching.
            </p>
            <div className="banner">
              <div className="card">
                <p>
                  "I got interview calls within 48 hours after applying through
                  optimized profile filters."
                </p>
                <span>Priya S. - Frontend Developer</span>
              </div>
              <div className="card">
                <p>
                  "The applicant quality is significantly better. We filled two
                  urgent engineering roles in a week."
                </p>
                <span>Rohan M. - Hiring Manager</span>
              </div>
              <div className="card">
                <p>
                  "A clean dashboard and simple application flow made job
                  hunting much less stressful."
                </p>
                <span>Arjun K. - Product Designer</span>
              </div>
            </div>
          </div>
        </div>
        <div className="homeCta">
          <div className="container">
            <h3>Ready to make your next move?</h3>
            <p>
              Explore curated openings, track applications, and connect with top
              employers in one place.
            </p>
            <div className="actions">
              <Link to="/job/getall">Explore Jobs</Link>
              {user && user.role === "Employer" ? (
                <Link to="/job/post">Post A Job</Link>
              ) : (
                <Link to="/applications/me">View Applications</Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
