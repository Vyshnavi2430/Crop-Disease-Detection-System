# Testing Report — KrishiDrishti AI 3.0

## 1. Executive Summary
This document summarizes automated and manual test suites conducted across the ML pipeline, backend API routes, frontend components, database integration, safety filters, and accessibility compliance for **KrishiDrishti AI 3.0**.

---

## 2. Test Suite Categories

### A. ML Model Validation & Evaluation Tests
- **Dataset Evaluated**: 2,251 validation images (20% stratified split of 11,254 PlantVillage images across 9 classes).
- **Execution Script**: [`ml/evaluate.py`](./ml/evaluate.py)
- **Result**:
  - Validation Accuracy: **96.58%**
  - Macro F1-Score: **0.9604**
  - Weighted F1-Score: **0.9657**
  - Report: [`ml/reports/evaluation_metrics.json`](./ml/reports/evaluation_metrics.json)

### B. PyTorch Model Quantization & Latency Tests
- **Execution Script**: [`ml/benchmark.py`](./ml/benchmark.py)
- **Sample Size**: 500 CPU test iterations.
- **Result**:
  - FP32 Model Size: `5.95 MB` | Average CPU Latency: `9.33 ms` | Accuracy: `96.0%`
  - INT8 Model Size: `4.24 MB` | Average CPU Latency: `9.75 ms` | Accuracy: `96.0%`
  - **Storage Reduction**: `28.74% smaller` with 0% accuracy degradation.
  - Report: [`ml/reports/optimization_benchmark.json`](./ml/reports/optimization_benchmark.json)

### C. Safety, Quality & Out-of-Domain Rejection Tests
- **Test File**: [`ml/predict.py`](./ml/predict.py)
- **Scenarios Tested**:
  1. *Clear Leaf Image (Tomato Early Blight)*: PASSED — High confidence (89.17%), Grad-CAM generated.
  2. *Monochrome/Blank Image*: PASSED — Rejected by quality check (`qualityCheckPassed: false`), low-confidence warning issued.
  3. *Dark/Underexposed Image*: PASSED — Flagged as low quality due to low mean luminance (< 12).
  4. *Low Confidence Prediction (< 60%)*: PASSED — UI displays prominent amber safety banner requesting photo recapture.

### D. End-to-End Multimodal Integration Tests
- **Verified Flow**: Python spawn → PyTorch inference → Grad-CAM heatmap composite creation → Weather fusion engine (`environmentalRiskService.js`) → JSON report build.
- **Result**: PASSED — 0 exit errors, heatmap image generated at `backend/uploads/heatmaps/`, weather risk score calculated (65/100 Moderate).

### E. Frontend Build & Static Analysis
- **Command**: `npm --prefix client run build` (`tsc && vite build`)
- **Result**: PASSED — 0 TypeScript compilation errors, 0 Vite bundler errors.

---

## 3. Test Matrix

| Component | Test Case | Expected Result | Status |
| :--- | :--- | :--- | :---: |
| **ML Classifier** | 9-class leaf prediction | Predicts label with probability score | **PASSED** |
| **Grad-CAM** | Convolutional activation map | Side-by-side composite heatmap image generated | **PASSED** |
| **Safety Filter** | Blank/blurry image | `isLowConfidence: true`, safety warning displayed | **PASSED** |
| **Weather Fusion** | Weather context + disease prediction | Environmental risk level & risk drivers computed | **PASSED** |
| **API Endpoints** | REST endpoints (`/api/ai`, `/api/scan`) | Returns structured JSON with HTTP 200/201 | **PASSED** |
| **MongoDB Storage** | Persist scan report | Document created with `userId`, `heatmapUrl`, `environmentalRisk` | **PASSED** |
| **Multilingual i18n** | Switch language to Telugu/Hindi/Tamil | All UI elements update dynamically | **PASSED** |
| **Accessibility** | Large text, High contrast, Dark mode | UI layout adapts seamlessly | **PASSED** |
