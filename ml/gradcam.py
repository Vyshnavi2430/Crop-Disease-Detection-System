import numpy as np
from PIL import Image

try:
    import torch
    import torch.nn as nn
    import torch.nn.functional as F
    TORCH_AVAILABLE = True
except ImportError:
    TORCH_AVAILABLE = False


if TORCH_AVAILABLE:
    class GradCAM:
        """
        Grad-CAM (Gradient-weighted Class Activation Mapping) for MobileNetV3-Small.
        Target layer is the final convolutional block in model.features.
        """
        def __init__(self, model, target_layer=None):
            self.model = model
            self.target_layer = target_layer if target_layer is not None else model.features[-1]
            self.gradients = None
            self.activations = None
            
            # Register hooks
            self.target_layer.register_forward_hook(self._save_activations)
            self.target_layer.register_full_backward_hook(self._save_gradients)

        def _save_activations(self, module, input, output):
            self.activations = output

        def _save_gradients(self, module, grad_input, grad_output):
            self.gradients = grad_output[0]

        def generate_heatmap(self, input_tensor, target_class=None):
            """
            Generates a normalized 2D heatmap [0, 1] for the given input_tensor (1, C, H, W).
            """
            self.model.eval()
            self.model.zero_grad()

            # Forward pass
            output = self.model(input_tensor)

            if target_class is None:
                target_class = torch.argmax(output, dim=1).item()

            score = output[0, target_class]
            score.backward(retain_graph=True)

            # Gradients (1, C, H_feat, W_feat)
            gradients = self.gradients
            activations = self.activations

            # Global average pooling over spatial dimensions
            weights = torch.mean(gradients, dim=(2, 3), keepdim=True) # (1, C, 1, 1)

            # Weighted combination of feature maps
            cam = torch.sum(weights * activations, dim=1, keepdim=True) # (1, 1, H_feat, W_feat)
            cam = F.relu(cam)

            # Normalize to [0, 1]
            cam_min, cam_max = cam.min(), cam.max()
            if cam_max > cam_min:
                cam = (cam - cam_min) / (cam_max - cam_min)
            else:
                cam = torch.zeros_like(cam)

            # Interpolate up to input image resolution
            h, w = input_tensor.shape[2], input_tensor.shape[3]
            cam_resized = F.interpolate(cam, size=(h, w), mode="bilinear", align_corners=False)
            heatmap = cam_resized.squeeze().cpu().detach().numpy()

            return heatmap, target_class


def apply_jet_colormap(heatmap):
    """
    Applies Jet colormap to 2D numpy array [0, 1], returning RGB uint8 array (H, W, 3).
    """
    v = np.clip(heatmap, 0, 1)
    r = np.clip(1.5 - np.abs(4 * v - 3), 0, 1)
    g = np.clip(1.5 - np.abs(4 * v - 2), 0, 1)
    b = np.clip(1.5 - np.abs(4 * v - 1), 0, 1)
    
    rgb = np.stack([r, g, b], axis=-1) * 255.0
    return rgb.astype(np.uint8)


def generate_gradcam_image(model, transform, original_pil_image, input_tensor, device, output_path):
    """
    Generates and saves a composite Grad-CAM heatmap visualization overlay.
    """
    if not TORCH_AVAILABLE:
        return generate_fallback_heatmap(original_pil_image, output_path)

    grad_cam = GradCAM(model)
    heatmap, pred_class = grad_cam.generate_heatmap(input_tensor)

    # Convert original PIL image to numpy array RGB
    orig_img = original_pil_image.resize((224, 224)).convert("RGB")
    orig_np = np.array(orig_img)

    # Colorize heatmap
    heatmap_rgb = apply_jet_colormap(heatmap)

    # Blend original image and heatmap (60% original, 40% heatmap overlay)
    blended = (0.6 * orig_np + 0.4 * heatmap_rgb).clip(0, 255).astype(np.uint8)

    # Create composite side-by-side visualization: [Original Image | Grad-CAM Heatmap Overlay]
    w, h = orig_img.size
    composite = Image.new("RGB", (w * 2 + 10, h), (240, 240, 240))
    composite.paste(orig_img, (0, 0))
    composite.paste(Image.fromarray(blended), (w + 10, 0))

    # Save output
    output_path.parent.mkdir(parents=True, exist_ok=True)
    composite.save(output_path, format="JPEG", quality=90)
    
    return output_path


def generate_fallback_heatmap(original_pil_image, output_path):
    """
    Generates a realistic heuristic lesion saliency heatmap when PyTorch is not available.
    Uses pixel discoloration & contrast gradients to locate damaged leaf tissue.
    """
    orig_img = original_pil_image.resize((224, 224)).convert("RGB")
    orig_np = np.array(orig_img, dtype=np.float32)

    r = orig_np[:, :, 0]
    g = orig_np[:, :, 1]
    b = orig_np[:, :, 2]

    # Leaf necrotic / chlorotic lesion detection heuristic:
    # Lesions differ from healthy green chlorophyll (g > r and g > b)
    # Brown/yellow/spot regions have elevated red and reduced green
    lesion_signal = np.maximum(0.0, r - g * 0.75) + np.abs(r - b) * 0.3
    
    # Normalize
    s_min, s_max = np.min(lesion_signal), np.max(lesion_signal)
    if s_max > s_min + 1e-5:
        norm_map = (lesion_signal - s_min) / (s_max - s_min)
    else:
        # Radial gradient fallback centered on the leaf
        y, x = np.ogrid[:224, :224]
        dist_from_center = np.sqrt((x - 112)**2 + (y - 112)**2)
        norm_map = np.clip(1.0 - (dist_from_center / 112.0), 0.0, 1.0)

    # Smooth the saliency map with simple box averaging
    kernel_size = 9
    pad = kernel_size // 2
    padded = np.pad(norm_map, pad, mode='reflect')
    smoothed = np.zeros_like(norm_map)
    for dy in range(kernel_size):
        for dx in range(kernel_size):
            smoothed += padded[dy:dy+224, dx:dx+224]
    smoothed /= (kernel_size * kernel_size)

    # Apply Jet Colormap
    heatmap_rgb = apply_jet_colormap(smoothed)

    # Blend original image and heatmap (60% original, 40% heatmap overlay)
    blended = (0.6 * orig_np + 0.4 * heatmap_rgb).clip(0, 255).astype(np.uint8)

    # Create composite side-by-side visualization: [Original Image | Grad-CAM Heatmap Overlay]
    w, h = orig_img.size
    composite = Image.new("RGB", (w * 2 + 10, h), (240, 240, 240))
    composite.paste(orig_img, (0, 0))
    composite.paste(Image.fromarray(blended), (w + 10, 0))

    # Save output
    output_path.parent.mkdir(parents=True, exist_ok=True)
    composite.save(output_path, format="JPEG", quality=90)

    return output_path
