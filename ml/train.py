from pathlib import Path
import json

import torch
from torch import nn
from torch.utils.data import DataLoader, Subset
from torchvision import datasets, transforms, models
from sklearn.model_selection import train_test_split


# ============================================================
# CONFIGURATION
# ============================================================

BASE_DIR = Path(__file__).resolve().parent
DATASET_DIR = BASE_DIR / "dataset"
MODEL_DIR = BASE_DIR / "models"

IMAGE_SIZE = 224
BATCH_SIZE = 16

# Start with 5 epochs.
# We can increase this later if the results need improvement.
EPOCHS = 5

LEARNING_RATE = 0.0005
NUM_WORKERS = 0

DEVICE = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)

print("=" * 65)
print("KrishiDrishti - Plant Disease CNN Training")
print("=" * 65)

print("Device:", DEVICE)
print("Dataset:", DATASET_DIR)


# ============================================================
# TRANSFORMS
# ============================================================

train_transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),

    transforms.RandomHorizontalFlip(),

    transforms.RandomRotation(10),

    transforms.ColorJitter(
        brightness=0.2,
        contrast=0.2,
        saturation=0.2
    ),

    transforms.ToTensor(),

    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


val_transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),

    transforms.ToTensor(),

    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


# ============================================================
# LOAD DATASET
# ============================================================

base_dataset = datasets.ImageFolder(DATASET_DIR)

classes = base_dataset.classes
targets = base_dataset.targets

num_classes = len(classes)

print("\nClasses:")

for i, class_name in enumerate(classes):
    print(f"{i}: {class_name}")

print("\nTotal images:", len(base_dataset))
print("Number of classes:", num_classes)


# ============================================================
# TRAIN / VALIDATION SPLIT
# ============================================================

indices = list(range(len(base_dataset)))

train_indices, val_indices = train_test_split(
    indices,
    test_size=0.20,
    random_state=42,
    stratify=targets
)

print("\nTraining images:", len(train_indices))
print("Validation images:", len(val_indices))


# ============================================================
# CREATE TRAIN AND VALIDATION DATASETS
# ============================================================

train_full = datasets.ImageFolder(
    DATASET_DIR,
    transform=train_transform
)

val_full = datasets.ImageFolder(
    DATASET_DIR,
    transform=val_transform
)

train_dataset = Subset(
    train_full,
    train_indices
)

val_dataset = Subset(
    val_full,
    val_indices
)


# ============================================================
# DATA LOADERS
# ============================================================

train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,
    shuffle=True,
    num_workers=NUM_WORKERS
)

val_loader = DataLoader(
    val_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=NUM_WORKERS
)


# ============================================================
# CALCULATE CLASS WEIGHTS
# ============================================================

class_counts = torch.bincount(
    torch.tensor(targets),
    minlength=num_classes
).float()

# Inverse-frequency weighting
class_weights = 1.0 / class_counts

# Normalize weights so average weight is approximately 1
class_weights = class_weights / class_weights.mean()

class_weights = class_weights.to(DEVICE)

print("\nClass weights:")

for i, class_name in enumerate(classes):
    print(
        f"{class_name}: "
        f"{class_weights[i].item():.3f}"
    )


# ============================================================
# LOAD PRETRAINED MOBILENETV3-SMALL
# ============================================================

print("\nLoading MobileNetV3-Small...")

weights = models.MobileNet_V3_Small_Weights.DEFAULT

model = models.mobilenet_v3_small(
    weights=weights
)


# ============================================================
# REPLACE CLASSIFIER
# ============================================================

model.classifier[3] = nn.Linear(
    model.classifier[3].in_features,
    num_classes
)


model = model.to(DEVICE)

print("Model loaded successfully.")


# ============================================================
# FREEZE MOST FEATURES
# ============================================================

for parameter in model.features.parameters():
    parameter.requires_grad = False


# ============================================================
# LOSS FUNCTION
# ============================================================

criterion = nn.CrossEntropyLoss(
    weight=class_weights
)


# ============================================================
# OPTIMIZER
# ============================================================

optimizer = torch.optim.Adam(
    model.classifier.parameters(),
    lr=LEARNING_RATE
)


# ============================================================
# MODEL DIRECTORY
# ============================================================

MODEL_DIR.mkdir(
    parents=True,
    exist_ok=True
)


best_accuracy = 0.0

best_model_path = (
    MODEL_DIR /
    "plant_disease_model.pth"
)


# ============================================================
# TRAINING LOOP
# ============================================================

print("\n" + "=" * 65)
print("STARTING TRAINING")
print("=" * 65)

for epoch in range(EPOCHS):

    # --------------------------------------------------------
    # TRAIN
    # --------------------------------------------------------

    model.train()

    running_loss = 0.0
    correct = 0
    total = 0

    for images, labels in train_loader:

        images = images.to(DEVICE)
        labels = labels.to(DEVICE)

        optimizer.zero_grad()

        outputs = model(images)

        loss = criterion(
            outputs,
            labels
        )

        loss.backward()

        optimizer.step()

        running_loss += loss.item()

        predictions = outputs.argmax(
            dim=1
        )

        total += labels.size(0)

        correct += (
            predictions == labels
        ).sum().item()

    train_accuracy = (
        100.0 * correct / total
    )

    train_loss = (
        running_loss /
        len(train_loader)
    )


    # --------------------------------------------------------
    # VALIDATION
    # --------------------------------------------------------

    model.eval()

    val_correct = 0
    val_total = 0

    with torch.no_grad():

        for images, labels in val_loader:

            images = images.to(DEVICE)
            labels = labels.to(DEVICE)

            outputs = model(images)

            predictions = outputs.argmax(
                dim=1
            )

            val_total += labels.size(0)

            val_correct += (
                predictions == labels
            ).sum().item()

    val_accuracy = (
        100.0 * val_correct / val_total
    )


    # --------------------------------------------------------
    # PRINT RESULTS
    # --------------------------------------------------------

    print("\n" + "-" * 65)

    print(
        f"Epoch {epoch + 1}/{EPOCHS}"
    )

    print(
        f"Training Loss     : {train_loss:.4f}"
    )

    print(
        f"Training Accuracy : {train_accuracy:.2f}%"
    )

    print(
        f"Validation Accuracy: {val_accuracy:.2f}%"
    )


    # --------------------------------------------------------
    # SAVE BEST MODEL
    # --------------------------------------------------------

    if val_accuracy > best_accuracy:

        best_accuracy = val_accuracy

        torch.save(
            {
                "model_state_dict":
                    model.state_dict(),

                "classes":
                    classes,

                "image_size":
                    IMAGE_SIZE,

                "model_name":
                    "MobileNetV3-Small",

                "validation_accuracy":
                    val_accuracy
            },
            best_model_path
        )

        print(
            f"Best model saved: "
            f"{best_model_path}"
        )


# ============================================================
# SAVE CLASS INFORMATION
# ============================================================

class_info_path = (
    MODEL_DIR /
    "classes.json"
)

with open(
    class_info_path,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        {
            "classes": classes,
            "image_size": IMAGE_SIZE
        },
        file,
        indent=4
    )


# ============================================================
# FINISHED
# ============================================================

print("\n" + "=" * 65)
print("TRAINING COMPLETED")
print("=" * 65)

print(
    f"Best Validation Accuracy: "
    f"{best_accuracy:.2f}%"
)

print("\nModel:")
print(best_model_path)

print("\nClasses:")
print(class_info_path)