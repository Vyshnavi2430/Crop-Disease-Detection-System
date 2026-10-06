import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { scanAPI } from '../services/api';
import { ScanReport } from '../types';
import { History, Trash2, Eye, Loader2, AlertTriangle, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ScanHistoryPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [reports, setReports] = useState<ScanReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<ScanReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Auth guard — redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) fetchHistory();
  }, [token]);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await scanAPI.getHistory();
      setReports(res.data || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to load scan history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    setDeletingId(id);
    try {
      await scanAPI.deleteReport(id);
      setReports(prev => prev.filter(r => r._id !== id));
      if (selectedReport?._id === id) setSelectedReport(null);
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to delete report.');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  // Don't render if not authenticated
  if (!token) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <History className="w-4 h-4" />
          <span>{t('history.title')}</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100">
          {t('history.title')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {t('history.subtitle')}
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
          <Loader2 className="w-10 h-10 text-emerald-500 mx-auto animate-spin" />
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading your scan history...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="bg-rose-50 dark:bg-rose-950/40 rounded-3xl p-8 text-center border border-rose-200 dark:border-rose-800 space-y-3">
          <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
          <p className="text-sm font-semibold text-rose-700 dark:text-rose-300">{error}</p>
          <button
            onClick={fetchHistory}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && reports.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
          <History className="w-12 h-12 text-slate-400 mx-auto" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">{t('history.noHistory')}</p>
          <button
            onClick={() => navigate('/scanner')}
            className="mt-2 px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
          >
            Scan Your First Crop
          </button>
        </div>
      )}

      {/* Reports List */}
      {!loading && !error && reports.length > 0 && (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-slate-800 overflow-hidden shrink-0 flex items-center justify-center text-3xl">
                  {report.uploadedImage
                    ? <img src={report.uploadedImage} alt="Crop" className="w-full h-full object-cover" />
                    : '🌿'}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                    {report.cropName || 'Crop Leaf'}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{report.diseaseName}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
                    <span>{report.confidenceScore}% {t('scanner.confidence')}</span>
                    <span>•</span>
                    <span className="capitalize">
                      {t(`severity.${report.severityLevel}`, { defaultValue: report.severityLevel })} {t('scanner.severity')}
                    </span>
                    {report.createdAt && (
                      <>
                        <span>•</span>
                        <span className="text-slate-400">{formatDate(report.createdAt as string)}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedReport(report)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>{t('history.viewReport')}</span>
                </button>
                <button
                  onClick={() => handleDelete(report._id)}
                  disabled={deletingId === report._id}
                  className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors disabled:opacity-50"
                  title="Delete Report"
                >
                  {deletingId === report._id
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Report Detail Modal */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedReport(null); }}
        >
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[85vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase">{selectedReport.cropName}</span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">{selectedReport.diseaseName}</h2>
                {selectedReport.createdAt && (
                  <p className="text-xs text-slate-400 mt-0.5">{formatDate(selectedReport.createdAt as string)}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Confidence badge */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                {selectedReport.confidenceScore}% {t('scanner.confidence')}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-bold capitalize">
                {t(`severity.${selectedReport.severityLevel}`, { defaultValue: selectedReport.severityLevel })}
              </span>
            </div>

            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
              {selectedReport.diseaseDescription && (
                <p>{selectedReport.diseaseDescription}</p>
              )}

              {selectedReport.chemicalTreatment?.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{t('scanner.chemical')}:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedReport.chemicalTreatment.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              )}

              {selectedReport.organicTreatment?.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{t('scanner.organic')}:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedReport.organicTreatment.map((o, i) => <li key={i}>{o}</li>)}
                  </ul>
                </div>
              )}

              {selectedReport.preventionMethods?.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">{t('scanner.prevention')}:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedReport.preventionMethods.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
