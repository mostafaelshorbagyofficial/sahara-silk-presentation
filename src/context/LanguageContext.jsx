import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRESENTATION_DATA } from '../data/presentationData';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [isSwitching, setIsSwitching] = useState(false);

  // Sync html attributes whenever language changes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    if (isSwitching) return;
    setIsSwitching(true);
    
    // Smooth 350-400ms transition as requested in spec
    setTimeout(() => {
      setLanguage(prev => prev === 'en' ? 'ar' : 'en');
      setTimeout(() => {
        setIsSwitching(false);
      }, 150);
    }, 250);
  };

  const setSpecificLanguage = (lang) => {
    if (lang === language || isSwitching) return;
    setIsSwitching(true);
    setTimeout(() => {
      setLanguage(lang);
      setTimeout(() => {
        setIsSwitching(false);
      }, 150);
    }, 250);
  };

  const t = PRESENTATION_DATA[language];
  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{
      language,
      isRTL,
      isSwitching,
      toggleLanguage,
      setSpecificLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
