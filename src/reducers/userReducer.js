import { Actions } from "src/configs";

const initialState = {
  status: 0,
  data:
    JSON.parse(
      localStorage.getItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`)
    ) || {},
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        data: action.payload.user,
        message: action.payload.message,
      };
    case Actions.LOGIN_FAIL:
      return {
        ...state,
        status: action.payload.status,
        message: action.payload.message,
      };
    case Actions.CHANGE_LANGUAGE_SUCCESS:
      return {
        ...state,
        data: { ...state.data, language: action.payload.language },
        message: action.payload.message,
      };
    case Actions.CHANGE_LANGUAGE_FAIL:
      return { ...state, message: action.payload.message };
    case Actions.LOGOUT_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
        data: {},
      };
    case Actions.LOGOUT_FAIL:
      return {
        data: {},
      };
    default:
      return { ...state };
  }
};

export default userReducer;
