import User from "../../../models/User";
import actionTypes from "../actionTypes";

export type userStartAction = {
  type: actionTypes.USER_START;
};

export type userSuccessAction = {
  type: actionTypes.USER_SUCCESS;
  payload: { user: User };
};

export type userFollowHandlerAction = {
  type: actionTypes.USER_FOLLOW_HANDLER;
  // payload: { uid: string };
};

type userActions =
  | userStartAction
  | userSuccessAction
  | userFollowHandlerAction;

export default userActions;
