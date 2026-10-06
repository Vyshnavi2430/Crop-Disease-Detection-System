import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { userAPI } from '../services/api';
import { CheckCircle2 } from 'lucide-react';
import { LanguageCode } from '../types';

export const ProfilePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, updateUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { largeText, toggleLargeText, highContrast, toggleHighContrast } = useAccessibility();

  const [name, setName] = useState(user?.name || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [preferredLanguage, setPreferredLanguage] = useState<LanguageCode>(user?.preferredLanguage || 'en');
  const [state, setState] = useState(user?.state || 'Andhra Pradesh');
  const [district, setDistrict] = useState(user?.district || 'Guntur');

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await userAPI.updateProfile({
        name,
        mobile,
        preferredLanguage,
        state,
        district
      });
      updateUser(res.data);
      i18n.changeLanguage(preferredLanguage);
      localStorage.setItem('krishi_language', preferredLanguage);
      setMessage(t('profile.saveChanges'));
    } catch (err: any) {
      console.warn('Profile update error:', err);
      setMessage(t('profile.saveChanges'));
      updateUser({ name, mobile, preferredLanguage, state, district });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex items-center gap-6">
        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-black shadow-inner">
          👨‍🌾
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black">{user?.name || t('profile.title')}</h1>
          <p className="text-xs text-emerald-100">{user?.email}</p>
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider mt-2">
            {t('profile.subtitle')}
          </span>
        </div>
      </div>

      {message && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Edit Form */}
      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
          {t('profile.personalInfo')}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {t('profile.name')}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {t('profile.phone')}
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {t('profile.state')}
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {t('profile.district')}
            </label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            {t('profile.preferredLang')}
          </label>
          <select
            value={preferredLanguage}
            onChange={(e) => setPreferredLanguage(e.target.value as LanguageCode)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
          >
            <option value="en">English</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="kn">ಕನ್ನಡ (Kannada)</option>
            <option value="ml">മലയാളം (Malayalam)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
        >
          {loading ? t('profile.saveChanges') : t('profile.saveChanges')}
        </button>
      </form>

      {/* Preferences & Accessibility Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
          {t('footer.accessibilityTitle')}
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">{t('accessibility.darkTheme')}</span>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              {theme === 'dark' ? t('accessibility.darkTheme') : t('accessibility.lightTheme')}
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">{t('accessibility.largeText')}</span>
            </div>
            <button
              onClick={toggleLargeText}
              className={`px-4 py-2 rounded-xl text-xs font-bold ${largeText ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}
            >
              {largeText ? t('accessibility.enabled', { defaultValue: 'Enabled' }) : t('accessibility.disabled', { defaultValue: 'Disabled' })}
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">{t('footer.contrastEnabled')}</span>
            </div>
            <button
              onClick={toggleHighContrast}
              className={`px-4 py-2 rounded-xl text-xs font-bold ${highContrast ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}
            >
              {highContrast ? t('accessibility.enabled', { defaultValue: 'Enabled' }) : t('accessibility.disabled', { defaultValue: 'Disabled' })}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
