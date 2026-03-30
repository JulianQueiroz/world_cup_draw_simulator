'use client';

import { DefaultTheme } from 'styled-components';

import darkTheme from './darkTheme';
import lightTheme from './lightTheme';

type ThemesObj = {
  [key: string]: DefaultTheme;
};

const themes: ThemesObj = {
  lightTheme: lightTheme,
  darkTheme: darkTheme,
};

export { themes };
