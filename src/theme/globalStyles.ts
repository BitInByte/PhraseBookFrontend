import { createGlobalStyle } from "styled-components";

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
    cursor: pointer;
  }

  li {
    display: block;
  }

  button {
    outline: none;
    border: none;
    background-color: transparent;

  }

  input {
    outline: none;
    border: none;
  }

//  ====== UNIVERSAL PROPERTIES ======
  html {
    font-size: 62.5%; // 1rem = 10px; 10px/16px = 62.5%
  }


  body {
    font-size: 1.6rem;
    box-sizing: border-box;
    font-family: 'Jura', sans-serif;
    font-weight: normal;
    word-wrap: break-word;
    font-kerning: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  main {
    width: 100%;
  }

  code {
    font-family: "Cascadia Code PL", source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  header {
    width: 100vw;
    display: block;
  }

  footer {
    min-height: 100%;
  }

  section {
    width: 100%;
    min-height: calc(100vh - (9rem + 7.6rem));
    display: flex;
    justify-content: center;
  }

//  ====== FONTS ======
  @font-face {
    font-family: "Fredoka One";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/fredokaone/v8/k3kUo8kEI-tA1RRcTZGmTlHGCaen8wf-.woff2)
    format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
    U+2215, U+FEFF, U+FFFD;
  }

//  ====== CSS TRANSITION GROUP GLOBAL STYLES ======
  .slide-in-left-enter {
    transform: translateX(-100%);
  }

  .slide-in-left-enter-active {
    transform: translateX(0);
    opacity: 1;
    transition: all 500ms;
  }

  .slide-in-left-exit {
    transform: translateX(0%);
    opacity: 1;
  }

  .slide-in-left-exit-active {
    transform: translateX(-100%);
    opacity: 0;
    transition: all 500ms;
  }

  .modal-enter {
    transform: translateY(-10rem);
    opacity: 0;
  }

  .modal-enter-active {
    transform: translateY(0);
    opacity: 1;
    transition: all 200ms;
  }

  .modal-exit {
    transform: translateY(0);
    opacity: 1;
  }

  .modal-exit-active {
    transform: translateY(-10rem);
    opacity: 0;
    transition: all 200ms;
  }

  .opacity-enter {
    // transform: translateX(-100%);
    opacity: 0;
  }

  .opacity-enter-active {
    // transform: translateX(0);
    opacity: 1;
    transition: all 500ms;
  }

  .opacity-exit {
    // transform: translateX(0%);
    opacity: 1;
  }

  .opacity-exit-active {
    // transform: translateX(-100%);
    opacity: 0;
    transition: all 500ms;
  }
`;

export default globalStyle;
