import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// ✅ Use correct relative paths
import heroImage from "../assets/forensic-hero.jpg";
import analysisImage from "../assets/analysis.jpg";
import researchImage from "../assets/research.jpg";
import contactImage from "../assets/contact.jpg";

// 🎨 Feature Card Component (Glassmorphism + Smooth Motion)
const FeatureCard = ({ img, title, desc, link, icon }) => (
  <motion.div
    className="bg-white/80 p-6 rounded-xl text-center shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 backdrop-blur-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    aria-hidden="true"
  >
    <Link to={link} className="block">
      <div className="mb-4 text-5xl text-purple-700">{icon}</div>
      <img
        src={img}
        alt={title}
        className="rounded-xl mb-4 w-full h-52 object-cover transition duration-300 transform hover:scale-110 shadow-md"
        loading="lazy"
      />
      <h3 className="text-2xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-700 text-base">{desc}</p>
    </Link>
  </motion.div>
);

const Home = () => {
  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      {/* 🔥 Hero Section (Dark Mode, Glassmorphism) */}
      <div
        className="relative h-[75vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="bg-black/60 p-10 md:p-14 rounded-xl shadow-xl max-w-3xl mx-auto backdrop-blur-md">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-white mb-6 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            AI-Powered Forensic Investigations
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Transforming forensic analysis with state-of-the-art AI for image & audio investigations.
          </motion.p>
          <Link to="/image-analysis">
            <motion.button
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transform hover:scale-105 shadow-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              aria-label="Get Started with Image Analysis"
            >
              Explore Image Analysis
            </motion.button>
          </Link>
        </div>
      </div>

      {/* 🔥 Features Section (Glass Cards, Smooth Hover) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6 md:p-12">
        {[
          {
            img: analysisImage,
            title: "Image Analysis",
            desc: "AI-powered object and forgery detection.",
            link: "/image-analysis",
            icon: "📸",
          },
          {
            img: researchImage,
            title: "Research",
            desc: "Advanced AI models for forensic science.",
            link: "/research",
            icon: "🧪",
          },
          {
            img: contactImage,
            title: "Contact",
            desc: "Reach out for collaborations and inquiries.",
            link: "/contact",
            icon: "📞",
          },
        ].map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Home); // ✅ Prevent unnecessary re-renders





