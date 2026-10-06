import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { schemeAPI } from '../services/api';
import { GovernmentScheme } from '../types';
import { 
  Landmark, Search, Filter, ExternalLink, CheckCircle2, 
  FileText, Gift, UserCheck, RefreshCw, Sprout 
} from 'lucide-react';

export const GovernmentSchemes: React.FC = () => {
  const { t } = useTranslation();

  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchSchemes();
  }, [selectedState, selectedCategory, searchTerm]);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const res = await schemeAPI.getSchemes(selectedState, searchTerm, selectedCategory);
      setSchemes(res.data || []);
    } catch (err) {
      console.warn('Error fetching schemes:', err);
    } fontally: {
      setLoading(false);
    }
  };

  const categories = [
    { key: 'all', label: t('schemes.categories.all') },
    { key: 'crop', label: t('schemes.categories.crop') },
    { key: 'irrigation', label: t('schemes.categories.irrigation') },
    { key: 'insurance', label: t('schemes.categories.insurance') },
    { key: 'loans', label: t('schemes.categories.loans') },
    { key: 'subsidies', label: t('schemes.categories.subsidies') },
    { key: 'women', label: t('schemes.categories.women') },
    { key: 'dairy', label: t('schemes.categories.dairy') },
    { key: 'fisheries', label: t('schemes.categories.fisheries') }
  ];

  const states = [
    { key: 'all', label: t('schemes.allStates') },
    { key: 'Andhra Pradesh', label: t('data.states.Andhra Pradesh', { defaultValue: 'Andhra Pradesh' }) },
    { key: 'Telangana', label: t('data.states.Telangana', { defaultValue: 'Telangana' }) },
    { key: 'Karnataka', label: t('data.states.Karnataka', { defaultValue: 'Karnataka' }) },
    { key: 'Tamil Nadu', label: t('data.states.Tamil Nadu', { defaultValue: 'Tamil Nadu' }) },
    { key: 'Kerala', label: t('data.states.Kerala', { defaultValue: 'Kerala' }) },
    { key: 'Maharashtra', label: t('data.states.Maharashtra', { defaultValue: 'Maharashtra' }) }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 px-2 sm:px-4">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800 text-purple-800 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
          <Landmark className="w-4 h-4" />
          <span>{t('schemes.badge')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100">
          {t('schemes.title')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          {t('schemes.subtitle')}
        </p>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* State Filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
              {t('schemes.selectState')}
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
            >
              {states.map((st) => (
                <option key={st.key} value={st.key}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div className="space-y-1">
            <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
              {t('schemes.title')}
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('schemes.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

        </div>

        {/* Category Tabs Scrollbar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                selectedCategory === cat.key
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <RefreshCw className="w-8 h-8 text-purple-500 animate-spin" />
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            {t('schemes.loading')}
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && schemes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
          <Filter className="w-10 h-10 text-slate-400" />
          <p className="text-base font-bold text-slate-800 dark:text-slate-200">
            {t('schemes.noData')}
          </p>
        </div>
      )}

      {/* Scheme Cards Grid */}
      {!loading && schemes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schemes.map((scheme) => {
            const schemeId = scheme.schemeId;
            const translatedObj = t(`data.schemes.${schemeId}`, { returnObjects: true }) as any;
            const title = (translatedObj && typeof translatedObj === 'object' && translatedObj.title) || scheme.title;
            const overview = (translatedObj && typeof translatedObj === 'object' && translatedObj.overview) || scheme.overview;
            const benefits: string[] = (translatedObj && typeof translatedObj === 'object' && Array.isArray(translatedObj.benefits)) ? translatedObj.benefits : (scheme.benefits || []);
            const eligibility: string[] = (translatedObj && typeof translatedObj === 'object' && Array.isArray(translatedObj.eligibility)) ? translatedObj.eligibility : (scheme.eligibility || []);
            const documentsRequired: string[] = (translatedObj && typeof translatedObj === 'object' && Array.isArray(translatedObj.documents)) ? translatedObj.documents : (scheme.documentsRequired || []);
            const stateBadge = scheme.state ? t(`data.states.${scheme.state}`, { defaultValue: scheme.state }) : t('data.states.All India', { defaultValue: 'All India' });
            const categoryBadge = t(`schemes.categories.${scheme.category}`, { defaultValue: scheme.category });

            return (
              <div
                key={scheme.schemeId}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-5 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  
                  {/* Title & Badge */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 text-[10px] font-black uppercase tracking-wider">
                        {stateBadge}
                      </span>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                        {categoryBadge}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {overview}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                    <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-purple-500" />
                      <span>{t('schemes.benefits')}</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      {benefits.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Eligibility */}
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                      <span>{t('schemes.eligibility')}</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 font-medium">
                      {eligibility.map((e, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5"></span>
                          <span>{e}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Documents Required */}
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-500" />
                      <span>{t('schemes.documents')}</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {documentsRequired.map((doc, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-purple-600/20"
                  >
                    <span>{t('schemes.applyBtn')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
