import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center space-y-3">
        {/* Made by */}
        <p className="text-sm text-center">
          © {new Date().getFullYear()} Made by <span className="font-semibold">Vikas</span>
        </p>

        {/* Contact Icons */}
        <div className="flex gap-6 text-lg justify-center">
          <a
            href="https://www.linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:vikas@example.com"
            className="hover:text-red-500 dark:hover:text-red-400 transition"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
