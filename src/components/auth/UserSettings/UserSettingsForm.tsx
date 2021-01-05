// Import libraries
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { useForm } from "../../../hooks/form-hook";
import { isEmail, isLength } from "../../../utils/validators";
import { signUp } from "../../../store/actions/authAction";

// Import components
import Input from "../../ui/Form/Input";
import H2 from "../../ui/Typography/H2";
import Button from "../../ui/Button/Button";
import Spinner from "../../ui/Spinner/Spinner";

import User from "../../../models/User";

// Styles
const Form = styled.form`
  width: 100%;
  //margin: 1.5rem 0;
`;

// Interface
interface IProps {
  // onButtonPush: () => void;
  isLoading: boolean | null;
  user: User;
}

type stateElement = {
  value: string;
  isValid: boolean;
  isTouched: boolean;
};

interface ISettingsState {
  firstName: stateElement;
  lastName: stateElement;
  email: stateElement;
  oldPassword: stateElement;
  password: stateElement;
  repeatPassword: stateElement;
  [key: string]: stateElement;
}

// Component
const UserSettingsForm: React.FC<IProps> = ({ isLoading, user }) => {
  console.log("USER");
  console.log(user);

  const dispatch = useDispatch();

  const {
    formState,
    inputValueHandler,
    formValidationHandler,
    inputTouchedHandler,
  } = useForm<ISettingsState>({
    firstName: {
      value: user.getFirstName(),
      isValid: false,
      isTouched: false,
    },
    lastName: {
      value: user ? user.getLastName() : "",
      isValid: false,
      isTouched: false,
    },
    email: {
      value: user ? user.getEmail() : "",
      isValid: false,
      isTouched: false,
    },
    oldPassword: {
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

  console.log("FormState");
  console.log(formState);

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

    // formValidationHandler(formValidation);
    console.log("FORM VALIDATION");
    // console.log(formValidation);
    console.log(formState.inputs.password.value);
    console.log(formState.inputs.repeatPassword.value);
    console.log(formState);
    // await isFormValidHandler();
  };

  const touchedHandler = (id: string) => {
    inputTouchedHandler(id);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState.inputs);
    dispatch(
      signUp({
        firstName: formState.inputs.firstName.value,
        lastName: formState.inputs.lastName.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      })
    );
  };

  let content;
  if (isLoading) {
    content = <Spinner withWrapper />;
  } else {
    content = (
      <>
        <H2>User Settings</H2>
        <Form onSubmit={submitHandler}>
          <Input
            label="First Name"
            type="text"
            element="input"
            errorMessage="You should provide you're last name!"
            isValid={formState.inputs.firstName.isValid}
            id="firstName"
            value={formState.inputs.firstName.value}
            onChangeHandler={changeHandler}
            onBlurHandler={touchedHandler}
            isTouched={formState.inputs.firstName.isTouched}
          />
          <Input
            label="Last Name"
            type="text"
            element="input"
            errorMessage="You should provide you're first name!"
            isValid={formState.inputs.lastName.isValid}
            id="lastName"
            value={formState.inputs.lastName.value}
            onChangeHandler={changeHandler}
            onBlurHandler={touchedHandler}
            isTouched={formState.inputs.lastName.isTouched}
          />
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
            label="Old Password"
            type="password"
            element="input"
            errorMessage="The password should have at least 8 characters!"
            isValid={formState.inputs.oldPassword.isValid}
            id="oldPassword"
            value={formState.inputs.password.value}
            onChangeHandler={changeHandler}
            onBlurHandler={touchedHandler}
            isTouched={formState.inputs.oldPassword.isTouched}
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
            text="Submit Changes"
            isFilled
            isDisabled={!formState.isFormValid}
            type="submit"
          />
        </Form>
      </>
    );
  }

  return content;
};

// Prop types declaration
UserSettingsForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  // onButtonPush: PropTypes.func.isRequired,
};

export default UserSettingsForm;
