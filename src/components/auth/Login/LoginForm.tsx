// Import libraries
import React, { useEffect } from "react";
import styled from "styled-components";
import Input from "../../ui/Form/Input";
import H2 from "../../ui/Typography/H2";
import Button from "../../ui/Button/Button";
import PropTypes from "prop-types";

import { useForm } from "../../../hooks/form-hook";
import { isEmail, isLength } from "../../../utils/validators";

// Import components

// Styles
const Form = styled.form`
  //width: 100%;
  //margin: 1.5rem 0;
  //display: flex;
  //flex-direction: column;
  //justify-content: center;
  //align-items: center;
`;

// Interface
interface IProps {
  onButtonPush: () => void;
}

type stateElement = {
  value: string;
  isValid: boolean;
  isTouched: boolean;
};

interface ILoginState {
  email: stateElement;
  password: stateElement;
  repeatPassword: stateElement;
  [key: string]: stateElement;
}

// Component
const LoginForm: React.FC<IProps> = ({ onButtonPush }) => {
  const {
    formState,
    inputValueHandler,
    formValidationHandler,
    inputTouchedHandler,
  } = useForm<ILoginState>({
    email: {
      value: "",
      isValid: false,
      isTouched: false,
    },
    password: {
      value: "",
      isValid: false,
      isTouched: false,
    },
    repeatPassword: {
      value: "",
      isValid: false,
      isTouched: false,
    },
  });

  const isFormValidHandler = () => {
    let formValidation = true;
    console.log("Validation");
    for (const elem in formState.inputs) {
      console.log(formState.inputs[elem].isValid);
      formValidation = formValidation && formState.inputs[elem].isValid;
      // console.log(state.inputs[elem].isValid);
    }

    if (
      formState.inputs.password.value !== formState.inputs.repeatPassword.value
    ) {
      formValidation = false;
    }
    formValidationHandler(formValidation);
    // return formValidation;
  };

  useEffect(() => {
    isFormValidHandler();
  }, [formState.inputs]);

  // isFormValidHandler();
  const changeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    // Validate the element
    const value = event.target.value;
    let validator;
    if (id === "email") {
      validator = isEmail(value);
    } else if (id === "password" || id === "repeatPassword") {
      validator = isLength(8, value);
    } else {
      validator = isLength(1, value);
    }
    await inputValueHandler(id, event.target.value, validator);
  };

  const touchedHandler = (id: string) => {
    inputTouchedHandler(id);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <>
      <H2>Login</H2>
      <Form onSubmit={submitHandler}>
        <Input
          label="Email"
          type="text"
          element="input"
          errorMessage="Your email is not valid!"
          isValid={formState.inputs.email.isValid}
          id="email"
          value={formState.inputs.email.value}
          onChangeHandler={changeHandler}
          onBlurHandler={touchedHandler}
          isTouched={formState.inputs.email.isTouched}
        />
        <Input
          label="Password"
          type="password"
          element="input"
          errorMessage="The password should have at least 8 characters!"
          isValid={formState.inputs.password.isValid}
          id="password"
          value={formState.inputs.password.value}
          onChangeHandler={changeHandler}
          onBlurHandler={touchedHandler}
          isTouched={formState.inputs.password.isTouched}
        />
        <Input
          label="Repeat Password"
          type="password"
          element="input"
          errorMessage="The password should have at least 8 characters!"
          isValid={formState.inputs.repeatPassword.isValid}
          id="repeatPassword"
          value={formState.inputs.repeatPassword.value}
          onChangeHandler={changeHandler}
          onBlurHandler={touchedHandler}
          isTouched={formState.inputs.repeatPassword.isTouched}
        />
        <Button
          text="Register"
          isFilled
          isDisabled={!formState.isFormValid}
          type="submit"
        />
        <Button text="Register" buttonPushHandler={onButtonPush} />
      </Form>
    </>
  );
};

// Prop types declaration
LoginForm.propTypes = {
  onButtonPush: PropTypes.func.isRequired,
};

export default LoginForm;
