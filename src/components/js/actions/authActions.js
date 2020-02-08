import $axios from "api/api";

import { GET_USER, USER_LOADING } from "../constants/action-types";

export const getUser = () => dispatch => {
  $axios.get(`/user`).subscribe(
    (response) => {
      dispatch({
        type: GET_USER,
        payload: response.data.data
      });
    },
    (error) => dispatch({
      type: GET_USER,
      payload: {}
    })
  );
};

// Plan loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
