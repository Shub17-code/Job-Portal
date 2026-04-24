import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaUserPlus />,
      title: "Create Your Profile",
      description:
        "Sign up as a candidate or employer and complete your profile to improve matching accuracy.",
    },
    {
      id: 2,
      icon: <MdFindInPage />,
      title: "Discover or Publish Jobs",
      description:
        "Candidates can explore verified listings while recruiters publish openings with clear requirements.",
    },
    {
      id: 3,
      icon: <IoMdSend />,
      title: "Apply and Shortlist Faster",
      description:
        "Submit applications instantly and manage responses through a single organized workflow.",
    },
  ];

  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Career Connect Works</h3>
          <div className="banner">
            {steps.map((step) => (
              <div className="card" key={step.id}>
                <span className="stepCount">0{step.id}</span>
                {step.icon}
                <p>{step.title}</p>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
