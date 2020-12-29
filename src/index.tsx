import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";
import { BrowserRouter } from "react-router-dom";
// import './index.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./theme/globalStyles";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Helmet>
          <title>
            Phrasebook | A place where you can find motivation for yourself
          </title>
          <meta
            name="description"
            content="The social network for people that want to find a bit more of motivation in their lives. Connect yourself and inspire others! Made with ❤️ by @bitinbyte"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#f865b0" />
          {/*    Missing link canocical https://github.com/fidalgodev/movie-library-react/blob/master/src/index.js  */}
        </Helmet>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
