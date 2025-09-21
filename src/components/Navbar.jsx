import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "#" },
    { name: "Shortener", link: "./src/components/Navbar.jsx" },
    { name: "History", link: "./src/components/.jsx" },
    { name: "Contact", link: "./src/components/Contact.jsx" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Name */}
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          🔗 LinkShort
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 dark:text-gray-200 font-medium">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.link}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-gray-700 dark:text-gray-200"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-700">
          <ul className="flex flex-col items-center space-y-4 py-4 text-gray-700 dark:text-gray-200 font-medium">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
