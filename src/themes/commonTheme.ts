import { iCommonTheme } from './iThemes';

const commonTheme: iCommonTheme = {
  commonColors: {
    primary: '#000000' /*Black*/,
    second: '#FFFFFF' /*White*/,

    error: '#E23932' /*red*/,
    error25: '#E2393225' /*red*/,
    warning: '#FF8F51' /*orange*/,
    warning25: '#FF8F5125',
    alert: '#FECB17' /*yellow*/,
    alert25: '#FECB1725' /*yellow with opacity 25%*/,
    success: '#38CD62' /*green*/,
    success25: '#38CD6224' /*green with opacity 25%* */,

    lightZinc: '#949494' /* lightZinc*/,
    darkZinc: '#1E1E1E' /* darkZinc*/,
    darkZinc25: '#1E1E1E25' /* darkZinc with opacity 25% */,

    highlight: '#5228EF' /* violet */,
    neutralSurface: '#BF1FF8' /*vivid mulberry*/,
    neutralSurface25: '#BF1FF825' /*vivid mulberry*/,

    neutral25: '#00000025' /*Black opacity 25%*/,

    primaryGradient: 'linear-gradient(90deg, #5228EF 0%, #BF1FF8 100%)' /* Linear gradient violet and vivid mulberry */,
    secondaryGradient: 'linear-gradient(90deg, #EF2828 0%, #FE7817 100%)' /* Linear gradient red and orange */,

    radialGradient: 'radial-gradient(60.26% 205.78% at 50% 50%, #5228EF 0%, #BF1FF8 70.16%, #949494 100%)',

    opacitybackground100: '#5228EF40' /*violet with opacity 40%*/,
    opacitybackground200: '#5228EF90' /*violet with opacity 80%*/,
    opacitybackground300: '#5228EF25' /*violet with opacity 25%*/,
  },
  fonts: {
    helveticaExtraBold: 'HelveticaNowforMonksExtraBold',
    helveticaBold: 'HelveticaNowforMonksBold',
    helveticaMedium: 'HelveticaNowforMonksMedium',
    sizer: {
      sm: '0.625rem',
      md: '0.75rem',
      lg: '0.875rem',
      xl: '1rem',
      xxl: '1.5rem',
      xxxl: '3rem',
      xxxxl: '6rem',
    },
    lineHeight: {
      sm: '0.75rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
      xxxl: '4rem',
    },
  },
  borderRadius: {
    sm: '0.25rem',
    xl: '1.5rem',
    xxl: '4rem',
  },
  gap: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
};

export default commonTheme;
