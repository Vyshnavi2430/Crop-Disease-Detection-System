# Model Card — MobileNetV3-Small Crop Disease Classifier

## Model Details
- **Model Name**: KrishiDrishti PyTorch Crop Disease Classifier
- **Model Architecture**: MobileNetV3-Small (Transfer Learning with custom linear classification head)
- **Model Version**: 2.0.0
- **Framework**: PyTorch 2.13.0+cpu / torchvision
- **Input Resolution**: 224x224 RGB image
- **Output Classes**: 9 agricultural crop disease/healthy classes
- **Model File Size**: 6.2 MB (FP32) | 5.9 MB (INT8 Quantized)

---

## Intended Use
- **Primary Use Case**: Multilingual smart farming assistant providing instant, explainable leaf disease detection and environmental risk assessment for smallholder and commercial Indian farmers.
- **Intended Users**: Farmers, agricultural extension officers, agronomists, and agricultural students.
- **Supported Crops**: Tomato, Potato, Bell Pepper.

---

## Out-of-Scope & Non-Intended Use
- **Non-Supported Crops**: Rice, Wheat, Cotton, Maize, Sugarcane, or non-leaf plant parts (stems, roots, tubers) without explicit domain expansion.
- **Medical/Chemical Dosing Liability**: The model does NOT prescribe chemical dosage or override legally registered product label guidelines. Recommendations refer farmers to local agricultural authority guidance.
- **Sole Source of Diagnosis**: Predictions under 60% confidence are flagged as `Low Confidence`, advising physical inspection by a local agronomist.

---

## Training Dataset & Data Preprocessing
- **Base Dataset Source**: Curated PlantVillage dataset subset.
- **Total Training Images**: 11,254 images across 9 classes.
- **Validation Dataset**: 2,251 images (20% stratified train/validation split).
- **Data Augmentation**: Random horizontal flips, random rotations ($\pm 10^\circ$), color jitter (brightness, contrast, saturation $\pm 0.2$), ImageNet normalization ($\mu = [0.485, 0.456, 0.406], \sigma = [0.229, 0.224, 0.225]$).
- **Class Balancing**: Inverse-frequency weighted CrossEntropyLoss.

### Supported Classes
1. `Pepper,_bell___Bacterial_spot`
2. `Pepper,_bell___healthy`
3. `Potato___Early_blight`
4. `Potato___Late_blight`
5. `Potato___healthy`
6. `Tomato___Bacterial_spot`
7. `Tomato___Early_blight`
8. `Tomato___Late_blight`
9. `Tomato___healthy`

---

## Evaluation Metrics (Validation Dataset N=2,251)

| Metric | Score |
| :--- | :--- |
| **Validation Accuracy** | **96.58%** |
| **Macro F1-Score** | **0.9604** |
| **Weighted F1-Score** | **0.9657** |
| **Macro Precision** | **0.9590** |
| **Macro Recall** | **0.9660** |

### Per-Class Breakdown

| Class | Precision | Recall | F1-Score | Support |
| :--- | :---: | :---: | :---: | :---: |
| Pepper Bell — Bacterial Spot | 0.904 | 1.000 | 0.950 | 199 |
| Pepper Bell — Healthy | 1.000 | 0.943 | 0.970 | 296 |
| Potato — Early Blight | 0.985 | 0.985 | 0.985 | 200 |
| Potato — Late Blight | 0.941 | 0.955 | 0.948 | 200 |
| Potato — Healthy | 0.909 | 1.000 | 0.952 | 30 |
| Tomato — Bacterial Spot | 0.988 | 0.998 | 0.993 | 426 |
| Tomato — Early Blight | 0.940 | 0.865 | 0.901 | 200 |
| Tomato — Late Blight | 0.946 | 0.953 | 0.949 | 382 |
| Tomato — Healthy | 0.997 | 0.994 | 0.995 | 318 |

---

## Explainability & Safety Layers
1. **Grad-CAM (Gradient-Weighted Class Activation Mapping)**: Targets layer `model.features[-1]` to generate visual heatmap overlays highlighting the exact leaf spots driving the model prediction.
2. **Confidence Safety Thresholding**:
   - `High` ($\ge 80\%$): Reliable prediction.
   - `Medium` ($60-79\%$): Moderate confidence.
   - `Low` ($< 60\%$): Triggers safety warning alert asking for photo re-capture.
3. **Input Quality Safeguards**: Laplacian texture variance, brightness/contrast bounds, and monochromatic image filters reject blank or out-of-domain images.
4. **Multimodal Environmental Fusion**: Rule-based fusion engine combines local weather metrics (temperature, humidity, precipitation probability) with CNN diagnostics to assess environmental risk.

---

## Limitations & Field Generalization Note
> **Validation vs. Real-World Field Performance**:
> The 96.58% accuracy metric reflects performance on the PlantVillage validation set under controlled lighting and background conditions. Field images captured under direct sunlight, shadows, or complex soil backgrounds may experience lower confidence, which is explicitly handled by our Grad-CAM explainability and low-confidence safety layers.
