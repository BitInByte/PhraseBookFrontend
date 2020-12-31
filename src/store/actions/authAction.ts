import { authTypes } from "./actionTypes";
import { AppThunk } from "../types/thunk";
import User from "../../models/User";

type authStartAction = {
  // __typename: "start";
  type: authTypes.AUTH_START;
  // payload: null;
};

const authStart = (): authStartAction => {
  return {
    type: authTypes.AUTH_START,
    // __typename: "start",
  };
};

type authSuccessAction = {
  // __typename: "success";
  type: authTypes.AUTH_SUCCESS;
  payload: { token: string };
};

const authSuccess = (token: string): authSuccessAction => {
  return {
    type: authTypes.AUTH_SUCCESS,
    payload: { token },
    // __typename: "success",
  };
};

type authErrorAction = {
  // __typename: "error";
  type: authTypes.AUTH_ERROR;
  payload: { error: string };
};

const authError = (error: string): authErrorAction => {
  return {
    type: authTypes.AUTH_ERROR,
    payload: { error },
    // __typename: "error",
  };
};

type authLogoutAction = {
  type: authTypes.AUTH_LOGOUT;
};

const authLogout = (): authLogoutAction => {
  return {
    type: authTypes.AUTH_LOGOUT,
  };
};

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
      console.log(response.exp.toString());
      console.log(new Date(response.exp * 1000));
      console.log(Date.now());
      // Store token and exp date on localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "expirationDate",
        new Date(response.exp * 1000).toString()
      );
      localStorage.setItem("userId", loginUser.getUserId());
      // Dispatch action
      console.log("Success");
      console.log(response.token);
      dispatch(authSuccess(response.token));
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
        if (token) {
          dispatch(authSuccess(token));
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
      dispatch(authError("No Session Stored"));
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

const removeLocalStorageUserInformation = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
};

export type authActions =
  | authStartAction
  | authSuccessAction
  | authErrorAction
  | authLogoutAction;
