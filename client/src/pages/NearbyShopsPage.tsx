import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { shopAPI } from '../services/api';
import { AgriShop } from '../types';
import { getDistrictDisplayName, INDIA_LOCATIONS } from '../data/indiaLocations';
import { 
  ShoppingBag, MapPin, Phone, Clock, Star, ExternalLink, 
  Navigation, RefreshCw, Filter, Sprout, ShieldAlert, Wrench, Search,
  CheckCircle2, Info
} from 'lucide-react';

export const NearbyShopsPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [selectedState, setSelectedState] = useState<string>('Andhra Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Guntur');
  const [selectedPlace, setSelectedPlace] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [shops, setShops] = useState<AgriShop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [locating, setLocating] = useState<boolean>(false);

  useEffect(() => {
    fetchShops();
  }, [selectedState, selectedDistrict, selectedPlace, selectedCategory, searchQuery]);

  const fetchShops = async (lat?: number, lng?: number) => {
    setLoading(true);
    try {
      const res = await shopAPI.getShops(
        selectedState,
        selectedDistrict,
        selectedPlace,
        selectedCategory,
        lat,
        lng,
        searchQuery
      );
      setShops(res.data || []);
    } catch (err) {
      console.warn('Error fetching shops:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const st = e.target.value;
    setSelectedState(st);
    const districts = Object.keys(INDIA_LOCATIONS[st] || {});
    const firstDist = districts[0] || '';
    setSelectedDistrict(firstDist);
    const places = INDIA_LOCATIONS[st]?.[firstDist] || [];
    setSelectedPlace(places[0] || '');
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dist = e.target.value;
    setSelectedDistrict(dist);
    const places = INDIA_LOCATIONS[selectedState]?.[dist] || [];
    setSelectedPlace(places[0] || '');
  };

  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      alert(t('weather.geoNotSupported'));
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        const { latitude, longitude } = pos.coords;
        fetchShops(latitude, longitude);
      },
      (error) => {
        setLocating(false);
        console.warn('GPS error:', error.message);
        alert(t('shops.geoError'));
      },
      { timeout: 10000 }
    );
  };

  const availableStates = Object.keys(INDIA_LOCATIONS);
  const availableDistricts = Object.keys(INDIA_LOCATIONS[selectedState] || {});
  const availablePlaces = INDIA_LOCATIONS[selectedState]?.[selectedDistrict] || [];

  const categories = [
    { key: 'all', label: t('shops.categories.all'), icon: ShoppingBag },
    { key: 'fertilizer_seed', label: t('shops.categories.fertilizer_seed'), icon: Sprout },
    { key: 'pesticides', label: t('shops.categories.pesticides'), icon: ShieldAlert },
    { key: 'equipment', label: t('shops.categories.equipment'), icon: Wrench }
  ];

  const getCategoryLabel = (category?: string, type?: string) => {
    const source = `${category || ''} ${type || ''}`.toLowerCase();
    if (source.includes('fertilizer') || source.includes('seed')) return t('shops.categories.fertilizer_seed');
    if (source.includes('pesticide') || source.includes('chemical') || source.includes('bio')) return t('shops.categories.pesticides');
    if (source.includes('equipment') || source.includes('machinery') || source.includes('tool')) return t('shops.categories.equipment');
    return category || type || '';
  };

  const getLocalizedShopName = (shop: AgriShop) => {
    return shop.nameTranslations?.[i18n.language as keyof typeof shop.nameTranslations]
      || shop.nameTranslations?.en
      || shop.name;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 px-2 sm:px-4">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-bold uppercase tracking-wider">
          <ShoppingBag className="w-4 h-4" />
          <span>{t('shops.badge')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100">
          {t('shops.title')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          {t('shops.subtitle')}
        </p>
      </div>

      {/* Location Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('shops.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 placeholder:text-slate-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Select State */}
          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
              {t('shops.selectState')}
            </label>
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
            >
              {availableStates.map((st) => (
                <option key={st} value={st}>
                  {t(`data.states.${st}`, { defaultValue: st })}
                </option>
              ))}
            </select>
          </div>

          {/* Select District */}
          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
              {t('shops.selectDistrict')}
            </label>
            <select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
            >
              {availableDistricts.map((dist) => (
                <option key={dist} value={dist}>
                  {getDistrictDisplayName(dist, i18n.language)}
                </option>
              ))}
            </select>
          </div>

          {/* Select Place / Town */}
          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
              {t('shops.selectPlace')}
            </label>
            <select
              value={selectedPlace}
              onChange={(e) => setSelectedPlace(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
            >
              <option value="">{t('shops.allPlaces')}</option>
              {availablePlaces.map((plc) => (
                <option key={plc} value={plc}>
                  {plc}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* GPS Button */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleDetectGPS}
            disabled={locating}
            className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs transition-all flex items-center gap-2 shadow-md shadow-rose-500/20 disabled:opacity-50"
          >
            {locating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
            <span>{locating ? t('shops.locating') : t('shops.useGps')}</span>
          </button>

          <span className="text-xs font-bold text-slate-500">
            {shops.length} {shops.length === 1 ? t('shops.record') : t('shops.records')}
          </span>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`p-3 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <RefreshCw className="w-8 h-8 text-rose-500 animate-spin" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            {t('shops.loading')}
          </p>
        </div>
      )}

      {/* Honest Empty State */}
      {!loading && shops.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Info className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {t('shops.noRecordsTitle')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('shops.noRecordsDescription')} {selectedDistrict}, {selectedState}.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full justify-center">
            <button
              onClick={() => {
                setSelectedPlace('');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              aria-label={t('shops.resetFilters')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
            >
              {t('shops.resetFilters')}
            </button>
            <button
              onClick={handleDetectGPS}
              aria-label={t('shops.useGpsNearby')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{t('shops.useGpsNearby')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Shop Cards Grid */}
      {!loading && shops.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shops.map((shop) => {
            const phoneNum = shop.phone || shop.contact;
            const shopTiming = shop.timing || shop.timings;
            const mapsUrl = shop.mapsUrl || (shop.address ? `https://maps.google.com/?q=${encodeURIComponent(`${shop.name} ${shop.address}`)}` : null);

            return (
              <div
                key={shop.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  
                  {/* Category Badge & Data Source Label */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-[11px] font-bold text-rose-700 dark:text-rose-300">
                        {getCategoryLabel(shop.category, shop.type)}
                      </span>

                      {/* Explicit Honest Data Source Tag */}
                      {shop.dataSource === 'verified' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{t('shops.verifiedStore')}</span>
                        </span>
                      ) : shop.dataSource === 'live' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-[10px] font-bold text-sky-700 dark:text-sky-300">
                          <Navigation className="w-3 h-3 text-sky-600" />
                          <span>{t('shops.liveLocation')}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                          <Info className="w-3 h-3 text-amber-600" />
                          <span>{t('shops.sampleData')}</span>
                        </span>
                      )}
                    </div>

                    {/* Rating Badge (Only shown if rating exists!) */}
                    {shop.rating ? (
                      <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-2.5 py-1 rounded-xl shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-black text-amber-700 dark:text-amber-300">
                          {shop.rating}
                        </span>
                        {shop.reviewsCount ? (
                          <span className="text-[10px] text-amber-600/80">({shop.reviewsCount})</span>
                        ) : null}
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">{t('shops.ratingUnavailable')}</span>
                    )}
                  </div>

                  {/* Shop Name */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {getLocalizedShopName(shop)}
                  </h3>

                  {/* Address */}
                  {shop.address && (
                    <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{shop.address}</span>
                    </div>
                  )}

                  {/* Timings & Distance */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{shopTiming || t('shops.timingsUnavailable')}</span>
                    </div>

                    {shop.distance ? (
                      <div className="flex items-center gap-1 font-bold text-rose-600 dark:text-rose-400">
                        <Navigation className="w-3.5 h-3.5" />
                        <span>{shop.distance}</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">{t('shops.distanceUnavailable')}</span>
                    )}
                  </div>

                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  {phoneNum ? (
                    <a
                      href={`tel:${phoneNum}`}
                      className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>{phoneNum}</span>
                    </a>
                  ) : (
                    <div className="flex-1 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-xs font-semibold text-center italic">
                      {t('shops.phoneUnavailable')}
                    </div>
                  )}

                  {mapsUrl ? (
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-600/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{t('shops.directions')}</span>
                    </a>
                  ) : null}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
