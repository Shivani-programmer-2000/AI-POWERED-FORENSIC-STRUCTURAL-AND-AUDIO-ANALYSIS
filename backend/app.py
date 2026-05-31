import torch
import cv2
import numpy as np
import os
import whisper
import librosa
import soundfile as sf
import warnings
warnings.simplefilter("ignore", category=FutureWarning)
from pydub import AudioSegment
from flask import Flask, request, jsonify, send_file, send_from_directory, abort
from flask_cors import CORS
from PIL import Image
from datetime import datetime
from fpdf import FPDF  # Ensure this is at the top
from supabase import create_client

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
# Get these values from your Supabase project settings
url = 'https://wgluvzqkfetwuoafbxcp.supabase.co'
key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnbHV2enFrZmV0d3VvYWZieGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMzE1NzMsImV4cCI6MjA1NzgwNzU3M30.vdDEFrVZCrmTfjLMWsK1qKcCfptWcT_tcvx2_5bbyHo'
supabase = create_client(url, key)

# Ensure 'static' folder exists for saving images and uploads
# Ensure required directories exist
STATIC_DIR = "static/uploads"
REPORTS_DIR = "reports"
os.makedirs(STATIC_DIR, exist_ok=True)
os.makedirs(REPORTS_DIR, exist_ok=True)

# Simulated database for forensic reports
analysis_history = []

# Load YOLOv5 Model for image detection
model = torch.hub.load("ultralytics/yolov5", "custom", path="best.pt")
model.conf = 0.25  # Confidence threshold

@app.route("/")
def home():
    return "Welcome to the AI Forensic Analysis API! Use /detect for images and /analyze-audio for audio."

@app.route("/detect", methods=["POST"])
def detect():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    img = Image.open(file.stream).convert("RGB")

    print("Image received, running YOLOv5 detection...")

    # Run YOLOv5 detection
    results = model(img)
    detections = results.pandas().xyxy[0]

    # Convert PIL image to OpenCV format
    img_cv = np.array(img)
    img_cv = cv2.cvtColor(img_cv, cv2.COLOR_RGB2BGR)

    detection_list = []

    # Draw bounding boxes
    for _, row in detections.iterrows():
        x1, y1, x2, y2, conf, class_id, name = (
            int(row["xmin"]),
            int(row["ymin"]),
            int(row["xmax"]),
            int(row["ymax"]),
            row["confidence"],
            int(row["class"]),
            row["name"],
        )

        label = f"{name} ({conf:.2f})"

        # Draw rectangle
        cv2.rectangle(img_cv, (x1, y1), (x2, y2), (0, 255, 0), 2)

        # Put label text above bounding box
        cv2.putText(
            img_cv,
            label,
            (x1, y1 - 10),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (0, 255, 0),
            2,
        )

        detection_list.append({
            "x": x1,
            "y": y1,
            "width": x2 - x1,
            "height": y2 - y1,
            "class": name,
            "confidence": conf
        })

    processed_image_path = "static/detected_image.jpg"
    cv2.imwrite(processed_image_path, img_cv)
    print(f"Image saved at: {processed_image_path}, Exists: {os.path.exists(processed_image_path)}")

    case_id = len(analysis_history) + 1
    analysis_history.append({"case_id": case_id, "timestamp": datetime.utcnow().isoformat(), "type": "image", "detections": detection_list, "image_url": "/get_image"})

    # 📌 Generate Image Report
    generate_image_report(case_id, detection_list)

    return jsonify({"detections": detection_list, "image_url": "/get_image", "case_id": case_id})

@app.route("/get_image", methods=["GET"])
def get_image():
    processed_image_path = "static/detected_image.jpg"
    if os.path.exists(processed_image_path):
        return send_file(processed_image_path, mimetype="image/jpeg")
    else:
        return jsonify({"error": "No processed image available"}), 404


def convert_to_wav(mp3_path):
    wav_path = mp3_path.replace(".mp3", ".wav")
    audio = AudioSegment.from_mp3(mp3_path)
    audio = audio.set_channels(1).set_frame_rate(16000)
    audio.export(wav_path, format="wav")
    return wav_path


def remove_noise(audio_path):
    y, sr = librosa.load(audio_path, sr=16000)
    y_denoised = librosa.effects.preemphasis(y)
    output_path = audio_path.replace(".wav", "_cleaned.wav")
    sf.write(output_path, y_denoised, sr)
    return output_path


