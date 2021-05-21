import actionTypes from "./actionTypes";
import { AppThunk } from "../types/thunk";
import User from "../../models/User";
import {
  authStartAction,
  authSuccessAction,
  authErrorAction,
  authLogoutAction,
  authFinishAction,
  authErrorClear,
} from "./types/authTypes";

// type authStartAction = {
//   // __typename: "start";
//   type: actionTypes.AUTH_START;
//   // payload: null;
// };

const authStart = (): authStartAction => {
  return {
    type: actionTypes.AUTH_START,
    // __typename: "start",
  };
};

// type authSuccessAction = {
//   // __typename: "success";
//   type: actionTypes.AUTH_SUCCESS;
//   payload: { token: string; userInitials: string };
// };

const authSuccess = (token: string, initials: string): authSuccessAction => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: { token, userInitials: initials },
    // __typename: "success",
  };
};

// type authErrorAction = {
//   // __typename: "error";
//   type: actionTypes.AUTH_ERROR;
//   payload: { error: string };
// };

const authError = (error: string): authErrorAction => {
  return {
    type: actionTypes.AUTH_ERROR,
    payload: { error },
    // __typename: "error",
  };
};

// type authLogoutAction = {
//   type: actionTypes.AUTH_LOGOUT;
// };

const authLogout = (): authLogoutAction => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

// type authFinishAction = {
//   type: actionTypes.AUTH_FINISH;
// };

const authFinish = (): authFinishAction => {
  return {
    type: actionTypes.AUTH_FINISH,
  };
};

// type authErrorClear = {
//   type: actionTypes.CLEAR_ERROR;
// };

export const login = ({ email, password }: loginBody): AppThunk => {
  return async dispatch => {
    // Fires up the loading
    dispatch(authStart());

    console.log("Dispatched");

    const loginUser = new User(email);

    let response;
    response = await loginUser.login(password);

    console.log("@@@@@@@RESPONSE");
    console.log(response);

    // if (loginUser.getUserId()) {
    if (typeof response === "object") {
      console.log("00000000DATE RECEIVED");
      // console.log(response.exp.toString());
      console.log(new Date(response.exp * 1000));
      console.log(Date.now());
      // Store token and exp date on localStorage
      // localStorage.setItem("token", response.token);
      // localStorage.setItem(
      //   "expirationDate",
      //   new Date(response.exp * 1000).toString()
      // );
      // localStorage.setItem("userId", loginUser.getUserId());
      // Dispatch action
      console.log("Success");
      console.log(
        loginUser.getFirstName().split("")[0] +
          loginUser.getLastName().split("")[0]
      );
      const initials = (
        loginUser.getFirstName().split("")[0] +
        loginUser.getLastName().split("")[0]
      ).toUpperCase();
      // localStorage.setItem("userInitials", initials);
      addLocalStorageUserInformation(
        response.token,
        response.exp,
        loginUser.getUserId(),
        initials
      );

      dispatch(authSuccess(response.token, initials));
      // }
    } else if (typeof response === "string") {
      // Dispatch action
      console.log("Error");
      console.log(response);
      dispatch(authError(response));
    }
    // }

    // Fetch data from the server
    // try {
    //   // response = await axios.post("http://localhost:5001/api/v1/auth/login", {
    //   response = await axios.post("/auth/login", {
    //     email,
    //     password,
    //   });
    //   // Store token and exp date on localStorage
    //   localStorage.setItem("token", response.data.token);
    //   //  Store the data on the redux
    //   dispatch(authSuccess(response.data.token));
    // } catch (e) {
    //   const error = e as AxiosError;
    //   console.log(error.response);
    //   // Send the error
    //   dispatch(authError(error.response!.data.message));
    //   // console.log(response);
    // }
    // console.log(response);
  };
};

export const checkSession = (): AppThunk => {
  return dispatch => {
    // Fires up the loading
    dispatch(authStart());

    // Get the expiry date from the localStorage
    const expiryDateString = localStorage.getItem("expirationDate");

    let expirationDate;
    if (expiryDateString) {
      // expirationDate = new Date(expiryDateString).getTime();
      expirationDate = Date.parse(expiryDateString);
      if (expirationDate >= Date.now()) {
        console.log("@@@@@ STILL VALID @@@@@");
        const token = localStorage.getItem("token");
        const userInitials = localStorage.getItem("userInitials");
        if (token && userInitials) {
          dispatch(authSuccess(token, userInitials));
        }
        // console.log(expirationDate);
        // console.log(new Date(expirationDate));
        // console.log(Date.now());
      } else {
        console.log("@@@@@ NOT VALID @@@@@");
        // Remove items
        // localStorage.removeItem("token");
        // localStorage.removeItem("expirationDate");
        // localStorage.removeItem("userId");
        removeLocalStorageUserInformation();
        dispatch(authError("No Valid Session"));
        // console.log(new Date(Date.parse(expiryDateString)).getTime() / 1000);
        // console.log(expirationDate);
        // console.log(Date.now());
      }
    } else {
      console.log("@@@@@ THERE IS NO SESSION STORED! @@@@@");
      // dispatch(authError("No Session Stored"));
      dispatch(authFinish());
    }
  };
};

export const logout = (): AppThunk => {
  return dispatch => {
    // Fires up the loading
    dispatch(authStart());
    // Remove all localStorage variables
    removeLocalStorageUserInformation();
    // Remove the token from the store
    dispatch(authLogout());
  };
};

export const signUp = ({
  firstName,
  lastName,
  email,
  password,
}: signupBody): AppThunk => {
  return async dispatch => {
    //  Fires up the loading
    dispatch(authStart());
    //  Try to signUp
    const newUser = new User(email, firstName, lastName);
    let response;
    response = await newUser.signUp(password);
    if (typeof response === "object") {
      // localStorage.setItem("token", response.token);
      // localStorage.setItem(
      //     "expirationDate",
      //     new Date(response.exp * 1000).toString()
      // );
      // localStorage.setItem("userId", loginUser.getUserId());
      // Dispatch action
      // console.log("Success");
      // console.log(
      //     loginUser.getFirstName().split("")[0] +
      //     loginUser.getLastName().split("")[0]
      // );
      const initials = (
        newUser.getFirstName().split("")[0] + newUser.getLastName().split("")[0]
      ).toUpperCase();
      // localStorage.setItem("userInitials", initials);
      addLocalStorageUserInformation(
        response.token,
        response.exp,
        newUser.getUserId(),
        initials
      );
      dispatch(authSuccess(response.token, initials));
    } else if (typeof response === "string") {
      dispatch(authError(response));
    }
  };
};

export const finishSession = () => {
  authFinish();
};

const removeLocalStorageUserInformation = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("userInitials");
};

const addLocalStorageUserInformation = (
  token: string,
  expDate: number,
  userId: string,
  userInitials: string
) => {
  localStorage.setItem("token", token);
  localStorage.setItem("expirationDate", new Date(expDate * 1000).toString());
  localStorage.setItem("userId", userId);
  localStorage.setItem("userInitials", userInitials);
};

// export type authActions =
//   | authStartAction
//   | authSuccessAction
//   | authErrorAction
//   | authLogoutAction
//   | authFinishAction
//   | authErrorClear;
