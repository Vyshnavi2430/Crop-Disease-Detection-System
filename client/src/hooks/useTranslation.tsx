import { useTranslation as useI18nTranslation } from 'react-i18next';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  const currentLang = i18n.language;

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('krishi_language', lang);
  };

  return { t, i18n, currentLang, changeLanguage };
};