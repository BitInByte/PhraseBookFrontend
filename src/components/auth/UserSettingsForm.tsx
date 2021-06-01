// Import libraries
import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { useForm } from "../../hooks/form-hook";
import { isEmail, isLength } from "../../utils/validators";

// Import components
import Input from "../ui/Form/Input";
import H2 from "../ui/Typography/H2";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

import User from "../../models/User";

// Styles
const Form = styled.form`
  width: 100%;
  //margin: 1.5rem 0;
`;

// Interface
interface IProps {
  // onButtonPush: () => void;
  isLoading: boolean | null;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  token: string;
  changeLoading: (loadingStatus: boolean) => void;
  changeError: (error: string) => void;
  changeSuccessMessage: (message: string) => void;
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
const UserSettingsForm: React.FC<IProps> = ({
  isLoading,
  user,
  changeLoading,
  token,
  changeError,
  changeSuccessMessage,
}) => {
  // console.log("USER");
  // console.log(user);

  // const dispatch = useDispatch();

  const {
    formState,
    inputValueHandler,
    formValidationHandler,
    inputTouchedHandler,
  } = useForm<ISettingsState>({
    firstName: {
      value: user.firstName,
      isValid: true,
      isTouched: true,
    },
    lastName: {
      value: user.lastName,
      isValid: true,
      isTouched: true,
    },
    email: {
      value: user.email,
      isValid: true,
      isTouched: true,
    },
    oldPassword: {
      value: "",
      isValid: true,
      isTouched: false,
    },
    password: {
      value: "",
      isValid: true,
      isTouched: false,
    },
    repeatPassword: {
      value: "",
      isValid: true,
      isTouched: false,
    },
  });

  console.log("FormState: ", formState);
  // console.log(formState);

  // const isFormValidHandler = () => {
  //   let formValidation = true;
  //   console.log("Validation");
  //   for (const elem in formState.inputs) {
  //     if (
  //       (elem === "oldPassword" && formState.inputs[elem].value.length > 0) ||
  //       (elem === "password" && formState.inputs[elem].value.length > 0) ||
  //       (elem === "repeatPassword" && formState.inputs[elem].value.length > 0)
  //     ) {
  //       console.log("FIRST");
  //       console.log(formState.inputs[elem].isValid);
  //       formValidation = formValidation && formState.inputs[elem].isValid;
  //     } else if (
  //       (elem === "oldPassword" && formState.inputs[elem].value.length === 0) ||
  //       (elem === "password" && formState.inputs[elem].value.length === 0) ||
  //       (elem === "repeatPassword" && formState.inputs[elem].value.length === 0)
  //     ) {
  //       console.log("SECOND");
  //       console.log(elem);
  //       console.log(formState.inputs[elem].isValid);
  //       console.log(formState.inputs[elem].value.length);
  //       formValidation = formValidation && formState.inputs[elem].isValid;
  //     }
  //   }
  //
  //   if (
  //     formState.inputs.oldPassword.value.length > 0 ||
  //     formState.inputs.password.value.length > 0 ||
  //     formState.inputs.repeatPassword.value.length > 0
  //   ) {
  //     if (
  //       formState.inputs.password.value !==
  //       formState.inputs.repeatPassword.value
  //     ) {
  //       formValidation = false;
  //     }
  //   }
  //   formValidationHandler(formValidation);
  //   // return formValidation;
  // };

  const isFormValidHandler = () => {
    let formValidation = true;
    console.log("Validation");
    for (const elem in formState.inputs) {
      console.log(formState.inputs[elem].isValid);
      formValidation = formValidation && formState.inputs[elem].isValid;
      // console.log(state.inputs[elem].isValid);
    }

    console.log("First form validation: ", formValidation);

    if (
      formState.inputs.oldPassword.value.length > 0 &&
      formState.inputs.password.value.length > 0 &&
      formState.inputs.repeatPassword.value.length > 0
    ) {
      console.log("First stage!");
      console.log("Old password: ", formState.inputs.oldPassword.value.length);
      console.log("Password: ", formState.inputs.password.value.length);
      console.log(
        "Repeat password: ",
        formState.inputs.repeatPassword.value.length
      );
      formValidation = formValidation && true;
      if (
        formState.inputs.password.value !==
        formState.inputs.repeatPassword.value
      ) {
        console.log("Second stage!");
        formValidation = false;
      }
    } else if (
      formState.inputs.oldPassword.value.length === 0 &&
      formState.inputs.password.value.length === 0 &&
      formState.inputs.repeatPassword.value.length === 0 &&
      formState.inputs.firstName.isValid &&
      formState.inputs.lastName.isValid &&
      formState.inputs.email.isValid
    ) {
      console.log("Third stage!");
      // formValidation = formValidation && true;
      formValidation = true;
    } else {
      console.log("Fourth stage!");
      formValidation = false;
    }
    console.log("Inputs length: ", {
      oldPassword: formState.inputs.oldPassword.value.length,
      password: formState.inputs.password.value.length,
      repeatPassword: formState.inputs.repeatPassword.value.length,
    });
    console.log("Form validation: ", formValidation);
    // } else if (
    //   formState.inputs.oldPassword.value.length === 0 ||
    //   formState.inputs.password.value.length === 0 ||
    //   formState.inputs.repeatPassword.value.length === 0
    // ) {
    //   formValidation = false;
    // }
    // if (
    //   formState.inputs.password.value !== formState.inputs.repeatPassword.value
    // ) {
    //   formValidation = false;
    // }
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
    } else if (
      id === "password" ||
      id === "repeatPassword" ||
      id === "oldPassword"
    ) {
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

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      email,
      firstName,
      lastName,
      password,
      oldPassword,
    } = formState.inputs;
    console.log(formState.inputs);
    // Fires up the loading state
    changeLoading(true);
    // Create a new user instance
    // const userPatch = new User(
    // formState.inputs.email.value,
    // formState.inputs.firstName.value,
    // formState.inputs.lastName.value
    // );
    // Async connection to the db to patch user settings
    // const response = await userPatch.patchUserSettings(
    // token,
    // formState.inputs.oldPassword.value,
    // formState.inputs.password.value
    // );
    try {
      // const response = await User.patchUserSettings(token, oldPassword.value, password.value, firstName.value, lastName.value, email.value)
      await User.patchUserSettings(
        token,
        oldPassword.value,
        password.value,
        firstName.value,
        lastName.value,
        email.value
      );

      changeSuccessMessage("User Successfully changed!");
    } catch (error) {
      changeError(error.message);
    }
    // If returns string, send an error
    // if (typeof response === "string") {
    // changeError(response);
    // //  Else send a success message
    // } else {
    // changeSuccessMessage("User Successfully changed!");
    // }
    // Finish the loading
    changeLoading(false);
    // dispatch(
    //   signUp({
    //     firstName: formState.inputs.firstName.value,
    //     lastName: formState.inputs.lastName.value,
    //     email: formState.inputs.email.value,
    //     password: formState.inputs.password.value,
    //   })
    // );
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
            value={formState.inputs.oldPassword.value}
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
  // user: PropTypes.shape({
  //   firstName: PropTypes.string,
  //   lastName: PropTypes.string,
  //   email: PropTypes.string
  // }),
  // onButtonPush: PropTypes.func.isRequired,
};

export default UserSettingsForm;
