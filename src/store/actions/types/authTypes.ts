import actionTypes from "../actionTypes";

export type authStartAction = {
  type: actionTypes.AUTH_START;
};

export type authSuccessAction = {
  type: actionTypes.AUTH_SUCCESS;
  payload: { token: string; userInitials: string };
};

export type authErrorAction = {
  type: actionTypes.AUTH_ERROR;
  payload: { error: string };
};

export type authLogoutAction = {
  type: actionTypes.AUTH_LOGOUT;
};

export type authFinishAction = {
  type: actionTypes.AUTH_FINISH;
};

export type authErrorClear = {
  type: actionTypes.CLEAR_ERROR;
};

type authActions =
  | authStartAction
  | authSuccessAction
  | authErrorAction
  | authLogoutAction
  | authFinishAction
  | authErrorClear;

export default authActions;
