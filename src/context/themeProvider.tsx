'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { useEffect, useMemo, useState } from 'react';

import lightTheme from '@/themes/lightTheme';
import darkTheme from '@/themes/darkTheme';

function StyledThemeBridge({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedTheme = useMemo(() => {
    return resolvedTheme === 'dark' ? darkTheme : lightTheme;
  }, [resolvedTheme]);

  if (!mounted) return null;

  return <StyledThemeProvider theme={selectedTheme}>{children}</StyledThemeProvider>;
}

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <StyledThemeBridge>{children}</StyledThemeBridge>
    </NextThemesProvider>
  );
}