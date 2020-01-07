import axios from "axios";

import { GET_USER, USER_LOADING } from "../constants/action-types";

const token = localStorage.getItem("auth");
export const getUser = () => dispatch => {
  axios
    .get(`https://pallymate-api.herokuapp.com/api/user`, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data.data
      });
    })
    .catch(err =>
      dispatch({
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
