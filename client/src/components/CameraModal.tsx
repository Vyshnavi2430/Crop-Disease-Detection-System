import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, RefreshCw, X, Check } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (base64Image: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !capturedImage) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    stopCamera();
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode, width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.warn('Camera Access Error:', err);
      setCameraError(t('cameraModal.cameraError'));
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(dataUrl);
      stopCamera();
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onClose();
    }
  };

  const toggleFacingMode = () => {
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl bg-slate-900 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-4 bg-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">{t('cameraModal.headerTitle')}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-700 text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Viewport or Preview */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {capturedImage ? (
            <img src={capturedImage} alt="Captured Crop Leaf" className="w-full h-full object-contain" />
          ) : cameraError ? (
            <div className="p-6 text-center text-rose-400 space-y-3">
              <p className="text-sm font-semibold">{cameraError}</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          )}

          {/* Guidelines Overlay */}
          {!capturedImage && !cameraError && (
            <div className="absolute inset-0 border-2 border-dashed border-emerald-400/60 rounded-3xl m-8 pointer-events-none flex items-center justify-center">
              <span className="bg-black/50 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md">
                {t('cameraModal.leafPositionGuideline')}
              </span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-800 flex items-center justify-between gap-4">
          {capturedImage ? (
            <>
              <button
                onClick={() => {
                  setCapturedImage(null);
                  startCamera();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-700 text-slate-200 font-bold text-sm hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{t('cameraModal.retakePhoto')}</span>
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
              >
                <Check className="w-4 h-4" />
                <span>{t('cameraModal.analyzeLeaf')}</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={toggleFacingMode}
                className="p-3 rounded-xl bg-slate-700 text-slate-200 hover:bg-slate-600 transition-colors"
                title={t('cameraModal.switchCamera')}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={handleCapture}
                disabled={!!cameraError}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-bold text-base hover:from-emerald-500 hover:to-green-400 transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Camera className="w-5 h-5" />
                <span>{t('cameraModal.capturePhoto')}</span>
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
