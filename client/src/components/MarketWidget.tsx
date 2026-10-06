import React from 'react';
import { useTranslation } from 'react-i18next';
import { MarketPrice } from '../types';
import { TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MarketWidgetProps {
  prices: MarketPrice[];
}

export const MarketWidget: React.FC<MarketWidgetProps> = ({ prices }) => {
  const { t } = useTranslation();

  const formatUnit = (unitStr?: string) => {
    if (!unitStr) return '';
    const lower = unitStr.trim().toLowerCase();
    if (lower === 'quintal' || lower === 'quintals') return t('market.quintals');
    if (lower === 'bag' || lower === 'bags') return t('market.bags');
    if (lower === 'box' || lower === 'boxes') return t('market.boxes');
    if (lower === 'bunch' || lower === 'bunches') return t('market.bunch');
    return unitStr;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">{t('market.liveTitle')}</h3>
          <p className="text-xs text-slate-500">{t('market.todayRates')}</p>
        </div>
        <Link to="/market" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
          <span>{t('market.viewAll')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {prices.slice(0, 4).map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                {t(`data.crops.${item.crop}`, { defaultValue: item.crop })}
              </span>
              <span className="text-[11px] text-slate-500">
                {t(`data.markets.${item.market}`, { defaultValue: item.market })} ({t(`data.states.${item.state}`, { defaultValue: item.state })})
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm font-black text-emerald-700 dark:text-emerald-400 block">
                ₹{item.modalPrice} / {formatUnit(item.unit)}
              </span>
              <div className="flex items-center justify-end gap-1 text-[10px] font-bold">
                {item.trend === 'up' && (
                  <span className="text-emerald-600 flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" />{item.change}</span>
                )}
                {item.trend === 'down' && (
                  <span className="text-rose-600 flex items-center"><TrendingDown className="w-3 h-3 mr-0.5" />{item.change}</span>
                )}
                {item.trend === 'stable' && (
                  <span className="text-slate-400 flex items-center"><Minus className="w-3 h-3 mr-0.5" />{t('market.stable')}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
