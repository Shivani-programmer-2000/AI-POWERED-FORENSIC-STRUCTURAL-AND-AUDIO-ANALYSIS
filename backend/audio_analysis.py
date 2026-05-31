import librosa
import numpy as np
from scipy.fft import fft

# Function to extract MFCC features
def extract_audio_features(audio_path):
    y, sr = librosa.load(audio_path, sr=None)  # Load the audio file
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)  # Extract MFCCs
    mfcc = np.mean(mfcc, axis=1)  # Average over time frames
    return mfcc

# Function to extract Spectral features (Example: Spectral centroid)
def extract_spectral_features(audio_path):
    y, sr = librosa.load(audio_path, sr=None)
    spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sr)
    spectral_centroid = np.mean(spectral_centroid)
    return spectral_centroid

# Function to check for audio anomalies (simple thresholding approach)
def check_for_tampering(mfcc_features, spectral_centroid):
    # Simple anomaly detection: thresholding approach
    print(f"MFCC Features: {np.mean(mfcc_features)}")
    print(f"Spectral Centroid: {spectral_centroid}")
    
    if np.mean(mfcc_features) < 50 or spectral_centroid < 1000:
        return "Tampered"
    else:
        return "Authentic"

# Main function to analyze the uploaded audio
def analyze_audio(file_path):
    mfcc_features = extract_audio_features(file_path)
    spectral_centroid = extract_spectral_features(file_path)
    result = check_for_tampering(mfcc_features, spectral_centroid)
    return result
