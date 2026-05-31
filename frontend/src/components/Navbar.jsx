import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaHome, FaImage, FaHeadphones, 
  FaFileAlt, FaPhoneAlt, FaTachometerAlt, 
  FaDatabase, FaInfoCircle 
} from "react-icons/fa";

const navItems = [
  { to: "/", label: "Home", icon: <FaHome />, color: "from-blue-500 to-blue-700" },
  { to: "/about", label: "About", icon: <FaInfoCircle />, color: "from-yellow-500 to-yellow-700" },
  { to: "/image-analysis", label: "Image Analysis", icon: <FaImage />, color: "from-green-500 to-green-700" },
  { to: "/audio-analysis", label: "Audio Analysis", icon: <FaHeadphones />, color: "from-teal-400 to-teal-600" },
  { to: "/research", label: "Research", icon: <FaFileAlt />, color: "from-purple-500 to-purple-700" },
  { to: "/contact", label: "Contact", icon: <FaPhoneAlt />, color: "from-orange-500 to-orange-700" },
  { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt />, color: "from-red-500 to-red-700" },
  { to: "/forensic-data", label: "Forensic Data", icon: <FaDatabase />, color: "from-green-600 to-green-800" },
];

const Navbar = ({ brandTitle = "" }) => {
  const location = useLocation();

  return (
    <nav className="bg-gray-900 shadow-2xl py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Brand Title (conditionally rendered) */}
        {brandTitle && (
          <h1 className="text-3xl font-extrabold text-gray-200 tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            {brandTitle}
          </h1>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
          {navItems.map((item, index) => (
            <NavItem 
              key={index} 
              to={item.to} 
              label={item.label} 
              icon={item.icon} 
              color={item.color} 
              isActive={location.pathname === item.to} 
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

// 🎨 Glassmorphism Button Component
const NavItem = ({ to, label, icon, color, isActive }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 px-5 py-3 font-semibold rounded-lg transition-all duration-300 shadow-lg
        bg-gradient-to-r ${color} text-white backdrop-blur-md bg-opacity-20
        transform hover:scale-110 hover:shadow-xl ${
          isActive ? "ring-4 ring-blue-400 scale-105 shadow-2xl" : ""
        }`}
    >
      {icon} <span className="text-lg">{label}</span>
    </Link>
  );
};

export default Navbar;



