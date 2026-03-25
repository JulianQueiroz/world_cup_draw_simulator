'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import { DefaultTheme, ThemeProvider as StyledThemeProvider } from 'styled-components';

import { themes } from '../themes';

type ThemeContextType = {
  theme: DefaultTheme;
  setTheme: (theme: DefaultTheme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProviderContext = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<DefaultTheme>(themes.darkTheme);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && themes[storedTheme]) {
      setTheme(themes[storedTheme]);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProviderContext');
  }
  return context;
};