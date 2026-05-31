import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ImageAnalysis from "./pages/ImageAnalysis";
import AudioAnalysis from "./pages/AudioAnalysis";
import Research from "./pages/Research";
import Contact from "./pages/Contact";
import ObjectDetection from "./pages/ObjectDetection";
import Dashboard from "./pages/Dashboard";
import Page from './components/Page';  
import ForensicList from "./components/ForensicList";  
import About from "./pages/About"; 

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: "80vh", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/image-analysis" element={<ImageAnalysis />} />
          <Route path="/audio-analysis" element={<AudioAnalysis />} />
          <Route path="/research" element={<Research />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/object-detection" element={<ObjectDetection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/todos" element={<Page />} />
          <Route path="/forensic-data" element={<ForensicList />} /> {/* ✅ Route remains intact */}
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;







