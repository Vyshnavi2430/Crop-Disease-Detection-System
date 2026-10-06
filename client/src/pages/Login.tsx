import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { Sprout, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!emailOrMobile || !password) {
      setError(t('auth.loginSubtitle'));
      return;
    }

    setLoading(true);
    try {
      const res = await authAPI.login({ emailOrMobile, password });
      const { token, ...userData } = res.data;
      login(userData, token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || t('auth.loginSubtitle'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-400 mx-auto flex items-center justify-center text-white shadow-lg shadow-emerald-600/30">
            <Sprout className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            {t('auth.loginTitle')}
          </h2>
          <p className="text-xs text-slate-500">
            {t('auth.loginSubtitle')}
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {t('auth.email')} / {t('auth.phone')}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={emailOrMobile}
                onChange={(e) => setEmailOrMobile(e.target.value)}
                placeholder="e.g. farmer@krishidrishti.ai or 9876543210"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {t('auth.password')}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-emerald-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-slate-600 dark:text-slate-400">{t('auth.rememberMe')}</span>
            </label>
            <Link to="/forgot-password" className="font-bold text-emerald-600 hover:underline">
              {t('auth.forgotPasswordLink')}
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {t('auth.loginBtn')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
          {t('auth.dontHaveAccount')}{' '}
          <Link to="/register" className="font-bold text-emerald-600 hover:underline">
            {t('auth.registerBtn')}
          </Link>
        </div>

      </div>
    </div>
  );
};
