import React from 'react';
import { useTranslation } from 'react-i18next';
import { PhoneCall } from 'lucide-react';

export const HelplinePage: React.FC = () => {
  const { t } = useTranslation();

  const emergencyContacts = [
    {
      title: t('helpline.kisanCenterTitle'),
      number: '1551',
      fullNumber: '1800-180-1551',
      desc: t('helpline.kisanCenterDesc'),
      color: 'from-emerald-600 to-green-600'
    },
    {
      title: t('helpline.financialHelpline'),
      number: '155261',
      fullNumber: '011-24300606',
      desc: t('home.schemesDesc'),
      color: 'from-purple-600 to-indigo-600'
    },
    {
      title: t('helpline.vetCare'),
      number: '1962',
      fullNumber: '1962',
      desc: t('helpline.vetCare'),
      color: 'from-amber-600 to-orange-600'
    },
    {
      title: t('helpline.weatherEmergency'),
      number: '1078',
      fullNumber: '011-26701728',
      desc: t('weather.alertsTitle'),
      color: 'from-rose-600 to-pink-600'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-bold uppercase tracking-wider">
          <PhoneCall className="w-4 h-4" />
          <span>{t('helpline.title')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100">
          {t('helpline.title')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          {t('helpline.subtitle')}
        </p>
      </div>

      {/* Emergency Contacts Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {emergencyContacts.map((contact, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{contact.title}</h3>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
                  {t('helpline.tollFree', { defaultValue: 'Toll Free' })}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {contact.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <a
                href={`tel:${contact.number}`}
                className={`w-full py-3 px-4 rounded-2xl bg-gradient-to-r ${contact.color} text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform`}
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t('helpline.callNow')} ({contact.number})</span>
              </a>
              <span className="block text-[10px] text-center text-slate-400 font-medium">
                {t('footer.callNumber')}: {contact.fullNumber}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
