import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { SpeechService } from '../services/speech';
import { 
  Sprout, Sun, Moon, Volume2, VolumeX, Type, Languages, 
  Menu, X, User, LogOut, LayoutDashboard, ScanLine, 
  Bot, CloudSun, Landmark, ShoppingBag, PhoneCall, History
} from 'lucide-react';
import { LanguageCode } from '../types';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { largeText, toggleLargeText } = useAccessibility();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isReadingPage, setIsReadingPage] = useState(false);

  useEffect(() => {
    setIsReadingPage(false);
  }, [i18n.language]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as LanguageCode;
    i18n.changeLanguage(lang);
    localStorage.setItem('krishi_language', lang);
  };

  const handleReadPage = () => {
    if (isReadingPage) {
      SpeechService.stopSpeaking();
      setIsReadingPage(false);
    } else {
      setIsReadingPage(true);
      SpeechService.readCurrentPage(i18n.language, () => {
        setIsReadingPage(false);
      });
    }
  };

  const navItems = [
    { label: t('nav.home'), path: '/', icon: Sprout },
    { label: t('nav.dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { label: t('nav.scanner'), path: '/scanner', icon: ScanLine },
    { label: t('nav.chat'), path: '/chat', icon: Bot },
    { label: t('nav.weather'), path: '/weather', icon: CloudSun },
    { label: t('nav.schemes'), path: '/schemes', icon: Landmark },
    { label: t('nav.market'), path: '/market', icon: ShoppingBag },
    { label: t('nav.shops'), path: '/shops', icon: ShoppingBag },
    { label: t('nav.helpline'), path: '/helpline', icon: PhoneCall }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-emerald-100 dark:border-slate-800 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-400 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-7 h-7" />
            </div>
            <div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-emerald-800 via-green-600 to-emerald-500 dark:from-emerald-400 dark:to-green-300 bg-clip-text text-transparent tracking-tight">
                {t('appName')}
              </span>
              <span className="block text-xs font-medium text-emerald-700 dark:text-emerald-400">
                {t('hero.badge')}
              </span>
            </div>
          </Link>

          {/* Desktop Controls & Language */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Language Selector Dropdown */}
            <div className="relative flex items-center bg-emerald-100/60 dark:bg-slate-800/80 rounded-xl px-3 py-1.5 border border-emerald-200/50 dark:border-slate-700">
              <Languages className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mr-2" />
              <select
                value={i18n.language}
                onChange={handleLanguageChange}
                aria-label="Select Preferred Language"
                className="bg-transparent text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer pr-2"
              >
                <option value="en">English</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="ml">മലയാളം (Malayalam)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
            </div>

            {/* Read Page Button */}
            <button
              onClick={handleReadPage}
              className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                isReadingPage 
                  ? 'bg-amber-500 text-white animate-pulse shadow-md shadow-amber-500/30'
                  : 'bg-emerald-600/10 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-600/20'
              }`}
              title={isReadingPage ? t('accessibility.stopReading') : t('accessibility.readPage')}
            >
              {isReadingPage ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isReadingPage ? t('accessibility.stopReading') : t('accessibility.readPage')}</span>
            </button>

            {/* Large Text Toggle */}
            <button
              onClick={toggleLargeText}
              className={`p-2 rounded-xl border transition-all ${
                largeText 
                  ? 'bg-emerald-600 text-white border-emerald-600' 
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700'
              }`}
              title={t('accessibility.largeText')}
            >
              <Type className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-all"
              title={theme === 'dark' ? t('accessibility.lightTheme') : t('accessibility.darkTheme')}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Auth State Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.name || t('profile.title')}</span>
                </Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="p-2.5 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-950/40 dark:text-rose-400 transition-all"
                  title={t('nav.logout')}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100/50 dark:hover:bg-slate-800 px-3.5 py-2 rounded-xl transition-all"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}

          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handleReadPage}
              className="p-2 rounded-lg bg-emerald-100 dark:bg-slate-800 text-emerald-800 dark:text-emerald-300"
            >
              {isReadingPage ? <VolumeX className="w-5 h-5 text-amber-500 animate-bounce" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-emerald-600 text-white shadow-md focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Sub Navigation Bar for Core Agricultural Features */}
      <nav className="hidden lg:block bg-emerald-800/90 dark:bg-slate-900 border-t border-emerald-700/50 dark:border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between space-x-1 py-2 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-white text-emerald-900 font-bold shadow-sm'
                      : 'text-emerald-100 hover:bg-emerald-700/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-emerald-600" />
              <select
                value={i18n.language}
                onChange={handleLanguageChange}
                className="bg-slate-100 dark:bg-slate-800 text-sm font-semibold rounded-lg px-2 py-1"
              >
                <option value="en">English</option>
                <option value="te">తెలుగు</option>
                <option value="hi">हिन्दी</option>
                <option value="ta">தமிழ்</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="ml">മലയാളം</option>
                <option value="mr">मराठी</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleLargeText}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                <Type className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-emerald-50 dark:hover:bg-slate-700"
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {user?.name}
                </span>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); navigate('/'); }}
                  className="text-xs text-rose-600 font-bold px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40"
                >
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-xs font-bold py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center text-xs font-bold py-2 rounded-xl bg-emerald-600 text-white"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
