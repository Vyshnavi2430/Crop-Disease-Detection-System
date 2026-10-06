import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sprout, PhoneCall, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-white font-bold">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {t('appName')}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('footer.brandDesc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('footer.quickServices')}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/scanner" className="hover:text-emerald-400 transition-colors">{t('nav.scanner')}</Link></li>
              <li><Link to="/chat" className="hover:text-emerald-400 transition-colors">{t('nav.chat')}</Link></li>
              <li><Link to="/weather" className="hover:text-emerald-400 transition-colors">{t('nav.weather')}</Link></li>
              <li><Link to="/market" className="hover:text-emerald-400 transition-colors">{t('nav.market')}</Link></li>
              <li><Link to="/schemes" className="hover:text-emerald-400 transition-colors">{t('nav.schemes')}</Link></li>
            </ul>
          </div>

          {/* Agricultural Helpline */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('footer.farmerHelpline')}
            </h4>
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/50 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <PhoneCall className="w-4 h-4" />
                <span>{t('footer.kisanCallCenter')}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {t('footer.callCenterDesc')}
              </p>
              <a
                href="tel:18001801551"
                className="inline-flex items-center gap-1 text-xs text-emerald-300 font-semibold hover:underline"
              >
                <span>{t('footer.callNumber')}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Support & Accessibility */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {t('footer.accessibilityTitle')}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>{t('footer.encryptedSessions')}</span>
              </li>
              <li>{t('footer.supportedLangs')}</li>
              <li>{t('footer.screenReader')}</li>
              <li>{t('footer.contrastEnabled')}</li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>{t('footer.copyright')}</p>
          <p className="flex items-center gap-1">
            {t('footer.builtWithLove')} <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
