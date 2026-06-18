import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { lightColors, darkColors } from './colors';

const THEME_KEY = 'sam-biblioteca-dark-mode';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored !== null) {
        setIsDark(stored === 'true');
      }
    }
  }, []);

  const setDarkMode = (value) => {
    setIsDark(value);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(THEME_KEY, String(value));
    }
  };

  const value = useMemo(
    () => ({
      isDark,
      colors: isDark ? darkColors : lightColors,
      setDarkMode,
      toggleDarkMode: () => setDarkMode(!isDark),
    }),
    [isDark],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
