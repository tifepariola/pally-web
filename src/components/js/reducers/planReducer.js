import { GET_PLAN, PLAN_LOADING, CREATE_PLAN } from "../constants/action-types";

const initialState = {
  planTypes: {},
  planContent: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PLAN_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PLAN:
      return {
        ...state,
        planTypes: action.payload,
        loading: false
      };
    case CREATE_PLAN:
      return {
        ...state,
        planContent: action.payload
      };
    default:
      return state;
  }
}
