// Import libraries
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

// Styles
const LogoWord = styled.p`
  //@import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");
  //@font-face {
  //  font-family: "Fredoka One";
  //  font-style: normal;
  //  font-weight: 400;
  //  font-display: swap;
  //  src: url(https://fonts.gstatic.com/s/fredokaone/v8/k3kUo8kEI-tA1RRcTZGmTlHGCaen8wf-.woff2)
  //    format("woff2");
  //  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
  //    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
  //    U+2215, U+FEFF, U+FFFD;
  //}
  font-size: 3rem;
  font-family: "Fredoka One", sans-serif;
  color: ${props => props.theme.colors.yellow};
  text-transform: uppercase;
  margin: 0.5rem;
  font-weight: 400;
  //text-shadow: -0.1rem -0.1rem 0 ${props => props.theme.colors.yellow};
  // Only apply the following styles if browser supports it
  @supports (
    -webkit-text-stroke: 0.1rem ${props => props.theme.colors.darkYellow}
  ) {
    -webkit-text-stroke: 0.1rem ${props => props.theme.colors.darkYellow};
  }
`;

// Interface
interface IProps {}

// Component
const Logo: React.FC<IProps> = React.memo(() => {
  console.log("£££££££Rendering logo");

  return (
    <Link to="/">
      <LogoWord>Phrasebook</LogoWord>
    </Link>
  );
});

// Prop types declaration
Logo.propTypes = {};

export default Logo;
