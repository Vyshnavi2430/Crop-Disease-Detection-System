import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { marketAPI } from '../services/api';
import { MarketPrice } from '../types';
import { getDistrictDisplayName } from '../data/indiaLocations';
import { ShoppingBag, Search, TrendingUp, TrendingDown, Minus, Filter, RefreshCw, AlertCircle } from 'lucide-react';

export const MarketPricesPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [locations, setLocations] = useState<Record<string, any>>({});
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedMarket, setSelectedMarket] = useState<string>('');
  const [cropSearch, setCropSearch] = useState<string>('');

  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch location structure on mount
  useEffect(() => {
    fetchLocations();
  }, []);

  // Fetch prices whenever state, district, market or crop filter changes
  useEffect(() => {
    fetchPrices();
  }, [selectedState, selectedDistrict, selectedMarket, cropSearch]);

  const fetchLocations = async () => {
    try {
      const res = await marketAPI.getLocations();
      setLocations(res.data || {});
    } catch (err) {
      console.warn('Error fetching market locations:', err);
    }
  };

  const fetchPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await marketAPI.getPrices(selectedState, selectedDistrict, selectedMarket, cropSearch);
      setPrices(res.data?.data || []);
    } catch (err) {
      console.error('Market prices fetch error:', err);
      setError(t('market.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const st = e.target.value;
    setSelectedState(st);
    setSelectedDistrict('');
    setSelectedMarket('');
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dist = e.target.value;
    setSelectedDistrict(dist);
    setSelectedMarket('');
  };

  const handleMarketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMarket(e.target.value);
  };

  // Get dynamic lists based on selections
  const stateKeys = Object.keys(locations);
  const availableDistricts = selectedState && locations[selectedState] ? Object.keys(locations[selectedState].districts || {}) : [];
  const availableMarkets = selectedState && selectedDistrict && locations[selectedState]?.districts[selectedDistrict]
    ? locations[selectedState].districts[selectedDistrict].markets || []
    : [];

  // Format arrival quantity and update date with i18n translation keys
  const formatArrivalQty = (qtyStr?: string) => {
    if (!qtyStr) return '-';
    const match = qtyStr.match(/^(\d+)\s+(.*)$/);
    if (match) {
      const num = match[1];
      const unit = match[2].trim().toLowerCase();
      if (unit === 'quintals' || unit === 'quintal') return `${num} ${t('market.quintals')}`;
      if (unit === 'bags' || unit === 'bag') return `${num} ${t('market.bags')}`;
      if (unit === 'boxes' || unit === 'box') return `${num} ${t('market.boxes')}`;
      if (unit === 'bunch' || unit === 'bunches') return `${num} ${t('market.bunch')}`;
    }
    return qtyStr;
  };

  const formatUpdated = (dateStr?: string) => {
    if (!dateStr) return '';
    const lower = dateStr.trim().toLowerCase();
    if (lower === 'today') return t('market.today');
    if (lower === 'yesterday') return t('market.yesterday');
    return dateStr;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 px-2 sm:px-4">
      
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <ShoppingBag className="w-4 h-4" />
          <span>{t('market.title')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100">
          {t('market.title')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          {t('market.referenceNote')}
        </p>
      </div>

      {/* Cascading Filter Controls Bar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Step 1: Select State */}
          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
              1. {t('market.selectState')}
            </label>
            <div className="relative">
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="">{t('market.allStates')}</option>
                {stateKeys.map((st) => (
                  <option key={st} value={st}>
                    {t(`data.states.${st}`, { defaultValue: st })}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 2: Select District */}
          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
              2. {t('market.selectDistrict')}
            </label>
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedState && availableDistricts.length === 0}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer disabled:opacity-50"
              >
                <option value="">{t('market.allDistricts')}</option>
                {availableDistricts.map((dist) => (
                  <option key={dist} value={dist}>
                    {getDistrictDisplayName(dist, i18n.language)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 3: Select Market / Mandi */}
          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
              3. {t('market.selectMarket')}
            </label>
            <div className="relative">
              <select
                value={selectedMarket}
                onChange={handleMarketChange}
                disabled={!selectedDistrict && availableMarkets.length === 0}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer disabled:opacity-50"
              >
                <option value="">{t('market.allMarkets')}</option>
                {availableMarkets.map((m: any) => (
                  <option key={m.marketName} value={m.marketName}>
                    {t(`data.markets.${m.marketName}`, { defaultValue: m.marketName })}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 5: Crop Search */}
          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
              {t('market.searchCrop')}
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={cropSearch}
                onChange={(e) => setCropSearch(e.target.value)}
                placeholder={t('market.searchCrop')}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            {t('market.loading')}
          </p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-3 bg-rose-50 dark:bg-rose-950/40 rounded-3xl border border-rose-200 dark:border-rose-900/60 p-6 text-rose-600 dark:text-rose-400">
          <AlertCircle className="w-8 h-8" />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && prices.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <Filter className="w-10 h-10 text-slate-400" />
          <p className="text-base font-bold text-slate-800 dark:text-slate-200">
            {t('market.noData')}
          </p>
        </div>
      )}

      {/* Prices Grid & Structured Data Table */}
      {!loading && !error && prices.length > 0 && (
        <div className="space-y-6">
          
          {/* Card View for Mobile & Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prices.map((item) => {
              const cropTranslated = t(`data.crops.${item.crop}`, { defaultValue: item.crop });
              const stateTranslated = t(`data.states.${item.state}`, { defaultValue: item.state });
              const districtTranslated = getDistrictDisplayName(item.district, i18n.language);
              const marketTranslated = t(`data.markets.${item.market}`, { defaultValue: item.market });

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                        {stateTranslated} • {districtTranslated}
                      </span>
                      <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5">
                        {cropTranslated}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                        📍 {marketTranslated}
                      </p>
                    </div>

                    <div className={`px-2.5 py-1 rounded-xl text-[10px] font-black flex items-center gap-1 shrink-0 ${
                      item.trend === 'up' 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' 
                        : item.trend === 'down' 
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300' 
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {item.trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
                      {item.trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
                      {item.trend === 'stable' && <Minus className="w-3.5 h-3.5" />}
                      <span>{item.change !== '0' ? item.change : t('market.stable')}</span>
                    </div>
                  </div>

                  {/* Modal Price Highlight */}
                  <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-slate-800/80 border border-emerald-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
                        {t('market.modalPrice')}
                      </span>
                      <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                        ₹{item.modalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right text-[11px]">
                      <span className="block text-slate-500 font-medium">{t('market.minMax')}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        ₹{item.minPrice.toLocaleString()} - ₹{item.maxPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span>📦 {t('market.arrivalQty')}: <strong className="text-slate-800 dark:text-slate-200">{formatArrivalQty(item.arrivalQuantity)}</strong></span>
                    <span>🗓️ {t('market.lastUpdated')}: <strong className="text-slate-800 dark:text-slate-200">{formatUpdated(item.updated)}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider font-extrabold text-slate-500">
                  <th className="py-4 px-6">{t('market.cropName')}</th>
                  <th className="py-4 px-4">{t('market.selectState')} / {t('market.selectDistrict')}</th>
                  <th className="py-4 px-4">{t('market.selectMarket')}</th>
                  <th className="py-4 px-4 text-right">{t('market.minPrice')}</th>
                  <th className="py-4 px-4 text-right">{t('market.maxPrice')}</th>
                  <th className="py-4 px-4 text-right">{t('market.modalPrice')}</th>
                  <th className="py-4 px-4 text-center">{t('market.arrivalQty')}</th>
                  <th className="py-4 px-6 text-right">{t('market.lastUpdated')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200">
                {prices.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 font-extrabold text-emerald-700 dark:text-emerald-400">
                      {t(`data.crops.${p.crop}`, { defaultValue: p.crop })}
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      {t(`data.states.${p.state}`, { defaultValue: p.state })}, {t(`data.districts.${p.district}`, { defaultValue: p.district })}
                    </td>
                    <td className="py-4 px-4 font-bold">
                      {t(`data.markets.${p.market}`, { defaultValue: p.market })}
                    </td>
                    <td className="py-4 px-4 text-right font-medium">₹{p.minPrice.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right font-medium">₹{p.maxPrice.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right font-black text-emerald-600 dark:text-emerald-400 text-sm">₹{p.modalPrice.toLocaleString()}</td>
                    <td className="py-4 px-4 text-center font-medium text-slate-500">{formatArrivalQty(p.arrivalQuantity)}</td>
                    <td className="py-4 px-6 text-right text-slate-400 font-medium">{formatUpdated(p.updated)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
};
