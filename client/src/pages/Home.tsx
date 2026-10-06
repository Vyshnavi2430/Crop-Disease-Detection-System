import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ScanLine, Bot, CloudSun, Landmark, ShoppingBag, PhoneCall, 
  Sparkles, ArrowRight, Sprout
} from 'lucide-react';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const quickServices = [
    { title: t('nav.scanner'), desc: t('home.scannerDesc'), path: '/scanner', icon: ScanLine, color: 'from-emerald-500 to-green-600' },
    { title: t('nav.chat'), desc: t('home.chatDesc'), path: '/chat', icon: Bot, color: 'from-blue-500 to-indigo-600' },
    { title: t('nav.weather'), desc: t('home.weatherDesc'), path: '/weather', icon: CloudSun, color: 'from-amber-500 to-orange-600' },
    { title: t('nav.market'), desc: t('home.marketDesc'), path: '/market', icon: ShoppingBag, color: 'from-teal-500 to-emerald-600' },
    { title: t('nav.schemes'), desc: t('home.schemesDesc'), path: '/schemes', icon: Landmark, color: 'from-purple-500 to-indigo-600' },
    { title: t('nav.shops'), desc: t('home.shopsDesc'), path: '/shops', icon: ShoppingBag, color: 'from-rose-500 to-pink-600' }
  ];

  return (
    <div className="space-y-16 py-6">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-green-950 to-slate-950 text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-green-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t('hero.badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
            {t('hero.title')}
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => navigate('/scanner')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-400 text-slate-950 font-black text-base hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl shadow-emerald-500/30 flex items-center gap-3"
            >
              <ScanLine className="w-6 h-6" />
              <span>{t('hero.scanButton')}</span>
            </button>

            <button
              onClick={() => navigate('/chat')}
              className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 backdrop-blur-md transition-all duration-200 flex items-center gap-3"
            >
              <Bot className="w-6 h-6 text-emerald-400" />
              <span>{t('hero.assistantButton')}</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400">95%+</span>
              <span className="text-xs text-emerald-200 block font-medium">{t('hero.accuracyMetric')}</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-amber-400">6</span>
              <span className="text-xs text-emerald-200 block font-medium">{t('hero.languagesMetric')}</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400">24/7</span>
              <span className="text-xs text-emerald-200 block font-medium">{t('hero.guidanceMetric')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            {t('home.servicesTitle')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t('home.servicesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(service.path)}
                className="group cursor-pointer bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${service.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                  <span>{t('home.exploreFeature')}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Daily Tip Banner */}
      <section className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 rounded-3xl p-6 sm:p-8 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">{t('home.dailyTipBadge')}</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{t('home.dailyTipTitle')}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              {t('home.dailyTipDesc')}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs whitespace-nowrap shadow-md transition-all"
        >
          {t('home.dailyTipButton')}
        </button>
      </section>

      {/* Emergency Helpline Banner */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0">
            <PhoneCall className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">{t('home.helplineTitle')}</h3>
            <p className="text-xs text-slate-400">
              {t('home.helplineDesc')}
            </p>
          </div>
        </div>
        <Link
          to="/helpline"
          className="px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all"
        >
          {t('home.helplineButton')}
        </Link>
      </section>

    </div>
  );
};
