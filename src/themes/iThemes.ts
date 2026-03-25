export interface iTheme extends iCommonTheme {
  primaryBackground: string;
  secondaryBackground: string;

  opacitybackground100: string;

  primaryColor: string;
  secondaryColor: string;

  dayBorder: string;
  gray2: string;
  neutral: string;
  neutral2: string;
  neutral3: string;
  neutral4: string;
  neutral5: string;
  neutral6: string;
  neutral7: string;
  neutral8: string;
  neutral9: string;
  neutral10: string;
  neutral11: string;
  neutral12: string;
  neutral13: string;
  neutral14: string;
  neutral15: string;
  neutral16: string;

  primaryHover: string;
  secondaryHover: string;
  opacityHover100: string;
  opacityHover200: string;
  opacityHover300: string;
  opacityHover400: string;
  opacityHover500: string;
  opacityHover600: string;
}

export interface iCommonTheme {
  commonColors: {
    primary: string;
    second: string;

    error: string;
    error25: string;
    warning: string;
    warning25: string;
    alert: string;
    alert25: string;
    success: string;
    success25: string;

    lightZinc: string;
    darkZinc: string;
    darkZinc25: string;

    highlight: string;
    neutralSurface: string;
    neutralSurface25: string;

    neutral25: string;

    primaryGradient: string;
    secondaryGradient: string;

    radialGradient: string;

    opacitybackground100: string;
    opacitybackground200: string;
    opacitybackground300: string;
  };
  fonts: {
    helveticaExtraBold: string;
    helveticaBold: string;
    helveticaMedium: string;
    sizer: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
      xxxxl: string;
    };
    lineHeight: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
  };
  borderRadius: {
    sm: string;
    xl: string;
    xxl: string;
  };
  gap: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
}
