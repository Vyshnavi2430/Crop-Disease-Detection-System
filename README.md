# KrishiDrishti AI 3.0 — Multilingual Voice-Enabled Smart Farming Assistant

[![Python](https://img.shields.io/badge/PyTorch-2.13.0-orange.svg)](https://pytorch.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.19.2-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)

**KrishiDrishti AI 3.0** is a lightweight, explainable, multimodal, multilingual, and environment-aware agricultural decision-support platform designed for Indian smallholder and commercial farmers.

---

## Key Features

1. **AI Crop Leaf Scanner**: Instant disease detection for Tomato, Potato, and Bell Pepper powered by PyTorch MobileNetV3-Small (96.58% validation accuracy).
2. **Grad-CAM Explainable AI**: Visual heatmap exhibits (`[Original Image | Grad-CAM Heatmap]`) highlighting exact leaf lesions driving the neural network diagnosis.
3. **Confidence Safety Thresholding**: Automatically flags predictions under 60% confidence as `Low Confidence`, asking the farmer for a photo recapture to prevent improper pesticide usage.
4. **Multimodal Environmental Disease Risk Fusion**: Combines live weather parameters (temperature, humidity, precipitation forecast) with crop pathology to calculate environmental risk scores and weather advisories.
5. **6-Language Multilingual Support**: Dynamic i18n localization across English (`en`), Telugu (`te`), Hindi (`hi`), Tamil (`ta`), Kannada (`kn`), and Malayalam (`ml`).
6. **Voice Assistant & Read Aloud**: Speech Recognition voice commands and SpeechSynthesis (TTS) read-page capabilities.
7. **Live Weather Center**: Integrated Open-Meteo weather forecasts, hourly/weekly forecasts, UV index, and spraying advisories.
8. **Mandi Market Prices**: Real-time arrival rates, daily price trends, state/district filters, and commodity tracking.
9. **Government Support Schemes**: Catalog of central & state agricultural welfare programs (PM-KISAN, PMFBY, KCC).
10. **Nearby Agricultural Shops**: Geolocation locator for certified fertilizer, seed, and pesticide stores.
11. **Persistent Scan History**: MongoDB storage for saved crop pathology reports.
12. **Farmer Accessibility**: Farmer Mode, Large Text Mode, High Contrast Mode, and Dark Theme.

---

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + i18next + Lucide Icons
- **Backend**: Node.js + Express.js + Mongoose + JWT Auth + Multer
- **Database**: MongoDB Atlas
- **Machine Learning**: Python + PyTorch + torchvision + scikit-learn + NumPy + PIL
- **Weather API**: Open-Meteo Forecast & Geocoding API
- **AI Vision Model**: MobileNetV3-Small (5.95 MB FP32 / 4.24 MB INT8 Quantized)

---

## Project Architecture

```text
FARMER / USER
     │
     ├── 📷 Leaf Photo Upload / Camera Snapshot
     ├── 🎤 Native Voice Commands / TTS Speech
     └── 📍 GPS Geolocation
     │
     ▼
REACT FRONTEND (Vite + TypeScript + i18n)
     │
     ▼ REST API
NODE.JS / EXPRESS BACKEND SERVER (Port 5000)
     │
     ├── Python Subprocess Spawn (predict.py)
     │        │
     │        ▼
     │   PyTorch MobileNetV3-Small CNN Classifier
     │        │
     │        ├─► Prediction & Confidence Scoring
     │        └─► PyTorch Grad-CAM Heatmap Generator (gradcam.py)
     │
     ├── Multimodal Environmental Risk Engine (environmentalRiskService.js)
     │        │
     │        └─► Open-Meteo Weather API Integration
     │
     └── Persistence Layer (MongoDB Atlas)
              │
              └─► Users & ScanReport Schemas
```

---

## Installation & Setup Guide

### 1. Prerequisites
- Node.js (v18+)
- Python (v3.10+)

### 2. Environment Setup

Create `.env` file in `backend/`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/krishidrishti
JWT_SECRET=your_secret_key
```

### 3. Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 4. Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 5. Python ML Environment
```bash
cd ml
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

---

## Model Evaluation & Quantization Commands

### Run Standalone Validation Evaluation
```bash
.\ml\.venv\Scripts\python.exe ml\evaluate.py
```

### Run PyTorch INT8 Quantization Benchmark
```bash
.\ml\.venv\Scripts\python.exe ml\benchmark.py
```

---

## Documentation Links
- [`MODEL_CARD.md`](./MODEL_CARD.md) — Model card, training metrics, architecture specifications, and safety rules.
- [`TESTING_REPORT.md`](./TESTING_REPORT.md) — Automated test suite report and evaluation benchmarks.
- [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) — Production deployment guidelines for cloud and edge environments.
- [`PROJECT_UNDERSTANDING_REPORT.md`](./PROJECT_UNDERSTANDING_REPORT.md) — Complete technical specification and architectural breakdown.
