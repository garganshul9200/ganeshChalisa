import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import {getThemeColors} from '../constants/colors';

const ThemeContext = createContext(null);

export const ThemeProvider = ({children}) => {
  const [theme, setThemeState] = useState('light');

  const setTheme = useCallback(mode => {
    if (mode !== 'light' && mode !== 'dark') {
      return;
    }
    setThemeState(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const colors = useMemo(() => getThemeColors(theme), [theme]);

  const value = useMemo(
    () => ({theme, setTheme, toggleTheme, colors}),
    [theme, setTheme, toggleTheme, colors],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
};
