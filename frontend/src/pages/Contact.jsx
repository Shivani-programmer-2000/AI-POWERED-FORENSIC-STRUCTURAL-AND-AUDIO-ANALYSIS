import React from "react";
import { motion } from "framer-motion"; // For adding animations

const Contact = () => {
  return (
    <div style={styles.container}>
      <motion.h2
        style={styles.title}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Contact Us
      </motion.h2>
      <motion.p
        style={styles.subtitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        For inquiries or assistance, feel free to reach out to us:
      </motion.p>

      {/* Email Contact */}
      <motion.div
        style={styles.contactItem}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <span style={styles.icon}>📧</span>
        <a
          href="mailto:forensic-ai@research.com"
          style={styles.contactLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          forensic-ai@research.com
        </a>
      </motion.div>

      {/* Phone Contact */}
      <motion.div
        style={styles.contactItem}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <span style={styles.icon}>📞</span>
        <a
          href="tel:+918074408596"
          style={styles.contactLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          +91 8074408596
        </a>
      </motion.div>

      {/* Social Media Section */}
      <motion.div
        style={styles.socialContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <a
          href="https://twitter.com"
          style={styles.socialLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          🐦
        </a>
        <a
          href="https://linkedin.com"
          style={styles.socialLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          🔗
        </a>
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#F4F6F9",
    color: "#2D3436",
    padding: "40px",
    maxWidth: "800px",
    margin: "auto",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    fontSize: "36px",
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: "20px",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "18px",
    color: "#4A5568",
    marginBottom: "30px",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, background-color 0.3s ease",
  },
  icon: {
    fontSize: "30px",
    color: "#3182CE",
    marginRight: "12px",
  },
  contactLink: {
    fontSize: "18px",
    fontWeight: "500",
    color: "#2B6CB0",
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
  contactLinkHover: {
    color: "#2C5282", 
  },
  socialContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px",
  },
  socialLink: {
    fontSize: "28px",
    color: "#3182CE",
    transition: "color 0.3s ease",
  },
};

export default Contact;



