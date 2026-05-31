import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // For animations

function Dashboard() {
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch previous analysis reports from backend
    fetch("http://localhost:5000/get-analysis-history")
      .then((res) => res.json())
      .then((data) => {
        setAnalysisHistory(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching analysis history:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <motion.h1
        style={styles.title}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Forensic Analysis Dashboard
      </motion.h1>
      
      {loading ? (
        <p style={styles.loadingText}>Loading analysis history...</p>
      ) : analysisHistory.length > 0 ? (
        <div style={styles.historyContainer}>
          {analysisHistory.map((item, index) => (
            <motion.div
              key={index}
              style={styles.reportCard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3 style={styles.caseID}>Case ID: {item.case_id}</h3>
              <p><strong>File Name:</strong> {item.file_name}</p>
              <p><strong>Type:</strong> {item.file_type}</p>
              <p><strong>Analysis Result:</strong> {item.result}</p>
              <p><strong>Timestamp:</strong> {new Date(item.timestamp).toLocaleString()}</p>
              <motion.button
                style={styles.downloadBtn}
                onClick={() => {
                  const downloadUrl = `http://localhost:5000/download-image-report/${item.case_id}`;
                  window.open(downloadUrl, "_blank");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                Download Report
              </motion.button>
            </motion.div>
          ))}
        </div>
      ) : (
        <p style={styles.noData}>No forensic reports available.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    backgroundColor: "#F5F7FA",
    minHeight: "100vh",
  },
  title: {
    fontSize: "32px",
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: "30px",
  },
  historyContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    padding: "0 20px",
  },
  reportCard: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    overflow: "hidden",
  },
  caseID: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#2C3E50",
    marginBottom: "10px",
  },
  noData: {
    fontSize: "20px",
    color: "#888",
  },
  loadingText: {
    fontSize: "20px",
    color: "#4A90E2",
    fontWeight: "500",
  },
  downloadBtn: {
    marginTop: "15px",
    padding: "12px 20px",
    backgroundColor: "#4A90E2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
};

export default Dashboard;
