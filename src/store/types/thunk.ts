import { Action } from "redux";
// import { authState } from "../reducers/authReducer";
import { ThunkAction } from "redux-thunk";
import actionTypes from "../actions/actionTypes";

export type AppThunk<ReturnType = void> = ThunkAction<
  // export type AppThunk<ReturnType> = ThunkAction<
  ReturnType,
  IStore,
  // Promise<void>,
  null,
  Action<actionTypes>
>;
