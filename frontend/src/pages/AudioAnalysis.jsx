import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

function AudioAnalysis() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [language, setLanguage] = useState("en");
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile || !selectedFile.type.startsWith("audio/")) {
      alert("Please upload a valid audio file!");
      return;
    }
    setFile(selectedFile);

    if (wavesurfer.current) {
      wavesurfer.current.destroy();
    }

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#4A90E2",
      progressColor: "#003366",
      cursorColor: "#FF4500",
      barWidth: 2,
      responsive: true,
      height: 80,
      backend: "MediaElement",
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      const audioBlob = new Blob([e.target.result], { type: selectedFile.type });
      const audioURL = URL.createObjectURL(audioBlob);
      wavesurfer.current.load(audioURL);

      wavesurfer.current.on("ready", () => {
        wavesurfer.current.play();
      });
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  const handleAudioUpload = async () => {
    if (!file) {
      alert("No file selected!");
      return;
    }
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", language);

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setTranscription(data.transcription || "No transcription available.");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to analyze audio.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transcription);
    alert("Transcription copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([transcription], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transcription.txt";
    link.click();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎶 AI-Powered Audio Analysis</h2>

      <div style={styles.box}>
        <h3 style={styles.subtitle}>📂 Upload Audio</h3>
        <input type="file" accept="audio/*" onChange={handleFileChange} style={styles.input} />
        <button onClick={handleAudioUpload} disabled={isUploading} style={styles.button}>
          {isUploading ? "Uploading..." : "Analyze Audio"}
        </button>
      </div>

      {file && (
        <div style={styles.box}>
          <h3 style={styles.subtitle}>🔊 Uploaded Audio</h3>
          <audio controls>
            <source src={URL.createObjectURL(file)} type={file.type} />
            Your browser does not support the audio element.
          </audio>
          <div ref={waveformRef} style={styles.waveform}></div>
        </div>
      )}

      {transcription && (
        <div style={styles.box}>
          <h3 style={styles.subtitle}>📝 Transcription</h3>
          <p style={styles.transcription}>{transcription}</p>
          <div style={styles.buttonsContainer}>
            <button onClick={handleCopy} style={styles.copyButton}>📋 Copy</button>
            <button onClick={handleDownload} style={styles.downloadButton}>⬇️ Download</button>
          </div>
        </div>
      )}

      <div style={styles.box}>
        <h3 style={styles.subtitle}>🌍 Select Language</h3>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={styles.select}>
          <option value="en">English</option>
          <option value="te">తెలుగు (Telugu)</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="kn">ಕನ್ನಡ (Kannada)</option>
          <option value="hi">हिन्दी (Hindi)</option>
        </select>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    fontFamily: "Times New Roman, serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: "30px",
  },
  subtitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  box: {
    border: "2px solid #4A90E2",
    borderRadius: "12px",
    padding: "20px",
    margin: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #4A90E2",
    margin: "10px 0",
  },
  button: {
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#4A90E2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
  transcription: {
    fontSize: "18px",
    fontStyle: "italic",
    padding: "15px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    margin: "20px 0",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
  waveform: {
    width: "100%",
    height: "80px",
    backgroundColor: "#ddd",
    marginTop: "15px",
  },
  buttonsContainer: {
    marginTop: "15px",
  },
  copyButton: {
    padding: "10px 20px",
    backgroundColor: "#4A90E2",
    color: "#fff",
    borderRadius: "8px",
    border: "none",
    margin: "0 10px",
    cursor: "pointer",
  },
  downloadButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    borderRadius: "8px",
    border: "none",
    margin: "0 10px",
    cursor: "pointer",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #4A90E2",
    marginTop: "10px",
  },
};

export default AudioAnalysis;






