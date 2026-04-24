export const demoJobs = [
  {
    _id: "demo-1",
    title: "Frontend Developer",
    category: "Frontend Web Development",
    country: "India",
    city: "Bengaluru",
    location: "Hybrid",
    description:
      "Build responsive user interfaces using React, collaborate with designers, and optimize web performance for production applications.",
    fixedSalary: "1200000",
    jobPostedOn: "2026-04-20T00:00:00.000Z",
  },
  {
    _id: "demo-2",
    title: "UI/UX Designer",
    category: "Graphics & Design",
    country: "India",
    city: "Pune",
    location: "Remote",
    description:
      "Design user journeys, wireframes, and polished interfaces for consumer-facing products with strong focus on usability and accessibility.",
    salaryFrom: "700000",
    salaryTo: "1000000",
    jobPostedOn: "2026-04-18T00:00:00.000Z",
  },
  {
    _id: "demo-3",
    title: "MERN Stack Engineer",
    category: "MERN STACK Development",
    country: "India",
    city: "Hyderabad",
    location: "Onsite",
    description:
      "Develop full-stack features across Node.js, Express, MongoDB, and React while maintaining scalable APIs and robust code quality.",
    salaryFrom: "1000000",
    salaryTo: "1600000",
    jobPostedOn: "2026-04-16T00:00:00.000Z",
  },
  {
    _id: "demo-4",
    title: "Mobile App Developer",
    category: "Mobile App Development",
    country: "India",
    city: "Mumbai",
    location: "Hybrid",
    description:
      "Create high-quality mobile apps with modern UI patterns, smooth performance, and strong integration with backend services.",
    fixedSalary: "1100000",
    jobPostedOn: "2026-04-14T00:00:00.000Z",
  },
];

export const isDemoJob = (jobId = "") => jobId.startsWith("demo-");
