import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { weatherAPI, marketAPI, scanAPI, schemeAPI, shopAPI } from '../services/api';
import { WeatherWidget } from '../components/WeatherWidget';
import { MarketWidget } from '../components/MarketWidget';
import { WeatherData, MarketPrice, ScanReport, GovernmentScheme, AgriShop } from '../types';
import { 
  ScanLine, Bot, ArrowRight, Sprout, History, Bookmark, Star, MapPin
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);
  const [scanReports, setScanReports] = useState<ScanReport[]>([]);
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [shops, setShops] = useState<AgriShop[]>([]);
  const [_loading, setLoading] = useState(true);
  const [savedTip, setSavedTip] = useState(false);
  const [locatingGPS, setLocatingGPS] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const activeState = user?.state || 'Andhra Pradesh';
      const activeDist = user?.district || 'Guntur';

      const [wRes, mRes, sRes, schRes, shRes] = await Promise.all([
        weatherAPI.getWeather(activeState, activeDist).catch(() => ({ data: null })),
        marketAPI.getPrices(activeState, activeDist).catch(() => ({ data: { data: [] } })),
        scanAPI.getHistory().catch(() => ({ data: [] })),
        schemeAPI.getSchemes().catch(() => ({ data: [] })),
        shopAPI.getShops(activeState, activeDist).catch(() => ({ data: [] }))
      ]);

      setWeather(wRes?.data || null);
      setMarketPrices(mRes.data?.data || []);
      setScanReports(sRes.data || []);
      setSchemes(schRes.data || []);
      setShops(shRes.data || []);
    } catch (err) {
      console.warn('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      alert(t('weather.geoNotSupported', { defaultValue: 'Geolocation is not supported by your browser.' }));
      return;
    }

    setLocatingGPS(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const wRes = await weatherAPI.getWeather('', '', latitude, longitude);
          if (wRes?.data) {
            setWeather(wRes.data);
          }
        } catch (err) {
          console.warn('GPS weather error:', err);
        } finally {
          setLocatingGPS(false);
        }
      },
      (geoErr) => {
        setLocatingGPS(false);
        alert(t('shops.geoError', { defaultValue: 'Could not detect GPS location.' }));
      },
      { timeout: 10000 }
    );
  };

  const userName = user?.name || t('dashboard.farmerFallback', { defaultValue: 'Farmer' });
  const locationDisplay = user?.state && user?.district
    ? `${t(`data.districts.${user.district}`, { defaultValue: user.district })}, ${t(`data.states.${user.state}`, { defaultValue: user.state })}`
    : weather?.location
      ? weather.location
      : t('dashboard.selectLocation', { defaultValue: 'Select your location' });

  return (
    <div className="space-y-8 py-4">
      
      {/* Personalized Welcome Banner */}
      <section className="bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-emerald-100">
            <Sprout className="w-4 h-4 text-emerald-300" />
            <span>{t('dashboard.badge')}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {t('dashboard.greeting', { name: userName, defaultValue: `Namaste, ${userName}! 👋` })}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 font-medium">
            {t('dashboard.location')}: <span className="font-bold">{locationDisplay}</span> | {t('dashboard.preferredLang')}: <span className="uppercase font-bold">{i18n.language}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 w-full sm:w-auto">
          <button
            onClick={() => navigate('/scanner')}
            className="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-400/30 transition-all flex items-center justify-center gap-2"
          >
            <ScanLine className="w-5 h-5" />
            <span>{t('dashboard.scannerBtn')}</span>
          </button>
        </div>
      </section>

      {/* Main Grid: Weather & Daily Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weather Widget */}
        <div className="lg:col-span-1">
          <WeatherWidget weather={weather} onDetectGPS={handleDetectGPS} locating={locatingGPS} />
        </div>

        {/* Daily Tip & Smart Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Daily Tip Card */}
          <div className="bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-white dark:to-slate-900 rounded-3xl p-6 border border-amber-500/30 shadow-sm relative">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/30">
                  💡
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">{t('dashboard.todayTipBadge')}</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{t('dashboard.ipmTitle')}</h3>
                </div>
              </div>
              <button
                onClick={() => setSavedTip(!savedTip)}
                className={`p-2 rounded-xl border transition-all ${
                  savedTip ? 'bg-amber-500 text-white border-amber-500' : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
                title="Save Tip"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
              {t('dashboard.ipmDesc')}
            </p>
          </div>

          {/* AI Scanner & Voice Assistant Quick Banners */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div
              onClick={() => navigate('/scanner')}
              className="group cursor-pointer bg-gradient-to-br from-emerald-600 to-green-600 text-white rounded-3xl p-6 shadow-lg shadow-emerald-600/20 hover:scale-[1.02] transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <ScanLine className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-extrabold text-base">{t('dashboard.leafScanTitle')}</h3>
                <p className="text-xs text-emerald-100">{t('dashboard.leafScanDesc')}</p>
              </div>
              <div className="pt-4 flex items-center text-xs font-bold text-amber-300">
                <span>{t('dashboard.startScanBtn')}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            <div
              onClick={() => navigate('/chat')}
              className="group cursor-pointer bg-gradient-to-br from-indigo-700 to-blue-600 text-white rounded-3xl p-6 shadow-lg shadow-indigo-600/20 hover:scale-[1.02] transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-extrabold text-base">{t('dashboard.assistantTitle')}</h3>
                <p className="text-xs text-indigo-100">{t('dashboard.assistantDesc')}</p>
              </div>
              <div className="pt-4 flex items-center text-xs font-bold text-indigo-200">
                <span>{t('dashboard.chatAiBtn')}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Recent Scan History Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">{t('dashboard.recentScansTitle')}</h3>
          </div>
          <Link to="/history" className="text-xs font-bold text-emerald-600 hover:underline">
            {t('dashboard.viewHistory')}
          </Link>
        </div>

        {scanReports.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
            <ScanLine className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-xs font-semibold text-slate-500">{t('dashboard.noScans')}</p>
            <button
              onClick={() => navigate('/scanner')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
            >
              {t('dashboard.firstScanBtn')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scanReports.slice(0, 3).map((report, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-emerald-100 dark:bg-slate-700 overflow-hidden shrink-0 flex items-center justify-center text-2xl">
                  🌿
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block truncate">{report.diseaseName}</span>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span className="font-semibold text-emerald-600">{report.confidenceScore}% {t('dashboard.confidence')}</span>
                    <span>•</span>
                    <span className="capitalize">{t(`severity.${report.severityLevel}`, { defaultValue: report.severityLevel })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Market Prices & Nearby Shops Dual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <MarketWidget prices={marketPrices} />

        {/* Nearby Agri Shops Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">{t('dashboard.nearbyShopsTitle')}</h3>
              <p className="text-xs text-slate-500">{t('dashboard.nearbyShopsSubtitle')}</p>
            </div>
            <Link to="/shops" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              <span>{t('dashboard.viewAll')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {shops.slice(0, 3).map((shop) => (
              <div key={shop.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">{t(`data.shops.${shop.id}`, { defaultValue: shop.name })}</span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{shop.address} ({shop.distance})</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-extrabold px-2 py-1 rounded-lg shrink-0">
                  <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                  <span>{shop.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Top Government Schemes Grid */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">{t('dashboard.schemesTitle')}</h3>
            <p className="text-xs text-slate-500">{t('dashboard.schemesSubtitle')}</p>
          </div>
          <Link to="/schemes" className="text-xs font-bold text-emerald-600 hover:underline">
            {t('dashboard.browseSchemes')}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {schemes.slice(0, 3).map((scheme) => (
            <div key={scheme.schemeId} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">{t(`schemes.categories.${scheme.category}`, { defaultValue: scheme.category })}</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{t(`data.schemes.${scheme.schemeId}.title`, { defaultValue: scheme.title })}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{t(`data.schemes.${scheme.schemeId}.overview`, { defaultValue: scheme.overview })}</p>
              </div>
              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
              >
                <span>{t('dashboard.applyPortal')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
