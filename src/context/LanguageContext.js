import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getContentLanguage,
  getTranslations,
} from '../translations/translations';

const LanguageContext = createContext(null);

const LANGUAGE_KEY = '@app_language';
const SUPPORTED = ['hindi', 'english'];

function normalizeLanguage(saved) {
  if (saved === 'hinglish') {
    return 'english';
  }
  return SUPPORTED.includes(saved) ? saved : null;
}

export const LanguageProvider = ({children}) => {
  const [language, setLanguageState] = useState('hindi');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (!mounted || !saved) {
          return;
        }
        const next = normalizeLanguage(saved);
        if (!next) {
          return;
        }
        setLanguageState(next);
        if (next !== saved) {
          await AsyncStorage.setItem(LANGUAGE_KEY, next);
        }
      } catch (error) {
        console.warn('Error loading language:', error);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const changeLanguage = useCallback(async lang => {
    if (!SUPPORTED.includes(lang)) {
      return;
    }
    try {
      setLanguageState(lang);
      await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    } catch (error) {
      console.warn('Error saving language:', error);
    }
  }, []);

  const t = useMemo(() => getTranslations(language), [language]);
  const contentLanguage = useMemo(
    () => getContentLanguage(language),
    [language],
  );

  const value = useMemo(
    () => ({language, contentLanguage, changeLanguage, t}),
    [language, contentLanguage, changeLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
