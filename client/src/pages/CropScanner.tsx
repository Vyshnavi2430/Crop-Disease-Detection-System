import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { aiAPI, scanAPI } from '../services/api';
import { CameraModal } from '../components/CameraModal';
import { ScanReport } from '../types';
import { 
  ScanLine, Camera, Upload, Sparkles, AlertCircle, 
  Sprout, TestTube, Leaf, Shield, CloudSun, RefreshCw, Bookmark, Volume2,
  Calculator, Droplets, Clock, Activity, CheckCircle2, AlertTriangle, ShieldCheck, HeartPulse
} from 'lucide-react';
import { SpeechService } from '../services/speech';
import { getLocalizedReport } from '../data/diseaseTranslations';

export const CropScanner: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [rawReport, setRawReport] = useState<ScanReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sprayerType, setSprayerType] = useState<'knapsack15' | 'halfAcre' | 'oneAcre' | 'custom'>('knapsack15');
  const [customLiters, setCustomLiters] = useState<number>(20);

  const report = rawReport ? getLocalizedReport(rawReport, i18n.language) as ScanReport : null;

  const getCalculatorValues = () => {
    if (!report?.dosageGuidance?.sprayTankCalculator) return null;
    const dosePerL = report.dosageGuidance.sprayTankCalculator.recommendedDosePerLiter || 2.5;
    const unit = report.dosageGuidance.sprayTankCalculator.unit || 'g';

    let liters = 15;
    let label = 'Standard 15L Knapsack Sprayer';
    let tanks = 1;

    if (sprayerType === 'knapsack15') {
      liters = 15;
      label = 'Standard 15L Knapsack Sprayer';
      tanks = 1;
    } else if (sprayerType === 'halfAcre') {
      liters = 100;
      label = '0.5 Acre Power Sprayer (100L)';
      tanks = Math.ceil(100 / 15);
    } else if (sprayerType === 'oneAcre') {
      liters = 200;
      label = '1.0 Acre Field Spray (200L)';
      tanks = Math.ceil(200 / 15);
    } else {
      liters = Math.max(1, Number(customLiters) || 15);
      label = `Custom Tank (${liters} Liters)`;
      tanks = Math.ceil(liters / 15);
    }

    const chemicalAmount = (liters * dosePerL).toFixed(1);

    return {
      liters,
      label,
      tanks,
      dosePerL,
      unit,
      chemicalAmount
    };
  };

  const formatPredictionName = (className: string) => {
    return className
      .replace('___', ' — ')
      .replace(/_/g, ' ')
      .replace('Pepper, bell', 'Bell Pepper');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setRawReport(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (base64Image: string) => {
    setImagePreview(base64Image);
    setRawReport(null);
    setError(null);
    try {
      const arr = base64Image.split(',');
      const mimeMatch = arr[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
      const bstr = atob(arr[1] || arr[0]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const file = new File([u8arr], `camera_${Date.now()}.jpg`, { type: mime });
      setSelectedFile(file);
    } catch (e) {
      console.warn('Base64 conversion failed:', e);
      setSelectedFile(null);
    }
  };

  const sampleLeaves = [
    {
      id: 'tomato_early_blight',
      name: 'Tomato Early Blight',
      crop: 'Tomato',
      cropEmoji: '🍅',
      tag: 'Alternaria solani',
      path: '/sample_leaves/tomato_early_blight.jpg'
    },
    {
      id: 'tomato_late_blight',
      name: 'Tomato Late Blight',
      crop: 'Tomato',
      cropEmoji: '🍅',
      tag: 'Phytophthora infestans',
      path: '/sample_leaves/tomato_late_blight.jpg'
    },
    {
      id: 'potato_early_blight',
      name: 'Potato Early Blight',
      crop: 'Potato',
      cropEmoji: '🥔',
      tag: 'Target lesions',
      path: '/sample_leaves/potato_early_blight.jpg'
    },
    {
      id: 'tomato_healthy',
      name: 'Healthy Leaf',
      crop: 'Tomato',
      cropEmoji: '🌿',
      tag: 'Optimal leaf health',
      path: '/sample_leaves/tomato_healthy.jpg'
    }
  ];

  const handleSelectSample = async (sample: typeof sampleLeaves[0]) => {
    try {
      setAnalyzing(true);
      setError(null);
      setRawReport(null);
      setSaveSuccess(false);

      const response = await fetch(sample.path);
      const blob = await response.blob();
      const file = new File([blob], `${sample.id}.jpg`, { type: 'image/jpeg' });
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        setImagePreview(base64);

        try {
          const formData = new FormData();
          formData.append('cropImage', file);
          formData.append('language', i18n.language);
          const res = await aiAPI.analyzeCrop(formData);

          if (res.data && res.data.report) {
            setRawReport(res.data.report);
          } else {
            setError(t('scanner.generateReportError'));
          }
        } catch (err: any) {
          const serverMessage = err?.response?.data?.message || err?.response?.data?.error;
          setError(serverMessage || t('scanner.analysisError'));
        } finally {
          setAnalyzing(false);
        }
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.warn('Sample load error:', err);
      setAnalyzing(false);
      setError('Could not load sample leaf.');
    }
  };

  const handleAnalyze = async () => {
    if (!imagePreview) {
      setError(t('scanner.selectPhotoError'));
      return;
    }

    setAnalyzing(true);
    setError(null);
    setRawReport(null);
    setSaveSuccess(false);

    try {
      let res;
      if (selectedFile) {
        const formData = new FormData();
        formData.append('cropImage', selectedFile);
        formData.append('language', i18n.language);
        res = await aiAPI.analyzeCrop(formData);
      } else {
        res = await aiAPI.analyzeCropBase64(imagePreview, i18n.language);
      }

      if (res.data && res.data.report) {
        setRawReport(res.data.report);
      } else {
        setError(t('scanner.generateReportError'));
      }
    } catch (err: any) {
      console.warn('AI Analysis Error:', err);
      const serverMessage = err?.response?.data?.message || err?.response?.data?.error;
      setError(serverMessage || t('scanner.analysisError'));
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSaveReport = async () => {
    if (!report || !imagePreview) return;
    setSaving(true);
    try {
      await scanAPI.saveReport({
        ...report,
        uploadedImage: imagePreview,
        language: i18n.language
      });
      setSaveSuccess(true);
    } catch (err: any) {
      console.warn('Error saving scan report:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleSpeakReport = () => {
    if (!report) return;
    const confidenceLevel = t(`severity.${report.confidenceLevel || 'High'}`, { defaultValue: report.confidenceLevel || 'High' });
    const severityLevel = t(`severity.${report.severityLevel}`, { defaultValue: report.severityLevel });
    const speechText = `${t('scanner.reportTitle')}: ${report.diseaseName}. ${t('scanner.confidence')}: ${report.confidenceScore}% ${confidenceLevel}. ${t('scanner.severity')}: ${severityLevel}. ${t('scanner.organic')}: ${report.organicTreatment?.join(', ')}. ${t('scanner.chemical')}: ${report.chemicalTreatment?.join(', ')}. ${t('scanner.fertilizers')}: ${report.fertilizerRecommendations?.join(', ')}. ${t('scanner.prevention')}: ${report.preventionMethods?.join(', ')}.`;
    SpeechService.speak(speechText, i18n.language);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <ScanLine className="w-4 h-4" />
          <span>{t('hero.badge')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100">
          {t('scanner.title')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          {t('scanner.subtitle')}
        </p>
      </div>

      {/* Capture / Upload Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Preview or Upload Zone */}
        <div className="relative aspect-video sm:aspect-[21/9] rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center p-4 overflow-hidden group">
          {imagePreview ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img src={imagePreview} alt="Leaf Preview" className="h-full object-contain rounded-xl" />
              <button
                onClick={() => {
                  setImagePreview(null);
                  setSelectedFile(null);
                  setRawReport(null);
                }}
                className="absolute top-2 right-2 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900"
                title={t('cameraModal.retakePhoto')}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <Leaf className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{t('cameraModal.leafPositionGuideline')}</p>
                <p className="text-xs text-slate-400">{t('scanner.subtitle')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setIsCameraOpen(true)}
            className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            <span>{t('scanner.takePhoto')}</span>
          </button>

          <label className="py-3.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200 dark:border-slate-700">
            <Upload className="w-5 h-5 text-emerald-600" />
            <span>{t('scanner.uploadPhoto')}</span>
            <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
          </label>
        </div>

        {/* Quick Demo Sample Leaves */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Instant Demo Leaves — Click to Scan & Diagnose</span>
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold hidden sm:inline">1-Click AI Test</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {sampleLeaves.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                disabled={analyzing}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500 dark:hover:border-emerald-400 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 p-2.5 text-left transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-slate-200 dark:bg-slate-700 relative">
                  <img
                    src={sample.path}
                    alt={sample.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-slate-900/80 text-[10px] font-bold text-white backdrop-blur-sm">
                    {sample.cropEmoji}
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-black text-slate-900 dark:text-slate-100 truncate">
                    {sample.name}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-medium">
                    {sample.tag}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {imagePreview && !report && (
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-black text-base shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {analyzing ? (
              <>
                <Sparkles className="w-6 h-6 animate-spin text-amber-300" />
                <span>{t('scanner.analyzing')}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 text-amber-300" />
                <span>{t('cameraModal.analyzeLeaf')}</span>
              </>
            )}
          </button>
        )}

        {error && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-amber-800 dark:text-amber-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

      </div>

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      {/* AI Pathology Structured Report Cards */}
      {report && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Low Confidence Safety Warning Banner */}
          {report.isLowConfidence && (
            <div className="p-5 rounded-3xl bg-amber-500/15 border-2 border-amber-500/60 text-amber-900 dark:text-amber-200 space-y-2 shadow-lg">
              <div className="flex items-center gap-2 font-black text-base text-amber-700 dark:text-amber-300">
                <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                <span>{t('scanner.lowConfidenceAlert', 'Low Confidence Prediction Warning')} ({report.confidenceScore}%)</span>
              </div>
              <p className="text-xs font-semibold leading-relaxed">
                {report.lowConfidenceWarning || t('scanner.lowConfidenceMsg', 'The AI model confidence is under 60%. Please capture a clearer, well-lit leaf image focusing closely on the affected lesion area, or consult an agricultural expert.')}
              </p>
              <button
                onClick={() => {
                  setImagePreview(null);
                  setSelectedFile(null);
                  setRawReport(null);
                }}
                className="mt-2 py-2 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all inline-flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{t('cameraModal.retakePhoto', 'Recapture Clearer Image')}</span>
              </button>
            </div>
          )}

          {/* Main Diagnosis Summary Card */}
          <div className="bg-gradient-to-br from-emerald-900 via-green-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
            
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">{t('scanner.reportTitle')}</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">{report.diseaseName}</h2>
                <p className="text-xs text-emerald-200 mt-1">{t('profile.primaryCrop')}: <span className="font-bold text-white">{report.cropName || t('profile.primaryCrop')}</span></p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3.5 py-1.5 rounded-full border font-black text-xs ${
                  report.confidenceLevel === 'Low' ? 'bg-amber-500/20 border-amber-400/40 text-amber-300' : 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                }`}>
                  {report.confidenceScore}% {t(`severity.${report.confidenceLevel || 'High'}`, { defaultValue: report.confidenceLevel || 'High' })} {t('scanner.confidence')}
                </span>
                <span className={`px-3.5 py-1.5 rounded-full text-xs font-black text-white ${
                  report.severityLevel === 'Critical' ? 'bg-rose-600' : report.severityLevel === 'High' ? 'bg-amber-600' : 'bg-emerald-600'
                }`}>
                  {t(`severity.${report.severityLevel}`, { defaultValue: report.severityLevel })} {t('scanner.severity')}
                </span>
              </div>
            </div>

            <p className="text-sm text-emerald-100/90 leading-relaxed font-medium">
              {report.diseaseDescription}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleSpeakReport}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>{t('scanner.readAloud')}</span>
              </button>

              <button
                onClick={handleSaveReport}
                disabled={saving || saveSuccess}
                className={`px-5 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-md ${
                  saveSuccess 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{saveSuccess ? t('scanner.savedSuccess') : t('scanner.saveReport')}</span>
              </button>
            </div>

          </div>

          {/* Grad-CAM AI Visual Explainability Heatmap Card */}
          {report.heatmapUrl && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-lg">
                <Sparkles className="w-6 h-6 text-amber-500" />
                <h3>{t('scanner.gradcamTitle', 'Grad-CAM AI Visual Explainability Heatmap')}</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                {t('scanner.gradcamSubtitle', 'The side-by-side visualization below highlights the precise leaf regions (Red/Yellow heat zones) that influenced the CNN model’s diagnostic prediction.')}
              </p>
              <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 p-2 flex justify-center">
                <img
                  src={report.heatmapUrl.startsWith('http') ? report.heatmapUrl : `http://localhost:5000${report.heatmapUrl}`}
                  alt="Grad-CAM AI Heatmap Explanation"
                  className="max-h-80 w-auto object-contain rounded-xl shadow-lg"
                />
              </div>
            </div>
          )}

          {/* Environmental Disease Risk Multimodal Fusion Card */}
          {report.environmentalRisk && (
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4 border border-indigo-900/50">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-base">
                  <CloudSun className="w-6 h-6 text-amber-400" />
                  <h3>{t('scanner.environmentalRiskTitle', 'Environmental Disease Risk Fusion')}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-black ${
                  report.environmentalRisk.environmentalRiskLevel === 'High' ? 'bg-rose-600 text-white' :
                  report.environmentalRisk.environmentalRiskLevel === 'Moderate' ? 'bg-amber-500 text-slate-950' :
                  'bg-emerald-600 text-white'
                }`}>
                  {report.environmentalRisk.environmentalRiskLevel} Risk ({report.environmentalRisk.riskScore}/100)
                </span>
              </div>

              {/* Weather Context Badges */}
              {report.environmentalRisk.weatherContext && (
                <div className="grid grid-cols-3 gap-2 py-1">
                  <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/10">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t('scanner.temperature')}</span>
                    <span className="text-sm font-black text-amber-300">{report.environmentalRisk.weatherContext.temperature}°C</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/10">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t('scanner.humidity')}</span>
                    <span className="text-sm font-black text-blue-300">{report.environmentalRisk.weatherContext.humidity}%</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/10">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{t('scanner.rainChance')}</span>
                    <span className="text-sm font-black text-cyan-300">{report.environmentalRisk.weatherContext.rainProbability}%</span>
                  </div>
                </div>
              )}

              {/* Risk Factors List */}
              {report.environmentalRisk.riskFactors && report.environmentalRisk.riskFactors.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-indigo-200 uppercase tracking-wider">{t('scanner.riskDrivers')}</h4>
                  <ul className="space-y-1.5">
                    {report.environmentalRisk.riskFactors.map((factor, idx) => (
                      <li key={idx} className="text-xs text-slate-200 flex items-start gap-2 bg-white/5 p-2 rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5"></span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Environmental Guidance */}
              {report.environmentalRisk.environmentalAdvice && (
                <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 text-xs font-medium leading-relaxed">
                  <span className="font-bold text-amber-300 block mb-1">{t('scanner.weatherRecommendation')}:</span>
                  {report.environmentalRisk.environmentalAdvice}
                </div>
              )}
            </div>
          )}

          {/* Differential Diagnosis / Top-3 Pathogen Candidates Card */}
          {report.topPredictions && report.topPredictions.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-base">
                  <Activity className="w-5 h-5 text-indigo-500" />
                  <h3>Differential Diagnosis (AI Vision Model Multi-Pathogen Confidence)</h3>
                </div>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                  MobileNetV3 PyTorch Inference
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                The diagnostic vision pipeline evaluates leaf tissue morphology against all 9 supported pathogen profiles. Below is the differential probability ranking for this specimen:
              </p>
              <div className="space-y-3 pt-1">
                {report.topPredictions.map((pred, idx) => {
                  const isPrimary = idx === 0;
                  const barColor = isPrimary ? 'bg-emerald-500' : idx === 1 ? 'bg-amber-500' : 'bg-slate-400 dark:bg-slate-600';
                  return (
                    <div key={idx} className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white ${isPrimary ? 'bg-emerald-600' : 'bg-slate-500'}`}>
                            #{idx + 1}
                          </span>
                          <span className="text-slate-900 dark:text-white">{formatPredictionName(pred.class)}</span>
                          {isPrimary && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                              Primary Diagnosis
                            </span>
                          )}
                        </div>
                        <span className="font-black text-slate-900 dark:text-emerald-400">{pred.confidence.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${barColor} rounded-full transition-all duration-700`}
                          style={{ width: `${Math.min(100, Math.max(4, pred.confidence))}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CIBRC Registered Commercial Formulations & Precision Spray Tank Calculator */}
          {report.dosageGuidance && (
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-emerald-500/30 space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-black text-lg">
                    <Calculator className="w-6 h-6 text-amber-400" />
                    <h3>Precision Spray Tank & Chemical Dosage Calculator</h3>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    ICAR & CIBRC Approved Agricultural Solutions tailored for Indian field conditions
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300">CIBRC Certified Doses</span>
                </div>
              </div>

              {/* Interactive Sprayer Selection */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  Select Your Sprayer / Field Size:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={() => setSprayerType('knapsack15')}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      sprayerType === 'knapsack15'
                        ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="block text-xs font-black">15L Knapsack</span>
                    <span className="block text-[11px] opacity-80 mt-0.5">1 Manual Tank</span>
                  </button>

                  <button
                    onClick={() => setSprayerType('halfAcre')}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      sprayerType === 'halfAcre'
                        ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="block text-xs font-black">0.5 Acre Plot</span>
                    <span className="block text-[11px] opacity-80 mt-0.5">100 Liters Water</span>
                  </button>

                  <button
                    onClick={() => setSprayerType('oneAcre')}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      sprayerType === 'oneAcre'
                        ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="block text-xs font-black">1.0 Acre Field</span>
                    <span className="block text-[11px] opacity-80 mt-0.5">200 Liters Water</span>
                  </button>

                  <button
                    onClick={() => setSprayerType('custom')}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      sprayerType === 'custom'
                        ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="block text-xs font-black">Custom Tank</span>
                    <span className="block text-[11px] opacity-80 mt-0.5">Enter Volume (L)</span>
                  </button>
                </div>

                {sprayerType === 'custom' && (
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-2xl mt-2">
                    <span className="text-xs font-bold text-slate-300">Custom Spray Water Capacity:</span>
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={customLiters}
                      onChange={(e) => setCustomLiters(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-24 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/20 text-white font-black text-sm text-center focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-xs font-bold text-amber-300">Liters</span>
                  </div>
                )}
              </div>

              {/* Calculated Results Display Bar */}
              {(() => {
                const calc = getCalculatorValues();
                if (!calc) return null;
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/5 border border-emerald-500/20 p-4 rounded-2xl">
                    <div className="text-center sm:text-left">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Total Water Volume</span>
                      <span className="text-2xl font-black text-cyan-300">{calc.liters} Litres</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">≈ {calc.tanks} Knapsack Refills</span>
                    </div>

                    <div className="text-center sm:text-left sm:border-l sm:border-white/10 sm:pl-4">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Required Chemical</span>
                      <span className="text-2xl font-black text-amber-300">{calc.chemicalAmount} {calc.unit}</span>
                      <span className="text-[11px] text-emerald-400 block mt-0.5">Based on {calc.dosePerL} {calc.unit}/L</span>
                    </div>

                    <div className="text-center sm:text-left sm:border-l sm:border-white/10 sm:pl-4">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Recommended Application</span>
                      <span className="text-sm font-bold text-emerald-200 mt-1 block">Early Morning (6:30 - 9:30 AM)</span>
                      <span className="text-[11px] text-slate-400 block">Ensure fine mist canopy coverage</span>
                    </div>
                  </div>
                );
              })()}

              {/* Pre-Harvest Interval (PHI) Food Safety Alert */}
              {report.dosageGuidance.commercialBrands.some(b => b.phiDays > 0) && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-xs font-black text-amber-300 uppercase tracking-wider block">
                      Mandatory Pre-Harvest Food Safety Interval (PHI)
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      To safeguard consumers and adhere to Food Safety Standards (FSSAI), observe a strict waiting period of{' '}
                      <span className="font-extrabold text-amber-300 underline">
                        {Math.max(...report.dosageGuidance.commercialBrands.map(b => b.phiDays))} Days
                      </span>{' '}
                      between chemical spraying and harvesting produce for consumption or market sale.
                    </p>
                  </div>
                </div>
              )}

              {/* Commercial Brands List */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
                  Top Recommended CIBRC-Approved Commercial Products:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {report.dosageGuidance.commercialBrands.map((brand, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all space-y-2.5 flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-white">{brand.brandName}</span>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            PHI: {brand.phiDays} Days
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-medium">{brand.activeIngredient}</p>
                      </div>

                      <div className="space-y-1 text-xs pt-1 border-t border-white/10">
                        <div className="flex justify-between text-slate-300">
                          <span className="text-[11px] text-slate-400">15L Knapsack:</span>
                          <span className="font-bold text-amber-300">{brand.dosageKnapsack15L}</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span className="text-[11px] text-slate-400">Per Acre:</span>
                          <span className="font-bold text-emerald-300">{brand.dosageAcre}</span>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400 italic pt-1 border-t border-white/5">
                        {brand.applicationTiming}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutritional Recovery & Cell Wall Fortification */}
              {report.dosageGuidance.recoveryNutrients && report.dosageGuidance.recoveryNutrients.length > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                    <HeartPulse className="w-4 h-4 text-rose-400" />
                    <span>Agronomic Plant Recovery & Cuticle Fortification Plan</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-200">
                    {report.dosageGuidance.recoveryNutrients.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Safe Spraying Checklist */}
              {report.dosageGuidance.safetyPrecautions && report.dosageGuidance.safetyPrecautions.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Farmer Health & Chemical Safety Protocol</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {report.dosageGuidance.safetyPrecautions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          )}

          {/* Treatment Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Chemical Treatment */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-extrabold text-base">
                <TestTube className="w-5 h-5" />
                <h3>{t('scanner.chemical')}</h3>
              </div>
              <ul className="space-y-2">
                {report.chemicalTreatment?.map((item, i) => (
                  <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organic Treatment */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-base">
                <Sprout className="w-5 h-5" />
                <h3>{t('scanner.organic')}</h3>
              </div>
              <ul className="space-y-2">
                {report.organicTreatment?.map((item, i) => (
                  <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fertilizer Guidance */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-base">
                <Leaf className="w-5 h-5" />
                <h3>{t('scanner.fertilizers')}</h3>
              </div>
              <ul className="space-y-2">
                {report.fertilizerRecommendations?.map((item, i) => (
                  <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prevention & Precautions */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-base">
                <Shield className="w-5 h-5" />
                <h3>{t('scanner.prevention')}</h3>
              </div>
              <ul className="space-y-2">
                {report.preventionMethods?.map((item, i) => (
                  <li key={i} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Weather & Recovery Banner */}
          {report.weatherImpact && (
            <div className="bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-blue-500/10 rounded-3xl p-6 border border-blue-500/30 flex items-start gap-3">
              <CloudSun className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{t('weather.alertsTitle')}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">{report.weatherImpact}</p>
                {report.recoverySuggestions && (
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 pt-1">
                    {t('scanner.smartRec')}: {report.recoverySuggestions}
                  </p>
                )}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
