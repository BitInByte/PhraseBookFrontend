// Import libraries
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Import components
import H3 from "../ui/Typography/H3";

// Styles
const FooterWrapper = styled.div`
  width: 100%;
  height: 9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  border-radius: 2rem 2rem 0 0;
`;

// Interface
interface IProps {}

// Component
const Footer: React.FC<IProps> = () => {
  return (
    <FooterWrapper>
      <H3>Made With ❤️ by @BitInByte</H3>
    </FooterWrapper>
  );
};

// Prop types declaration
Footer.propTypes = {};

export default Footer;
