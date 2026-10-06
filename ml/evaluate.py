from pathlib import Path
import json
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, Subset
from torchvision import datasets, transforms, models
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_recall_fscore_support, confusion_matrix

BASE_DIR = Path(__file__).resolve().parent
DATASET_DIR = BASE_DIR / "dataset"
MODEL_PATH = BASE_DIR / "models" / "plant_disease_model.pth"
REPORTS_DIR = BASE_DIR / "reports"
REPORTS_DIR.mkdir(parents=True, exist_ok=True)

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def evaluate():
    print("=" * 65)
    print("KrishiDrishti ML Evaluation & Validation Metrics")
    print("=" * 65)
    print("Device:", DEVICE)
    print("Loading model checkpoint from:", MODEL_PATH)

    if not MODEL_PATH.exists():
        print("Error: Model file not found at", MODEL_PATH)
        return

    checkpoint = torch.load(MODEL_PATH, map_location=DEVICE)
    classes = checkpoint["classes"]
    image_size = checkpoint.get("image_size", 224)
    model_name = checkpoint.get("model_name", "MobileNetV3-Small")

    print(f"Model Architecture: {model_name}")
    print(f"Image Size: {image_size}x{image_size}")
    print(f"Number of Classes: {len(classes)}")

    # Define model
    model = models.mobilenet_v3_small(weights=None)
    model.classifier[3] = nn.Linear(model.classifier[3].in_features, len(classes))
    model.load_state_dict(checkpoint["model_state_dict"])
    model = model.to(DEVICE)
    model.eval()

    # Load dataset with validation transforms
    val_transform = transforms.Compose([
        transforms.Resize((image_size, image_size)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])

    base_dataset = datasets.ImageFolder(DATASET_DIR)
    targets = base_dataset.targets

    indices = list(range(len(base_dataset)))
    _, val_indices = train_test_split(
        indices,
        test_size=0.20,
        random_state=42,
        stratify=targets
    )

    val_dataset_full = datasets.ImageFolder(DATASET_DIR, transform=val_transform)
    val_dataset = Subset(val_dataset_full, val_indices)

    val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False, num_workers=0)

    all_preds = []
    all_targets = []

    print(f"\nEvaluating on {len(val_indices)} validation images...")
    with torch.no_grad():
        for images, labels in val_loader:
            images = images.to(DEVICE)
            outputs = model(images)
            preds = torch.argmax(outputs, dim=1).cpu().tolist()
            all_preds.extend(preds)
            all_targets.extend(labels.tolist())

    acc = accuracy_score(all_targets, all_preds)
    precision_macro, recall_macro, f1_macro, _ = precision_recall_fscore_support(all_targets, all_preds, average='macro')
    precision_weighted, recall_weighted, f1_weighted, _ = precision_recall_fscore_support(all_targets, all_preds, average='weighted')
    
    precision_per_class, recall_per_class, f1_per_class, support_per_class = precision_recall_fscore_support(
        all_targets, all_preds, average=None, labels=list(range(len(classes)))
    )
    
    cm = confusion_matrix(all_targets, all_preds, labels=list(range(len(classes))))

    per_class_metrics = {}
    for i, class_name in enumerate(classes):
        per_class_metrics[class_name] = {
            "precision": round(float(precision_per_class[i]), 4),
            "recall": round(float(recall_per_class[i]), 4),
            "f1_score": round(float(f1_per_class[i]), 4),
            "sample_count": int(support_per_class[i])
        }

    report = {
        "model_name": model_name,
        "image_size": image_size,
        "total_validation_samples": len(val_indices),
        "overall_accuracy": round(float(acc) * 100, 2),
        "macro_precision": round(float(precision_macro), 4),
        "macro_recall": round(float(recall_macro), 4),
        "macro_f1_score": round(float(f1_macro), 4),
        "weighted_f1_score": round(float(f1_weighted), 4),
        "per_class_metrics": per_class_metrics,
        "confusion_matrix": cm.tolist(),
        "classes": classes
    }

    report_path = REPORTS_DIR / "evaluation_metrics.json"
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=4)

    print("\n" + "=" * 65)
    print("EVALUATION RESULTS SUMMARY")
    print("=" * 65)
    print(f"Validation Accuracy: {report['overall_accuracy']}%")
    print(f"Macro F1-Score     : {report['macro_f1_score']}")
    print(f"Weighted F1-Score  : {report['weighted_f1_score']}")
    print("\nPer-Class Breakdown:")
    for cls_name, metrics in per_class_metrics.items():
        print(f" - {cls_name:30s} | Precision: {metrics['precision']:.3f} | Recall: {metrics['recall']:.3f} | F1: {metrics['f1_score']:.3f} (N={metrics['sample_count']})")

    print("\nFull evaluation report saved to:", report_path)

if __name__ == "__main__":
    evaluate()
