import { createGlobalStyle } from 'styled-components';

const globalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');

  //     === RESETS === 
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  a:active,
  a:hover {
    outline: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  li {
    display: block;
  }

  button {
    outline: none;
    border: none;
    background-color: transparent;

  }
  
//  ====== UNIVERSAL PROPERTIES ======
  html {
    font-size: 62.5%; // 1rem = 10px; 10px/16px = 62.5%
  }


  body {
    box-sizing: border-box;
    font-family: 'Jura', sans-serif;
    font-weight: normal;
    word-wrap: break-word;
    font-kerning: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  main {
  }

  code {
    font-family: "Cascadia Code PL", source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
`;

export default globalStyle;