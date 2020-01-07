const axios = require('axios-observable').Axios;

const PlanActions = {
  getPlans: () => {
    return axios.get(`https://pallymate-api.herokuapp.com/api/plans/all`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
  },
  getPlanDetail: (plan_type, plan_id) => {
    return axios.get(`https://pallymate-api.herokuapp.com/api/` + plan_type + `/` + plan_id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
  },
  getPlanTx: (plan_id) => {
    return axios.get(`https://pallymate-api.herokuapp.com/api/transactions/plans/` + plan_id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
  },
  save: (params) => {
    return axios.get(`https://pallymate-api.herokuapp.com/api/payment/callback`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
  },
  createPlan: (plansData, plansType) => {
    return axios
      .post(`https://pallymate-api.herokuapp.com/api/${plansType}`, plansData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth"),
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
  },
  saveNow: (params) => {
    return axios.get(`https://pallymate-api.herokuapp.com/api/payment/callback?trxref=${params.trxref}&reference=${params.reference}&type=${params.type}&plan_id=${params.plan_id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
  },
  saveWAuth: (params) => {
    return axios.post(`https://pallymate-api.herokuapp.com/api/pay/auth/code`, params, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
  },
  updatePlan: (plan_type, plan_id, params) => {
    return axios.put(`https://pallymate-api.herokuapp.com/api/` + plan_type + `/` + plan_id, params, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth"),
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
  }
}
export default PlanActions;