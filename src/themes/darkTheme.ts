import { iTheme } from './iThemes';
import commonTheme from './commonTheme';

const theme: iTheme = {
  ...commonTheme,

  primaryBackground: '#2D2D2D' /* Zinc */,
  secondaryBackground: '#383838' /* Medium Zinc */,

  opacitybackground100: '#FFFFFF05' /*white with 5% opacity*/,

  primaryColor: '#FFFFFF' /* white */,
  secondaryColor: '#FFFFFF' /* white */,

  dayBorder: '#2D2D2D',
  gray2: '#7c7c7c',
  neutral: '#949494' /* Light Zinc */,
  neutral2: '#949494' /* Light Zinc */,
  neutral3: '#FFFFFF' /* White */,
  neutral4: '#FFFFFF' /* White */,
  neutral5: '#949494' /* Light Zinc */,
  neutral6: '#949494' /* Light Zinc */,
  neutral7: '#383838' /* Medium Zinc */,
  neutral8: '#1E1E1E85' /* darkZinc with opacity 85% */,
  neutral9: '#5D4F9125' /* dark lavander with opacity 15%*/,
  neutral10: '#5D4F91' /* dark lavander */,
  neutral11: '#383838' /* Medium Zinc */,
  neutral12: '#262626',
  neutral13: '#FFFFFF' /* white */,
  neutral14: '#1E1E1E' /* darkZinc */,
  neutral15: '#949494' /* Light Zinc */,
  neutral16: '#1E1E1E' /* darkZinc */,

  primaryHover: 'linear-gradient(90deg, #5228EF25, #BF1FF825)' /* gradient violet with 25% opacity */,
  secondaryHover: 'linear-gradient(90deg, #5228EF, #BF1FF8)' /* gradient violet with 100% opacity */,

  opacityHover100: '#5228EF80' /*Violet with 80% opacity*/,
  opacityHover200: '#FFFFFF05' /*white with 5% opacity*/,
  opacityHover300: '#5228EF25' /*white with 5% opacity*/,
  opacityHover400: '#00000020' /*dark with 20% opacity*/,
  opacityHover500: 'linear-gradient(90deg, rgba(82, 40, 239, 0.25) 0%, rgba(191, 31, 248, 0.25) 100%)' /* Linear violet gradient */,
  opacityHover600: '#5228EF15' /*  violet 25% */,
};

export default theme;
