// Import libraries
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Import components
import { isEmail, isLength } from "../../../utils/validators";

// Styles

interface IStyledLabel {
  value: string;
}

interface IStyledP {
  isTouched: boolean;
  isValid: boolean;
}

const InputWrapper = styled.div`
  width: 100%;
  //display: flex;
  //flex-direction: column;
  //margin: 0 1.5rem;
  //margin: 1rem 0;
  position: relative;
  padding: 1.1rem 0;
  margin: 1rem auto;
`;

const LabelStyles = styled.label<IStyledLabel>`
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

const SpanStyles = styled.p<IStyledP>`
  text-align: center;
  color: ${props => props.theme.colors.red};
  margin-top: 0.5rem;
  opacity: ${props => (props.isTouched && !props.isValid ? "1" : "0")};
  display: ${props => (props.isTouched && !props.isValid ? "block" : "none")};
  padding: 0.5rem 0.05rem;
`;

// Interface
interface IProps extends IStyledLabel, IStyledP {
  label: string;
  type: string;
  // name: string;
  errorMessage: string;
  // isValid: boolean;
  // value: string;
  element: string;
  id: string;
  // onChangeHandler: (id: string, value: string, validator: boolean) => void;
  onChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  onBlurHandler: (id: string) => void;
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
    onBlurHandler,
    isTouched,
  } = props;

  console.log(id);
  console.log(isTouched);
  console.log(isValid);

  // const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   let validator;
  //   if (id === "email") {
  //     validator = isEmail(value);
  //   } else if (id === "password" || id === "repeatPassword") {
  //     validator = isLength(8, value);
  //   } else {
  //     validator = isLength(1, value);
  //   }
  //   onChangeHandler(id, event.target.value, validator);
  // };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeHandler(event, id);
  };
  //
  const blurHandler = () => {
    onBlurHandler(id);
  };

  return (
    <InputWrapper>
      {element === "input" && (
        <InputStyles
          type={type}
          value={value}
          // id={id}
          onChange={changeHandler}
          onBlur={blurHandler}
        />
      )}
      <LabelStyles value={value}>{label}</LabelStyles>
      <SpanStyles isValid={isValid} isTouched={isTouched}>
        {errorMessage}
      </SpanStyles>
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
