import { LOGIN_USER, GET_USER, USER_LOADING } from "../constants/action-types";

const initialState = {
  isAuthenticated: {},
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: action.payload,
        user: action.payload
      };
    case GET_USER:
      return {
        ...state,
        isAuthenticated: action.payload,
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
