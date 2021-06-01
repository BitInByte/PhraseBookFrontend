import { AppThunk } from "../types/thunk";
import actionTypes from "./actionTypes";
import User from "../../models/User";

import {
  userStartAction,
  userSuccessAction,
  userFollowHandlerAction,
} from "./types/userTypes";

export const userStart = (): userStartAction => {
  return {
    type: actionTypes.USER_START,
  };
};

export const userSuccess = (user: User): userSuccessAction => {
  return {
    type: actionTypes.USER_SUCCESS,
    payload: { user },
  };
};

export const userFollowHandler = (): userFollowHandlerAction => {
  return {
    type: actionTypes.USER_FOLLOW_HANDLER,
    // payload: { uid },
  };
};
