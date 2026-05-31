import React, { useState } from "react";
import axios from "axios";

function ObjectDetection() {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [detections, setDetections] = useState([]);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      console.log("Uploading image...");
      const response = await axios.post("http://127.0.0.1:5000/detect", formData);
      console.log("Full API Response:", response.data);

      if (response.data.image_url) {
        const fullImageUrl = `http://127.0.0.1:5000${response.data.image_url}`;
        console.log("Processed Image URL:", fullImageUrl);
        setImageURL(fullImageUrl);
      } else {
        console.error("No image URL returned from backend");
      }

      if (response.data.detections) {
        setDetections(response.data.detections);
      }
    } catch (error) {
      console.error("Error detecting objects:", error);
      alert("Error detecting objects. Check Flask logs.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>YOLOv5 Object Detection</h2>

      {/* Image Upload */}
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload & Detect</button>

      {/* Show Uploaded Image */}
      {image && (
        <div>
          <h3>Uploaded Image</h3>
          <img src={URL.createObjectURL(image)} alt="Uploaded" width="300px" />
        </div>
      )}

      {/* Show Processed Image */}
      {imageURL && (
        <div>
          <h3>Processed Image</h3>
          <img src={imageURL} alt="Processed" width="300px" />
        </div>
      )}

      {/* Show Detections */}
      {detections.length > 0 && (
        <div>
          <h3>Detected Objects</h3>
          <ul>
            {detections.map((det, index) => (
              <li key={index}>
                {det.class} (Confidence: {Math.round(det.confidence * 100)}%)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ObjectDetection;
