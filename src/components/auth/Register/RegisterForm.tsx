// Import libraries
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Input from "../../ui/Form/Input";
import H2 from "../../ui/Typography/H2";
import Button from "../../ui/Button/Button";
import { useForm, stateTypes, IState } from "../../../hooks/form-hook";

// Import components

// Styles
const Form = styled.form`
  width: 100%;
  //margin: 1.5rem 0;
`;

// Interface
interface IProps {}

interface IRegisterState {
  firstName: {
    value: string;
    isValid: boolean;
  };
  lastName: {
    value: string;
    isValid: boolean;
  };
  email: {
    value: string;
    isValid: boolean;
  };
  password: {
    value: string;
    isValid: boolean;
  };
  repeatPassword: {
    value: string;
    isValid: boolean;
  };
}

interface IUseForm {
  formState: IState<IRegisterState>;
  inputValueHandler: (id: string, value: string) => void;
}

// Component
const RegisterForm: React.FC<IProps> = () => {
  const { formState, inputValueHandler } = useForm<IRegisterState>({
    firstName: {
      value: "",
      isValid: false,
    },
    lastName: {
      value: "",
      isValid: false,
    },
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
    repeatPassword: {
      value: "",
      isValid: false,
    },
  });

  console.log("FormState");
  console.log(formState.inputs.firstName.value);

  return (
    <>
      <H2>Registration</H2>
      <Form>
        <Input
          label="First Name"
          type="text"
          element="input"
          errorMessage="Please introduce a valid name!"
          isValid={false}
          id="firstName"
          value={formState.inputs.firstName.value}
          onChangeHandler={inputValueHandler}
        />
        <Input
          label="Last Name"
          type="text"
          element="input"
          errorMessage="Please introduce a valid name!"
          isValid={false}
          id="lastName"
          value={formState.inputs.lastName.value}
          onChangeHandler={inputValueHandler}
        />
        <Input
          label="Email"
          type="text"
          element="input"
          errorMessage="Please introduce a valid email!"
          isValid={false}
          id="email"
          value={formState.inputs.email.value}
          onChangeHandler={inputValueHandler}
        />
        <Input
          label="Password"
          type="password"
          element="input"
          errorMessage="Please introduce a valid password!"
          isValid={false}
          id="password"
          value={formState.inputs.password.value}
          onChangeHandler={inputValueHandler}
        />
        <Input
          label="Repeat Password"
          type="password"
          element="input"
          errorMessage="Please introduce a valid password!"
          isValid={false}
          id="repeatPassword"
          value={formState.inputs.repeatPassword.value}
          onChangeHandler={inputValueHandler}
        />
        <Button text="Register" isFilled />
        <Button text="Login" />
      </Form>
    </>
  );
};

// Prop types declaration
RegisterForm.propTypes = {};

export default RegisterForm;
