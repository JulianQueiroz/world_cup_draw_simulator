'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  @font-face {
    font-family: 'HelveticaNowforMonksExtraBold';
    src: url('/fonts/HelveticaNowforMonksExtraBold.otf') format('opentype');
  }

  @font-face {
    font-family: 'HelveticaNowforMonksBold';
    src: url('/fonts/HelveticaNowforMonksBold.otf') format('opentype');
  }

  @font-face {
    font-family: 'HelveticaNowforMonksMedium';
    src: url('/fonts/HelveticaNowforMonksMedium.otf') format('opentype');
  }

  html,
  body {
    max-width: 100vw;
  }

  .noscroll {
    overflow-y: hidden;
  }

  body {
    color: ${({ theme }) => theme.commonColors.second};;
    background: ${({ theme }) => theme.primaryBackground};
    font-family: HelveticaNowforMonksMedium, sans-serif;
    position: relative;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  p {
    margin: 0px;
  }

  ul,
  li {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }

img {
  height: auto;
  display: block;
  max-width: 100%;
}

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.commonColors.neutral25};
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.secondaryBackground};
    border-radius: 10px;
  }
`;

export default GlobalStyle;
