// Import libraries
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Import components

// Styles

interface IStyled {
  value: string;
}

const InputWrapper = styled.div`
  width: 75%;
  //display: flex;
  //flex-direction: column;
  //margin: 0 1.5rem;
  margin: 1rem 0;
  position: relative;
  padding: 1.1rem 0;
`;

const LabelStyles = styled.label<IStyled>`
  position: absolute;
  top: 0;
  left: 0;
  transform: ${({ value }) => {
    if (value.length === 0) return "translatey(2.1rem)";
    else return "translatey(-0.5rem)";
  }};
  color: grey;
  margin-left: 1.5rem;
  opacity: 1;
  transition: all ${props => props.theme.animationTime} ease-in;
`;

const InputStyles = styled.input`
  width: 100%;
  border: 0.2rem solid grey;
  background: none;
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  padding: 0.8rem 1.2rem;
  outline: 0;
  margin-top: 0.4rem;
  border-radius: 1.5rem;
  transition: all ${props => props.theme.animationTime} ease-in;
  //margin-left: 0.03rem;

  &:focus + ${LabelStyles} {
    font-size: 1.6rem;
    color: ${props => props.theme.colors.black};
    transform: translatey(-0.5rem);
    opacity: 1;
    font-weight: 700;
    padding-bottom: 0.5rem;
    //margin-left: 0;
  }

  // &:valid + ${LabelStyles} {
  //   transform: translatey(-0.5rem);
  // }

  &:focus {
    border: 0.2rem solid ${props => props.theme.colors.blue};
    box-shadow: 0 0 10px ${props => props.theme.colors.blue};
  }
`;

const SpanStyles = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.red};
  margin-top: 0.5rem;
  opacity: 0;
  display: none;
  padding: 0.5rem 0.05rem;
`;

// Interface
interface IProps extends IStyled {
  label: string;
  type: string;
  // name: string;
  errorMessage: string;
  isValid: boolean;
  // value: string;
  element: string;
  id: string;
  onChangeHandler: (id: string, value: string) => void;
}

// Component
const Input: React.FC<IProps> = props => {
  const {
    label,
    type,
    errorMessage,
    isValid,
    value,
    element,
    onChangeHandler,
    id,
  } = props;

  console.log(id);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeHandler(id, event.target.value);
  };

  return (
    <InputWrapper>
      {element === "input" && (
        <InputStyles
          type={type}
          value={value}
          // id={id}
          onChange={changeHandler}
        />
      )}
      <LabelStyles value={value}>{label}</LabelStyles>
      <SpanStyles>{errorMessage}</SpanStyles>
    </InputWrapper>
  );
};

// Prop types declaration
Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  element: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

Input.defaultProps = {
  value: "",
};

export default Input;
