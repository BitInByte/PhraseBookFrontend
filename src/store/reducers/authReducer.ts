import { authTypes } from "../actions/actionTypes";
import { authActions } from "../actions/authAction";

// export interface authState {
//   token: string | null;
//   userId: string | null;
//   error: string | null;
//   loading: boolean | null;
// }

const initialState: IAuthState = {
  token: null,
  // userId: null,
  error: null,
  loading: null,
  userInitials: null,
};

const authStart = (state: IAuthState, _: authActions): IAuthState => {
  return {
    ...state,
    // state: {
    loading: true,
    token: null,
    error: null,
    // },
  };
};

const authSuccess = (state: IAuthState, action: authActions): IAuthState => {
  let token = null;
  let userInitials = null;
  console.log("&&&&&ACTION");
  console.log(action);
  if (action.type === authTypes.AUTH_SUCCESS) {
    // if (action.__typename === "success") {
    token = action.payload.token;
    userInitials = action.payload.userInitials;
    console.log("Token");
    console.log(token);
  }
  return {
    ...state,
    token,
    loading: false,
    error: null,
    userInitials,
  };
};

const authError = (state: IAuthState, action: authActions): IAuthState => {
  let error = null;
  // if (action.__typename === "error") {
  if (action.type === authTypes.AUTH_ERROR) {
    error = action.payload.error;
  }

  return {
    ...state,
    loading: false,
    error,
    token: null,
  };
};

const authLogout = (state: IAuthState, _: authActions): IAuthState => {
  return {
    // ...state,
    // loading: false,
    // error: null,
    // token: null,
    ...initialState,
  };
};

const authFinish = (state: IAuthState, _: authActions): IAuthState => {
  return {
    ...initialState,
  };
};

const authReducer = (state = initialState, action: authActions) => {
  switch (action.type) {
    case authTypes.AUTH_START:
      return authStart(state, action);
    case authTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case authTypes.AUTH_ERROR:
      return authError(state, action);
    case authTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case authTypes.AUTH_FINISH:
      return authFinish(state, action);
    default:
      return state;
  }
};

export default authReducer;
