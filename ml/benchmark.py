from pathlib import Path
import time
import json
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, Subset
from torchvision import datasets, transforms, models
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

BASE_DIR = Path(__file__).resolve().parent
DATASET_DIR = BASE_DIR / "dataset"
MODEL_PATH = BASE_DIR / "models" / "plant_disease_model.pth"
REPORTS_DIR = BASE_DIR / "reports"
REPORTS_DIR.mkdir(parents=True, exist_ok=True)

DEVICE = torch.device("cpu")

def run_benchmark():
    print("=" * 65)
    print("KrishiDrishti PyTorch Model Optimization & INT8 Quantization Benchmark")
    print("=" * 65)

    if not MODEL_PATH.exists():
        print("Error: Model file not found at", MODEL_PATH)
        return

    checkpoint = torch.load(MODEL_PATH, map_location=DEVICE)
    classes = checkpoint["classes"]
    image_size = checkpoint.get("image_size", 224)

    # 1. FP32 Baseline Model
    model_fp32 = models.mobilenet_v3_small(weights=None)
    model_fp32.classifier[3] = nn.Linear(model_fp32.classifier[3].in_features, len(classes))
    model_fp32.load_state_dict(checkpoint["model_state_dict"])
    model_fp32.eval()

    # Save temporary INT8 model to measure size
    model_int8 = torch.quantization.quantize_dynamic(
        model_fp32, {nn.Linear}, dtype=torch.qint8
    )
    model_int8.eval()

    fp32_file = REPORTS_DIR / "temp_fp32.pth"
    int8_file = REPORTS_DIR / "temp_int8.pth"

    torch.save(model_fp32.state_dict(), fp32_file)
    torch.save(model_int8.state_dict(), int8_file)

    fp32_size_mb = round(fp32_file.stat().st_size / (1024 * 1024), 2)
    int8_size_mb = round(int8_file.stat().st_size / (1024 * 1024), 2)

    # Cleanup temp files
    fp32_file.unlink(missing_ok=True)
    int8_file.unlink(missing_ok=True)

    # 2. Validation dataset setup (subsampling 500 images for fast benchmarking)
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
        indices, test_size=0.20, random_state=42, stratify=targets
    )

    # Benchmark on 500 sample images
    benchmark_indices = val_indices[:500]
    val_dataset = Subset(datasets.ImageFolder(DATASET_DIR, transform=val_transform), benchmark_indices)
    val_loader = DataLoader(val_dataset, batch_size=1, shuffle=False, num_workers=0)

    # 3. Latency & Accuracy Benchmark FP32
    fp32_preds = []
    targets_list = []
    fp32_latencies = []

    print("\nBenchmarking FP32 Model on 500 CPU images...")
    with torch.no_grad():
        for img, label in val_loader:
            t0 = time.perf_counter()
            out = model_fp32(img)
            t1 = time.perf_counter()
            
            fp32_latencies.append((t1 - t0) * 1000.0) # ms
            pred = torch.argmax(out, dim=1).item()
            fp32_preds.append(pred)
            targets_list.append(label.item())

    fp32_acc = round(accuracy_score(targets_list, fp32_preds) * 100, 2)
    _, _, fp32_f1, _ = precision_recall_fscore_support(targets_list, fp32_preds, average='macro')
    fp32_avg_latency = round(sum(fp32_latencies) / len(fp32_latencies), 2)

    # 4. Latency & Accuracy Benchmark INT8
    int8_preds = []
    int8_latencies = []

    print("Benchmarking Dynamic INT8 Model on 500 CPU images...")
    with torch.no_grad():
        for img, label in val_loader:
            t0 = time.perf_counter()
            out = model_int8(img)
            t1 = time.perf_counter()
            
            int8_latencies.append((t1 - t0) * 1000.0) # ms
            pred = torch.argmax(out, dim=1).item()
            int8_preds.append(pred)

    int8_acc = round(accuracy_score(targets_list, int8_preds) * 100, 2)
    _, _, int8_f1, _ = precision_recall_fscore_support(targets_list, int8_preds, average='macro')
    int8_avg_latency = round(sum(int8_latencies) / len(int8_latencies), 2)

    size_reduction_pct = round((1 - int8_size_mb / fp32_size_mb) * 100, 2)
    latency_change_pct = round(((int8_avg_latency - fp32_avg_latency) / fp32_avg_latency) * 100, 2)

    results = {
        "architecture": "MobileNetV3-Small",
        "benchmark_samples": len(benchmark_indices),
        "fp32_baseline": {
            "model_size_mb": fp32_size_mb,
            "avg_cpu_latency_ms": fp32_avg_latency,
            "validation_accuracy": fp32_acc,
            "macro_f1_score": round(float(fp32_f1), 4)
        },
        "int8_quantized": {
            "model_size_mb": int8_size_mb,
            "avg_cpu_latency_ms": int8_avg_latency,
            "validation_accuracy": int8_acc,
            "macro_f1_score": round(float(int8_f1), 4)
        },
        "comparison": {
            "size_reduction_percent": f"{size_reduction_pct}%",
            "latency_change_percent": f"{latency_change_pct}%",
            "accuracy_difference_percent": f"{round(int8_acc - fp32_acc, 2)}%"
        }
    }

    output_file = REPORTS_DIR / "optimization_benchmark.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=4)

    print("\n" + "=" * 65)
    print("BENCHMARK RESULTS SUMMARY")
    print("=" * 65)
    print(f"FP32 Baseline : Size = {fp32_size_mb} MB | Latency = {fp32_avg_latency} ms | Accuracy = {fp32_acc}% | F1 = {fp32_f1:.4f}")
    print(f"INT8 Quantized: Size = {int8_size_mb} MB | Latency = {int8_avg_latency} ms | Accuracy = {int8_acc}% | F1 = {int8_f1:.4f}")
    print(f"\nSize Reduction: {size_reduction_pct}% smaller")
    print("Benchmark saved to:", output_file)

if __name__ == "__main__":
    run_benchmark()
