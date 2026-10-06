import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import i18n from '../i18n/i18n';
import { SpeechService } from '../services/speech';

export interface Language {
  code: string;
  name: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'te', name: 'Telugu (తెలుగు)' },
  { code: 'hi', name: 'Hindi (हिंदी)' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
  { code: 'ta', name: 'Tamil (தமிழ்)' },
  { code: 'mr', name: 'Marathi (मराठी)' }
];

interface LanguageContextType {
  currentLang: string;
  changeLanguage: (langCode: string) => void;
  languages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<string>(() => {
    return localStorage.getItem('krishi_language') || i18n.language || 'en';
  });

  useEffect(() => {
    const savedLang = localStorage.getItem('krishi_language');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }

    const handleLanguageChange = (lng: string) => {
      setCurrentLang(lng);
      SpeechService.setLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    localStorage.setItem('krishi_language', langCode);
    i18n.changeLanguage(langCode);
  };

  return (
    <LanguageContext.Provider value={{ currentLang, changeLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};