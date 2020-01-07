import { combineReducers } from "redux";
import authReducer from "./authReducer";
import planReducer from "./planReducer";

// import { LOGIN_USER } from "../constants/action-types";
// const initialState = {
//     user: {}
// };

// function rootReducer(state = initialState, action) {
//     if (action.type === LOGIN_USER) {
//         return state.user = action.payload;
//     }
//     return state;
// };

export default combineReducers({
  auth: authReducer,
  plan: planReducer
});

// export default rootReducer;
