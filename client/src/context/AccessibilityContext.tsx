import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  largeText: boolean;
  highContrast: boolean;
  toggleLargeText: () => void;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [largeText, setLargeText] = useState<boolean>(() => {
    return localStorage.getItem('krishi_large_text') === 'true';
  });

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('krishi_high_contrast') === 'true';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (largeText) {
      root.classList.add('large-text-mode');
    } else {
      root.classList.remove('large-text-mode');
    }
    localStorage.setItem('krishi_large_text', String(largeText));
  }, [largeText]);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast-mode');
    } else {
      root.classList.remove('high-contrast-mode');
    }
    localStorage.setItem('krishi_high_contrast', String(highContrast));
  }, [highContrast]);

  const toggleLargeText = () => setLargeText(prev => !prev);
  const toggleHighContrast = () => setHighContrast(prev => !prev);

  return (
    <AccessibilityContext.Provider value={{ largeText, highContrast, toggleLargeText, toggleHighContrast }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
