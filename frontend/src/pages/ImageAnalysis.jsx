import React, { useState, useEffect } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabaseUrl = "https://wgluvzqkfetwuoafbxcp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnbHV2enFrZmV0d3VvYWZieGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMzE1NzMsImV4cCI6MjA1NzgwNzU3M30.vdDEFrVZCrmTfjLMWsK1qKcCfptWcT_tcvx2_5bbyHo"; // Replace with a secure key!
const supabase = createClient(supabaseUrl, supabaseKey);

const ImageAnalysis = () => {
  const [localImage, setLocalImage] = useState(null);
  const [supabaseImages, setSupabaseImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectedImage, setDetectedImage] = useState(null);
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage.from("forensic-files").list();
      if (error) throw error;

      const images = data
        .filter((file) => ["jpg", "jpeg", "png"].includes(file.name.split(".").pop().toLowerCase()))
        .map((file) => ({
          name: file.name,
          url: `${supabaseUrl}/storage/v1/object/public/forensic-files/${file.name}`,
        }));

      setSupabaseImages(images);
    } catch (error) {
      console.error("Error fetching images:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLocalImage(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!localImage) {
      alert("Please select an image to upload.");
      return;
    }

    setLoading(true);
    const fileName = `${Date.now()}_${localImage.name}`;

    try {
      const { data, error } = await supabase.storage
        .from("forensic-files")
        .upload(fileName, localImage);

      if (error) throw error;

      alert("Image uploaded successfully!");
      fetchImages();
    } catch (error) {
      console.error("Error uploading image:", error.message);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDetect = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();

    try {
      if (typeof selectedImage === "string") {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        const file = new File([blob], "supabase_image.jpg", { type: blob.type });
        formData.append("file", file);
      } else {
        formData.append("file", localImage);
      }

      const response = await axios.post("http://127.0.0.1:5000/detect", formData);
      setDetections(response.data.detections);
      setDetectedImage(`http://127.0.0.1:5000${response.data.image_url}`);
    } catch (error) {
      alert("Error processing the image.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const objectDescriptions = {
    "Blood Stains": "Indicates possible violence or injury; used for DNA analysis.",
    "Bloodied Cloth": "May be linked to a crime scene, containing DNA evidence.",
    "Bullets": "Potential evidence of a shooting; helps determine firearm type.",
    "Cigarette": "Contains saliva and DNA; can be linked to a suspect.",
    "Dead Body": "Primary evidence in homicide cases; forensic autopsy required.",
    "Fingerprints": "Unique biometric identifier; helps link suspects to crime.",
    "Footprints": "Used to determine movement direction and shoe type.",
    "Glass Fragments": "Broken glass from crime scenes may indicate forced entry.",
    "Gun": "Evidence in firearm-related crimes; analyzed for fingerprints.",
    "Hair": "Contains DNA, helping to identify individuals at crime scenes.",
    "Rope": "Used in strangulation or restraint; fibers analyzed for origins.",
    "Security Cameras": "Provides crucial surveillance footage for crime verification.",
    "Syringe": "Often linked to drug use or poisoning cases.",
    "Tire": "Used to identify vehicle type and movement patterns.",
    "Wallet": "May contain ID or clues about the victim or suspect.",
  };

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen p-10 flex flex-col items-center font-serif">
      <h2 className="text-4xl font-extrabold text-center mb-6 text-indigo-800">
        Forensic Image Analysis
      </h2>

      <div className="flex flex-col items-center gap-4 mb-6 w-full md:w-3/4 lg:w-1/2">
        <input type="file" accept="image/*" onChange={handleImageChange} className="p-3 border-2 border-gray-400 rounded-lg w-full text-gray-800" />
        <button onClick={handleDetect} className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg w-full md:w-auto transition duration-300">
          {loading ? "Processing..." : "Upload & Detect"}
        </button>
      </div>

      {/* Toggle Button for Supabase Images */}
      <button
        onClick={() => setShowImages(!showImages)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        {showImages ? "Hide Images" : "Show Forensic Data Images"}
      </button>

      {/* Supabase Images - Hidden Until Clicked */}
      {showImages && (
        <div className="bg-gray-200 p-4 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2 mt-4">
          <h3 className="text-xl font-bold mb-3">Supabase Images</h3>
          <div className="grid grid-cols-3 gap-4">
            {supabaseImages.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.name}
                className="cursor-pointer rounded-lg border-2 border-gray-400 hover:border-indigo-600 transition"
                onClick={() => setSelectedImage(img.url)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Selected Image */}
      {selectedImage && (
        <div className="flex justify-center mt-6 w-full md:w-3/4 lg:w-1/2">
          <div className="shadow-xl rounded-lg overflow-hidden border-4 border-gray-400">
            <img src={selectedImage} alt="Selected" className="w-full h-auto" />
          </div>
        </div>
      )}

      {/* Processed Image */}
      {detectedImage && (
        <div className="flex justify-center mt-6 w-full md:w-3/4 lg:w-1/2">
          <div className="shadow-xl rounded-lg overflow-hidden border-4 border-gray-400">
            <img src={detectedImage} alt="Processed" className="w-full h-auto" />
          </div>
        </div>
      )}

      {/* Detection Results */}
      {detections.length > 0 && (
        <div className="overflow-x-auto bg-gray-200 p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2 mt-6">
          <table className="min-w-full text-center border-collapse">
            <thead className="bg-indigo-700 text-white">
              <tr>
                <th className="border border-gray-500 px-4 py-2">Class Label</th>
                <th className="border border-gray-500 px-4 py-2">Confidence</th>
                <th className="border border-gray-500 px-4 py-2">Explanation</th>
              </tr>
            </thead>
            <tbody>
              {detections.map((det, index) => (
                <tr key={index} className="bg-gray-100 text-gray-900 hover:bg-gray-300 transition">
                  <td className="border border-gray-500 px-4 py-2">{det.class}</td>
                  <td className="border border-gray-500 px-4 py-2">{Math.round(det.confidence * 100)}%</td>
                  <td className="border border-gray-500 px-4 py-2">{objectDescriptions[det.class] || "No description available"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ImageAnalysis;




