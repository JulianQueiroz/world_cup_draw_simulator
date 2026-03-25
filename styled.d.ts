import 'styled-components';
import { iTheme } from './src/themes/iThemes';

declare module 'styled-components' {
  export interface DefaultTheme extends iTheme { }
}
