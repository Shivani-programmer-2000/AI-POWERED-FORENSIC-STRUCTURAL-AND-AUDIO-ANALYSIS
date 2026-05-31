import React, { useState, useEffect } from "react";

const Research = () => {
  const [loading, setLoading] = useState(true);

  const researchPapers = [
    { title: "YOLOv3 and YOLOv4: Multiple Object Detection for Surveillance Applications", file: "YOLOv3_and_YOLOv4_Multiple_Object_Detection_for_Surveillance_Applications_2020.pdf" },
    { title: "A Review of YOLO Object Detection Model in Forensic Evidence Analysis", file: "A_Review_of_YOLO_Object_Detection_Model_in_Forensic_Evidence_Analysis.pdf" },
    { title: "A Soft-YoloV4 for High-Performance Head Detection", file: "A_Soft-YoloV4_for_High-Performance_Head_Detection.pdf" },
    { title: "Faster R-CNN: Towards Real-Time Object Detection", file: "Faster_R-CNN_Towards_Real-Time_Object_Detection_with_Region_Proposal_Networks.pdf" },
    { title: "Gun Detection: A Comparative Study of RetinaNet, EfficientDet, and YOLOv8", file: "Gun_Detection_A_Comparative_Study_of_RetinaNet_EfficientDet_and_YOLOv8_on_Custom_Dataset.pdf" },
    { title: "Weapon Detection System Using YOLOv8", file: "Weapon_Detection_System_For_Security_And_Surveillance_Using_YOLOv8.pdf" },
    { title: "You Only Look Once (YOLO) - Redmon CVPR 2016", file: "Redmon_You_Only_Look_CVPR_2016_paper.pdf" },
    { title: "A Review of YOLO Object Detection Algorithms", file: "A_Review_of_YOLO_Object_Detection_Algorithms_based.pdf" },
    { title: "Real-Time Crime Detection Using Deep Learning", file: "Real_Time_Crime_Detection_Using_Deep_Learning_Algorithm.pdf" }
  ];

  useEffect(() => {
    // Simulating a loading state for dynamic content loading
    const timer = setTimeout(() => setLoading(false), 2000); // Set loading to false after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center p-10 bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 min-h-screen">
      <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">Research Papers</h2>
      <p className="mt-4 text-lg text-gray-600">
        Our AI forensic research focuses on advanced image and audio analysis, enhancing security and legal investigations.
      </p>

      <h3 className="text-2xl font-bold mt-6 text-gray-700">Available Research Papers</h3>

      {loading ? (
        <div className="flex justify-center items-center mt-6">
          <div className="w-24 h-24 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {researchPapers.map((paper, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-xl"
              aria-labelledby={`paper-title-${index}`}
            >
              <h4
                id={`paper-title-${index}`}
                className="font-semibold text-xl text-gray-900 mb-4 transition duration-300 ease-in-out hover:text-blue-500"
              >
                {paper.title}
              </h4>
              <a
                href={`/research_papers/${paper.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium underline mt-2 inline-block hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`View ${paper.title}`}
              >
                View Paper
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Research;