def speech_to_text(audio_path, language=None):
    model = whisper.load_model("medium")

    result = model.transcribe(audio_path, task="transcribe")
    detected_language = result["language"]

    print(f"Detected Language: {detected_language}")

    final_result = model.transcribe(audio_path, language=detected_language)

    return final_result["text"].strip(), detected_language


@app.route("/analyze-audio", methods=["POST"])
def analyze_audio():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = os.path.join(STATIC_DIR, file.filename)
    file.save(file_path)

    if file.filename.endswith(".mp3"):
        file_path = convert_to_wav(file_path)

    clean_audio = remove_noise(file_path)
    transcription, detected_lang = speech_to_text(clean_audio)

    case_id = len(analysis_history) + 1
    analysis_history.append({
        "case_id": case_id,
        "timestamp": datetime.utcnow().isoformat(),
        "type": "audio",
        "transcription": transcription,
        "detected_language": detected_lang
    })

    # 📌 Generate Audio Report
    generate_audio_report(case_id, transcription, detected_lang)

    return jsonify({"message": "Processing complete", "status": "success", "transcription": transcription, "detected_language": detected_lang, "case_id": case_id}), 200

@app.route("/get-analysis-history", methods=["GET"])
def get_analysis_history():
    return jsonify(analysis_history)

def check_report_file(case_id):
    file_path = os.path.join(REPORTS_DIR, f"report_{case_id}.pdf")
    print(f"Looking for report: {file_path}, Exists: {os.path.exists(file_path)}")
    return file_path

@app.route("/download-report/<case_id>")
def download_report(case_id):
    file_path = check_report_file(case_id)
    return send_from_directory(REPORTS_DIR, f"report_{case_id}.pdf", as_attachment=True) if os.path.exists(file_path) else abort(404, description="File Not Found")

@app.route("/download-image-report/<case_id>")
def download_image_report(case_id):
    return download_report(case_id)

@app.route("/download-audio-report/<case_id>")
def download_audio_report(case_id):
    return download_report(case_id)

# 📌 Place the report generation functions here
def generate_image_report(case_id, detections):
    """Generates a forensic report for image detection"""
    report_path = os.path.join(REPORTS_DIR, f"report_{case_id}.pdf")
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    # Report title
    pdf.cell(200, 10, f"Forensic Image Analysis Report - Case {case_id}", ln=True, align='C')
    pdf.ln(10)

    # Detections details
    for det in detections:
        pdf.cell(200, 10, f"Detected: {det['class']} (Confidence: {det['confidence']:.2f})", ln=True)
    
    # Add the detected image to the report
    detected_image_path = "static/detected_image.jpg"  # Path to the processed image
    if os.path.exists(detected_image_path):
        pdf.ln(10)  # Add some space before the image
        pdf.image(detected_image_path, x=10, y=pdf.get_y(), w=180)  # Add the image to the PDF

    pdf.output(report_path)
    print(f"Image Report generated: {report_path}")


def generate_audio_report(case_id, transcription, detected_lang):
    """Generates a forensic report for audio analysis"""
    report_path = os.path.join(REPORTS_DIR, f"report_{case_id}.pdf")
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    pdf.cell(200, 10, f"Audio Analysis Report - Case {case_id}", ln=True, align='C')
    pdf.ln(10)
    pdf.cell(200, 10, f"Detected Language: {detected_lang}", ln=True)
    pdf.ln(10)
    pdf.multi_cell(200, 10, f"Transcription: {transcription}")

    pdf.output(report_path)
    print(f"Audio Report generated: {report_path}")

def insert_analysis_result(file_name, analysis_result, timestamp):
    data = {
        "file_name": file_name,
        "analysis_result": analysis_result,
        "timestamp": timestamp
    }
    response = supabase.table("analysis_history").insert(data).execute()
    if response.status_code == 201:
        print("Analysis result inserted successfully!")
    else:
        print("Error inserting data:", response.json())
def get_analysis_history():
    response = supabase.table("analysis_history").select("*").execute()
    if response.status_code == 200:
        return response.data
    else:
        print("Error retrieving data:", response.json())
        return []

@app.route("/add_analysis", methods=["POST"])
def add_analysis():
    # Example data: file_name, analysis_result, timestamp
    file_name = "example_image.jpg"
    analysis_result = "forensic_pass"
    timestamp = "2025-03-21 12:30:00"
    
    insert_analysis_result(file_name, analysis_result, timestamp)
    return jsonify({"message": "Analysis added successfully!"}), 201

@app.route("/get_analysis", methods=["GET"])
def get_analysis():
    analysis_history = get_analysis_history()
    return jsonify(analysis_history), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)





