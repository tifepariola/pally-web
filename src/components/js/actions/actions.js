// const axios = require('axios-observable').Axios;
import $axios from 'api/api';

const PlanActions = {
  getPlans: () => {
    return $axios.get(`plans/all`);
  },

  getPlanDetail: (plan_type, plan_id) => {
    return $axios.get(`${plan_type}/${plan_id}`);
  },

  getPlanTx: (plan_id) => {
    return $axios.get(`transactions/plans/${plan_id}`);
  },

  save: (params) => {
    return $axios.get(`payment/callback`);
  },

  createPlan: (plansData, plansType) => {
    return $axios.post(`/${plansType}`, plansData);
  },

  saveNow: (params) => {
    return $axios.get(
      `payment/callback?trxref=${params.trxref}&reference=${params.reference}`
      + `&type=${params.type}&plan_id=${params.plan_id}`
    );
  },

  saveWAuth: (params) => {
    return $axios.post(`/pay/auth/code`, params);
  },

  updatePlan: (plan_type, plan_id, params) => {
    return $axios.put(`${plan_type}/${plan_id}`, params)
  }
}

export default PlanActions;
