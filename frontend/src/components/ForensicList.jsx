import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const ForensicData = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Fetch Data from Supabase
  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("forensic_data").select("*");

    if (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data.");
    } else {
      setData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle File Selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Insert Data into forensic_data
  const insertData = async () => {
    if (!name || !file) {
      alert("Please enter a file name and select a file.");
      return;
    }

    setUploading(true);

    try {
      const filePath = `${Date.now()}-${file.name}`;

      // Upload file to Supabase Storage
      const { data: fileData, error: fileError } = await supabase.storage
        .from("forensic-files")
        .upload(filePath, file);

      if (fileError || !fileData?.path) {
        console.error("Error uploading file:", fileError);
        alert(`File upload failed: ${fileError?.message || "Unknown error"}`);
        setUploading(false);
        return;
      }

      // Get Public URL
      const { data: publicUrlData } = supabase.storage
        .from("forensic-files")
        .getPublicUrl(fileData.path);

      if (!publicUrlData?.publicUrl) {
        alert("Failed to retrieve file URL. Try again.");
        setUploading(false);
        return;
      }

      // Insert Data into forensic_data table
      const { data: insertedData, error: insertError } = await supabase
        .from("forensic_data")
        .insert([
          {
            file_name: name,
            file_type: file.type,
            file_url: publicUrlData.publicUrl,
            description: new Date().toISOString(),
          },
        ])
        .select();

      if (insertError) {
        console.error("Error inserting data:", insertError);
        alert(`Insert failed: ${insertError.message}`);
      } else {
        console.log("Data inserted:", insertedData);
        setData((prevData) => [...prevData, ...insertedData]);
        setName("");
        setFile(null);
        document.getElementById("fileInput").value = "";
        alert("Data successfully inserted!");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Upload Forensic Files</h2>
      <div style={styles.formContainer}>
        <input
          type="text"
          placeholder="Enter file name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          style={styles.input}
        />
        <button
          onClick={insertData}
          style={uploading ? styles.disabledButton : styles.insertButton}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <div style={styles.tableContainer}>
        <h3>Uploaded Files</h3>
        {loading ? (
          <p>Loading files...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.tableCell}>File Name</th>
                <th style={styles.tableCell}>File Type</th>
                <th style={styles.tableCell}>Uploaded Date</th>
                <th style={styles.tableCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{item.file_name}</td>
                  <td style={styles.tableCell}>{item.file_type}</td>
                  <td style={styles.tableCell}>
                    {new Date(item.description).toLocaleString()}
                  </td>
                  <td style={styles.tableCell}>
                    <a
                      href={item.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.fileLink}
                    >
                      View File
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f4f7f6",
    minHeight: "100vh",
    fontFamily: "'Arial', sans-serif",
    color: "#333",
  },
  formContainer: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    display: "inline-block",
    width: "100%",
    maxWidth: "600px",
  },
  input: {
    padding: "12px",
    margin: "12px 0",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    transition: "border-color 0.3s ease",
  },
  insertButton: {
    padding: "12px 18px",
    backgroundColor: "#28a745",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  disabledButton: {
    backgroundColor: "gray",
    color: "white",
    cursor: "not-allowed",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
  },
  tableContainer: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    margin: "30px auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
  },
  tableHeader: {
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    textAlign: "left",
  },
  tableRow: {
    transition: "background-color 0.3s ease",
  },
  tableCell: {
    padding: "15px",
    textAlign: "left",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  tableRowHover: {
    backgroundColor: "#f1f1f1",
  },
  fileLink: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default ForensicData;





