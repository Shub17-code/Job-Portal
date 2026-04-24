import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../main";
import { demoJobs } from "../../data/demoData";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        });
        setJobs(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  const apiJobs = jobs.jobs || [];
  const jobList = apiJobs.length > 0 ? apiJobs : demoJobs;
  const categories = [
    "All",
    ...new Set(jobList.map((job) => job.category).filter(Boolean)),
  ];
  const cities = [
    "All",
    ...new Set(jobList.map((job) => job.city).filter(Boolean)),
  ];
  const countries = [
    "All",
    ...new Set(jobList.map((job) => job.country).filter(Boolean)),
  ];

  let filteredJobs = jobList.filter((job) => {
    const searchText = search.toLowerCase();
    const textMatch =
      !searchText ||
      job.title?.toLowerCase().includes(searchText) ||
      job.category?.toLowerCase().includes(searchText) ||
      job.country?.toLowerCase().includes(searchText) ||
      job.city?.toLowerCase().includes(searchText);

    const categoryMatch =
      selectedCategory === "All" || job.category === selectedCategory;
    const cityMatch = selectedCity === "All" || job.city === selectedCity;
    const countryMatch =
      selectedCountry === "All" || job.country === selectedCountry;

    return textMatch && categoryMatch && cityMatch && countryMatch;
  });

  if (sortBy === "title-asc") {
    filteredJobs = [...filteredJobs].sort((a, b) =>
      (a.title || "").localeCompare(b.title || "")
    );
  } else if (sortBy === "title-desc") {
    filteredJobs = [...filteredJobs].sort((a, b) =>
      (b.title || "").localeCompare(a.title || "")
    );
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>All Available Jobs</h1>
        <p className="subtitle">
          Browse, filter, and discover opportunities that match your skills.
        </p>

        <div className="jobsToolbar">
          <input
            type="text"
            placeholder="Search by role, category, city or country"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Sort: Default</option>
            <option value="title-asc">Title: A to Z</option>
            <option value="title-desc">Title: Z to A</option>
          </select>
        </div>

        <div className="jobsMeta">
          <span>Showing {filteredJobs.length} jobs</span>
          {apiJobs.length === 0 && (
            <span className="demoBadge">Demo jobs are displayed</span>
          )}
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
              setSelectedCity("All");
              setSelectedCountry("All");
              setSortBy("default");
            }}
          >
            Reset Filters
          </button>
        </div>

        <div className="banner">
          {loading ? (
            <div className="jobsState">Loading jobs...</div>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <div>
                    <p>{element.title}</p>
                    <p>{element.category}</p>
                  </div>
                  <div className="jobTags">
                    <span>{element.country}</span>
                    {element.city && <span>{element.city}</span>}
                    {element.location && <span>{element.location}</span>}
                  </div>
                  <div className="cardActions">
                    <Link to={`/job/${element._id}`}>View Details</Link>
                    {user && user.role !== "Employer" && (
                      <Link to={`/application/${element._id}`}>Apply</Link>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="jobsState">
              No jobs found with current filters. Try adjusting your search.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
