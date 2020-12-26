import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    pink: "#f865b0",
    blue: "#bce7fd",
    yellow: "#f4d35e",
    darkYellow: "#cda30e",
    red: "#890620",
    green: "#4b543b",
    grey: "#342e37",
    black: "#071108",
    white: "#f0f0f0f0",
  },
  fontSize: {
    small: "1.4rem",
    normal: "1.6rem",
    medium: "1.8rem",
    big: "2rem",
    h1: "3.5rem",
  },
  mediaQueries: {
    medium: "only screen and (max-width: 73.75em)",
  },
};

export default theme;
