import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // React Router for navigation
import {
  FaHome,
  FaInfoCircle,
  FaCogs,
  FaPhoneAlt,
  FaChevronDown,
  FaChevronUp,
  FaUser,
} from "react-icons/fa"; // Icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar open/close state
  const [isServicesOpen, setIsServicesOpen] = useState(false); // Services submenu state
  const location = useLocation(); // To track the active link

  const toggleSidebar = () => setIsOpen(!isOpen); // Toggle sidebar visibility
  const toggleServices = () => setIsServicesOpen(!isServicesOpen); // Toggle services submenu

  // Utility function to add 'active' class to the current route
  const getLinkClass = (path) =>
    location.pathname === path
      ? "bg-teal-600 text-white"
      : "text-black hover:text-white hover:bg-gray-700";

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-black w-64 p-4 transform transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold">Love Nest</h2>
          {/* { isOpen &&
           <button
            onClick={toggleSidebar}
            className=" px-2 py-1 bg-gray-800 rounded-md text-white"
          >
            ☰
          </button>} */}
        </div>

        {/* Sidebar Menu */}
        <ul className="space-y-2">
        <li>
            <Link
              to="/dashboard"
              className={`flex items-center py-2 px-3 rounded-md ${getLinkClass(
                "/dashboard"
              )}`}
            >
              <FaHome className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/Profile"
              className={`flex items-center py-2 px-3 rounded-md ${getLinkClass(
                "/Profile"
              )}`}
            >
              <FaUser className="mr-3" />
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`flex items-center py-2 px-3 rounded-md ${getLinkClass(
                "/about"
              )}`}
            >
              <FaInfoCircle className="mr-3" />
              About
            </Link>
          </li>

          {/* Services submenu */}
          {/* <li>
          <li>
            <button
              onClick={toggleServices}
              className={`flex items-center py-2 px-3 w-full rounded-md ${getLinkClass(
                "/services"
              )}`}
            >
              <FaCogs className="mr-3" />
              Services
              {isServicesOpen ? (
                <FaChevronUp className="ml-auto" />
              ) : (
                <FaChevronDown className="ml-auto" />
              )}
            </button>
            {isServicesOpen && (
              <ul className="space-y-1 pl-8 block">
                <li>
                  <Link
                    to="/services/design"
                    className="text-black hover:bg-gray-700 hover:text-white py-1 w-full px-3 rounded-md block text-left	"
                  >
                    Web Design
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/development"
                    className="text-black hover:bg-gray-700 hover:text-white py-1 w-full px-3 rounded-md block text-left"
                  >
                    Web Development
                  </Link>
                </li>
              </ul>
            )}
          </li> */}
          <li>
            <Link
              to="/service"
              className={`flex items-center py-2 px-3 rounded-md ${getLinkClass(
                "/service"
              )}`}
            >
              <FaCogs className="mr-3" />
              Services
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className={`flex items-center py-2 px-3 rounded-md ${getLinkClass(
                "/contact"
              )}`}
            >
              <FaPhoneAlt className="mr-3" />
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Sidebar Toggle Button (for mobile) */}

      <button
        onClick={toggleSidebar}
        className={
          !isOpen
            ? ` fixed top-4 left-4 px-2 py-1 bg-black/70 text-white rounded-md shadow-md transform transition-transform duration-1000 ${
                isOpen ? "-translate-x-full" : "translate-x-0"
              }`
            : "fixed top-4 left-52 px-2 py-1 backdrop-blur-md bg-black/60 bg-gray-800 rounded-md text-white"
        }
      >
        ☰
      </button>
    </div>
  );
};

export default Sidebar;
