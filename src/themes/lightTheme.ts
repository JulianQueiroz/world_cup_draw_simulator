import commonTheme from './commonTheme';
import { iTheme } from './iThemes';

const theme: iTheme = {
  ...commonTheme,

  primaryBackground: '#FFFFFF' /*White*/,
  secondaryBackground: '#EBEBEB' /*Gray*/,

  opacitybackground100: '#FFFFFF',

  primaryColor: '#1E1E1E' /*Dark Zinc*/,
  secondaryColor: '#5228EF' /*violet*/,

  dayBorder: '#EBEBEB',
  gray2:'#7c7c7c',
  neutral: '#949494' /*Light Zinc*/,
  neutral2: '#EBEBEB' /* Gray */,
  neutral3: '#EBEBEB' /* Gray */,
  neutral4: '#949494' /* Light Zinc */,
  neutral5: '#5228EF' /* violet */,
  neutral6: '#5228EF20' /* violet 20%*/,
  neutral7: '#5228EF20' /* violet 20%*/,
  neutral8: '#1E1E1E25' /* darkZinc with opacity 25% */,
  neutral9: '#DCD4FC' /* Lavender blue */,
  neutral10: '#DCD4FC' /* Lavender blue */,
  neutral11: '#EBEBEB' /* Light Zinc */,
  neutral12: '#E4E3E3',
  neutral13: '#949494' /*Light Zinc*/,
  neutral14: '#EBEBEB' /* Gray */,
  neutral15: '#1E1E1E' /*Dark Zinc*/,
  neutral16: '#FFFFFF' /* darkZinc */,

  primaryHover: '#DCD4FC',
  secondaryHover: '#DCD4FC',
  opacityHover100: '#DCD4FC',
  opacityHover200: '#5228EF20',
  opacityHover300: '#DCD4FC',
  opacityHover400: '#00000015' /* dark with 15% opacity*/,
  opacityHover500: '#5228EF25' /* violet with 25% opacity*/,
  opacityHover600: '#5228EF25' /*  violet 15% */,
};

export default theme;
