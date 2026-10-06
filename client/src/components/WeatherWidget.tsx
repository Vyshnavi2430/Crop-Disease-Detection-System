import React from 'react';
import { useTranslation } from 'react-i18next';
import { WeatherData } from '../types';
import { CloudSun, CloudRain, Droplets, Wind, AlertTriangle, MapPin, Navigation, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WeatherWidgetProps {
  weather: WeatherData | null;
  onDetectGPS?: () => void;
  locating?: boolean;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather, onDetectGPS, locating }) => {
  const { t } = useTranslation();

  if (!weather) {
    return (
      <div className="bg-gradient-to-br from-emerald-900 via-green-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center text-center space-y-4 min-h-[220px]">
        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">{t('dashboard.selectLocation', { defaultValue: 'Select your location' })}</h3>
          <p className="text-xs text-emerald-200/80 mt-1 max-w-xs">{t('weather.subtitle', { defaultValue: 'Select location in profile or detect GPS for weather updates' })}</p>
        </div>
        <div className="flex items-center gap-2">
          {onDetectGPS && (
            <button
              onClick={onDetectGPS}
              disabled={locating}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              {locating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
              <span>{t('dashboard.detectGps', { defaultValue: 'Detect GPS Location' })}</span>
            </button>
          )}
          <Link
            to="/weather"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
          >
            {t('nav.weather', { defaultValue: 'Weather' })}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-green-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl"></div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block">{t('weather.liveForecast')}</span>
          <h3 className="text-lg font-bold text-white">{t(`data.districts.${weather.district}`, { defaultValue: weather.district }) || weather.location}</h3>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300">
          <CloudSun className="w-7 h-7" />
        </div>
      </div>

      {/* Main Temperature Display */}
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-5xl font-black text-white tracking-tight">{weather.temperature}°C</span>
        <span className="text-sm font-semibold text-emerald-200">{t(`weather.conditions.${weather.condition}`, { defaultValue: weather.condition })}</span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6 p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
        <div>
          <Droplets className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 block uppercase font-medium">{t('weather.humidity')}</span>
          <span className="text-sm font-bold">{weather.humidity}%</span>
        </div>
        <div>
          <CloudRain className="w-4 h-4 text-blue-400 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 block uppercase font-medium">{t('weather.rainProb')}</span>
          <span className="text-sm font-bold">{weather.rainProbability}%</span>
        </div>
        <div>
          <Wind className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 block uppercase font-medium">{t('weather.wind')}</span>
          <span className="text-sm font-bold">{weather.windSpeed} km/h</span>
        </div>
      </div>

      {/* Farming Alerts */}
      {weather.alerts && weather.alerts.length > 0 && (
        <div className="space-y-2">
          {weather.alerts.map((alert, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-white">{alert.title}</span>
                <p className="text-[11px] leading-tight text-amber-100">{alert.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
