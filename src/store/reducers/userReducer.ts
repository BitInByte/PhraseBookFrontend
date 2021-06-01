import userActions from "../actions/types/userTypes";
import actionTypes from "../actions/actionTypes";

const initialState: IUserState = {
  user: null,
  loading: false,
  error: null,
};

const userStart = (state: IUserState, _action: userActions): IUserState => {
  return {
    ...state,
    loading: true,
  };
};

const userSuccess = (state: IUserState, action: userActions): IUserState => {
  let user = null;
  if (action.type === actionTypes.USER_SUCCESS) {
    user = action.payload.user;
  }

  return {
    ...state,
    loading: false,
    user,
  };
};

const userFollowHandler = (
  state: IUserState,
  _action: userActions
): IUserState => {
  if (state.user) {
    state.user.toggleIsFriend();
  }
  return {
    ...state,
  };
};

const userReducer = (state = initialState, action: userActions): IUserState => {
  switch (action.type) {
    case actionTypes.USER_START:
      return userStart(state, action);
    case actionTypes.USER_SUCCESS:
      return userSuccess(state, action);
    case actionTypes.USER_FOLLOW_HANDLER:
      return userFollowHandler(state, action);
    default:
      return state;
  }
};

export default userReducer;
