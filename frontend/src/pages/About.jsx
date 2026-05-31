import React, { useEffect, useState } from "react";
import { FaMicrophone, FaBrain, FaSearch } from 'react-icons/fa'; 
import { useSpring, animated } from '@react-spring/web';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Run animation once when the component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fade-in animation
  const fadeIn = useSpring({ 
    opacity: isVisible ? 1 : 0,
    config: { duration: 1000 }
  });

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.overlay}></div>
        <h2 style={styles.heroTitle}>Revolutionizing Forensic Investigations with AI</h2>
        <p style={styles.heroSubtitle}>AI-powered solutions for faster, more accurate evidence analysis</p>
      </div>

      {/* Main Title */}
      <animated.h2 style={{ ...styles.title, ...fadeIn }}>
        Transforming Forensic Science through Artificial Intelligence
      </animated.h2>

      {/* Content Section */}
      <animated.div style={{ ...styles.content, ...fadeIn }}>
        <p style={styles.paragraph}>
          Welcome to our <strong>AI-powered forensic analysis platform</strong>. Harnessing cutting-edge machine learning algorithms, we deliver innovative tools designed to accelerate forensic investigations by analyzing both audio and visual evidence with unprecedented speed and accuracy.
        </p>
        <div style={styles.iconSection}>
          <FaMicrophone style={styles.icon} />
          <p style={styles.paragraph}>Our platform offers seamless transcription and analysis of forensic audio, supporting multiple languages and diverse audio formats.</p>
        </div>
        <div style={styles.iconSection}>
          <FaBrain style={styles.icon} />
          <p style={styles.paragraph}>By leveraging the power of AI, we provide insightful analyses of crime scene audio, enabling investigators to expedite the investigation process while ensuring high accuracy.</p>
        </div>
        <div style={styles.iconSection}>
          <FaSearch style={styles.icon} />
          <p style={styles.paragraph}>Our platform also assists forensic experts in detecting critical evidence, enhancing investigative accuracy and supporting legal proceedings with reliable insights.</p>
        </div>
      </animated.div>

      {/* Testimonial Section */}
      <div style={styles.testimonialSection}>
        <p style={styles.testimonial}>
          "AI is redefining forensic investigations, enabling faster and more precise analysis of critical audio and visual evidence."
          <br />
          <em>- Leading Forensic Science Expert</em>
        </p>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>Powered by AI and Machine Learning Technology</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "'Times New Roman', serif",
    background: "linear-gradient(135deg,rgb(137, 175, 219), #72A0D7)",
    color: "#fff",
    borderRadius: "10px",
    marginTop: "20px",
    minHeight: "100vh",
  },
  hero: {
    position: 'relative',
    backgroundImage: 'url("https://asimily.com/wp-content/uploads/2022/12/The-Essential-Forensic-Analysis-Guide-for-IoMT-Cyber-Security.png")',
    backgroundSize: 'cover',
    color: 'white',
    padding: '50px 20px',
    textAlign: 'center',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    zIndex: 0,
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    position: "relative",
    zIndex: 1,
  },
  heroSubtitle: {
    fontSize: '24px',
    fontWeight: 'lighter',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    position: "relative",
    zIndex: 1,
  },
  title: {
    fontFamily: "'Times New Roman', serif",
    fontSize: "36px",
    fontWeight: "bold",
    color: "#E5B8A5",
    marginBottom: "20px",
  },
  content: {
    padding: "20px",
    textAlign: "left",
    marginTop: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "10px",
    color: "#000",
    zIndex: 1,
  },
  paragraph: {
    fontSize: "18px",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  iconSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: "15px",
  },
  icon: {
    fontSize: "30px",
    color: "#E5B8A5",
    marginRight: "15px",
    transition: "transform 0.3s",
  },
  testimonialSection: {
    marginTop: "40px",
    fontStyle: "italic",
    color: "#444",
    fontSize: "20px",
  },
  testimonial: {
    fontStyle: "italic",
    fontSize: "22px",
    marginTop: "30px",
    color: "#200",
    borderLeft: "4px solid #E5B8A5",
    paddingLeft: "20px",
    backgroundColor: "#f8f8f8",
    fontWeight: "normal",
  },
  footer: {
    marginTop: "50px",
    padding: "20px",
    backgroundColor: "#34495E",
    color: "#fff",
  },
  footerText: {
    fontSize: "18px",
  },
};

export default About;



