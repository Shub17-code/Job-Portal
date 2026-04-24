import React, { useContext } from "react";
import { Context } from "../../main";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";

function Footer() {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; Career Connect. All rights reserved.</div>
      <div>
        <a
          href="https://github.com/exclusiveabhi"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="https://leetcode.com/u/exclusiveabhi/"
          target="_blank"
          rel="noreferrer"
        >
          <SiLeetcode />
        </a>
        <a
          href="https://www.linkedin.com/in/abhishek-rajput-/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.instagram.com/exclusiveabhi/"
          target="_blank"
          rel="noreferrer"
        >
          <RiInstagramFill />
        </a>
      </div>
    </footer>
  );
}

export default Footer;