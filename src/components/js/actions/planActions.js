import $axios from "api/api";

import {
  GET_ERRORS,
  GET_PLAN,
  PLAN_LOADING,
  CREATE_PLAN,
  SAVE_WITH_AUTH
  // FIXED_PLAN
} from "../constants/action-types";

export const createPlan = (plansData, plansType) => dispatch => {
  $axios.post(`/${plansType}`, plansData).subscribe(
    (res) => {
      dispatch({
        type: CREATE_PLAN,
        payload: res.data
      });
    },
    (err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.payload
      })
    }
  );
}

export const saveWAuth = (payData) => dispatch => {
  $axios.post(`/pay/auth/code`, payData).subscribe(
    (res) => {
      dispatch({
        type: SAVE_WITH_AUTH,
        payload: res.data
      });
    },
    (err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.payload
      })
    }
  );
};


// Get Savers plan
export const getPlans = () => dispatch => {
  dispatch(setPlanLoading());
  $axios.get(`/plans/all`).subscribe(
    (res) => {
      dispatch({
        type: GET_PLAN,
        payload: res.data
      })
    },
    (err) => {
      dispatch({
        type: GET_PLAN,
        payload: err.response.data
      })
    }
  )
};

export const getPlanDetail = (plan_type, id) => dispatch => {
  dispatch(setPlanLoading());
  $axios.get(`/${plan_type}/${id}`).subscribe(
    res => {
      dispatch({
        type: GET_PLAN,
        payload: res.data
      })
    },
    err => {
      dispatch({
        type: GET_PLAN,
        payload: err.response.data
      })
    }
  )
};

// Get Savers plan
// export const getFixedPlans = () => dispatch => {
//   dispatch(setPlanLoading());
//   axios
//     .get(`https://pallymate-api.herokuapp.com/api/fixeds`, {
//       headers: {
//         Authorization: "Bearer " + token,
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       }
//     })
//     .then(res =>
//       dispatch({
//         type: FIXED_PLAN,
//         payload: res.data.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: FIXED_PLAN,
//         payload: err.response.data
//       })
//     );
// };

// Plan loading
export const setPlanLoading = () => {
  return {
    type: PLAN_LOADING
  };
};
