import { authTypes } from "../actionTypes";

export type authStartAction = {
  type: authTypes.AUTH_START;
};

export type authSuccessAction = {
  type: authTypes.AUTH_SUCCESS;
  payload: { token: string; userInitials: string };
};

export type authErrorAction = {
  type: authTypes.AUTH_ERROR;
  payload: { error: string };
};

export type authLogoutAction = {
  type: authTypes.AUTH_LOGOUT;
};

export type authFinishAction = {
  type: authTypes.AUTH_FINISH;
};

export type authErrorClear = {
  type: authTypes.CLEAR_ERROR;
};

type authActions =
  | authStartAction
  | authSuccessAction
  | authErrorAction
  | authLogoutAction
  | authFinishAction
  | authErrorClear;

export default authActions;
