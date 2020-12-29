// Import libraries
import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

// Import components

// Styles
interface IStyled {
  isFilled?: boolean;
}

const ButtonStyles = styled.button<IStyled>`
  padding: 1rem 1.3rem;
  background: ${props => (props.isFilled ? props.theme.colors.pink : "none")};
  border: ${({ isFilled, theme }) => {
    if (isFilled) return ".2rem solid transparent";
    else return `.2rem solid ${theme.colors.pink}`;
  }};
  border-radius: 5rem;
  margin: 0 0.5rem;
  color: ${props =>
    props.isFilled ? props.theme.colors.white : props.theme.colors.black};
  font-family: inherit;
  font-weight: 700;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all ${props => props.theme.animationTime} ease-in;

  &:hover {
    background-color: ${props =>
      props.isFilled ? props.theme.colors.lightPink : props.theme.colors.pink};
    ${({ isFilled }) =>
      !isFilled &&
      css`
        color: ${props => props.theme.colors.white};
      `}
  }
`;

// Props Interface
interface IProps extends IStyled {
  // filled?: boolean;
  text: string;
}

// Component
const Button: React.FC<IProps> = ({ text, isFilled }) => (
  <ButtonStyles isFilled={isFilled}>{text}</ButtonStyles>
);

// Prop types declaration
Button.propTypes = {
  isFilled: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export default Button;
