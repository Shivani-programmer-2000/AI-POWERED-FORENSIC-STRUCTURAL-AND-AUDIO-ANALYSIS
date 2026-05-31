import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">&copy; 2025 AI Forensic Analysis. All rights reserved.</p>
        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-white hover:text-gray-400 text-xl" />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-white hover:text-gray-400 text-xl" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-white hover:text-gray-400 text-xl" />
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-white hover:text-gray-400 text-xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

