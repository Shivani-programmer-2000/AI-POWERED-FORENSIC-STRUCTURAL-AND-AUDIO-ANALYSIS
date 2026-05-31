
# 🧪 AI-Powered Forensic Image & Audio Analyzer

## 🔍 Overview

The **AI-Powered Forensic Image & Audio Analyzer** is an intelligent, full-stack web application that empowers law enforcement, researchers, and security agencies to analyze evidence with precision. It enables **real-time object detection** and **audio classification** using cutting-edge AI models, helping identify threats such as weapons or suspicious sounds in multimedia files.

Built with **React**, **Flask**, and **YOLOv5**, this solution streamlines forensic analysis through an intuitive dashboard, automated reporting, and academic-grade research integration.

---

## 🚀 Key Features

| Feature | Description |
|--------|-------------|
| 🧠 **Multimodal Analysis** | Supports both image and audio files for thorough evidence inspection |
| 📸 **Object Detection** | Detects objects like guns, knives, and more using YOLOv5 |
| 🎧 **Audio Classification** | Analyzes audio clips (WAV/MP3) to detect suspicious events |
| 📑 **Auto PDF Reporting** | Generates downloadable forensic reports after analysis |
| 📚 **Research Papers** | Includes 10 academic papers on object detection & forensic AI |
| 🗂 **File Management** | Organizes uploaded, processed, and report files for easy review |

---

## 🛠️ Tech Stack

- **Frontend**: React + Tailwind CSS (Vite)
- **Backend**: Python Flask (REST API)
- **AI Models**: YOLOv5 (`yolov5s.pt`, `best.pt`), Audio Classifier (custom)
- **Database & Storage**: Supabase (cloud media storage, optional auth)
- **Utilities**: PyPDF2 (PDF report generation), Torch, Librosa (audio features)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-forensic-analyzer.git
cd ai-forensic-analyzer
```

---

### 2. Backend Setup (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

📍 Runs at: `http://localhost:5000`

---

### 3. Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm start
```

📍 Runs at: `http://localhost:3000`

---

## 🧬 Project Structure

```bash
📁 ai-forensic-analyzer
├── backend/                  # Flask backend with AI logic
│   ├── app.py                # REST API server
│   ├── audio_analysis.py     # Audio classification script
│   ├── yolov5s.pt, best.pt   # YOLOv5 trained models
│   └── utils/                # Supabase setup & helpers
├── frontend/                 # React frontend (Vite + Tailwind)
│   ├── src/pages/            # Pages: Home, Dashboard, Contact
│   ├── src/components/       # Reusable components (Navbar, Cards)
│   └── public/research_papers/ # Academic resources
├── uploads/                  # Uploaded raw media
├── results/                  # YOLO-detected image results
├── reports/                  # Auto-generated forensic reports (PDF)
├── requirements.txt
├── LICENSE
└── README.md
```

---

## 🧠 How It Works

1. **Upload an Image or Audio File**
   - User uploads multimedia evidence via the dashboard

2. **AI Analysis Begins**
   - Image: YOLOv5 model detects suspicious objects
   - Audio: Classifier extracts MFCC features and classifies for threats

3. **Generate Forensic Report**
   - Results are stored and compiled into a downloadable PDF report

4. **Academic Research Ready**
   - Explore embedded research papers to understand AI in forensics

---

## 📄 License

This project is licensed under the **MIT License**.  
Feel free to modify and use it in your own forensic or academic projects.

---

> 🔐 *Designed for digital forensics. Built for the future of AI investigation.*






