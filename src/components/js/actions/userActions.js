const axios = require('axios-observable').Axios;

const UserActions = {
    getUser: () => {
        return axios.get(`https://pallymate-api.herokuapp.com/api/user`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth"),
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
    },
    getTxLog: () => {
        return axios.get(`https://pallymate-api.herokuapp.com/api/transactions/history`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth"),
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
    },
    getBanks: () => {
        return axios.get(`https://pallymate-api.herokuapp.com/api/banks/list`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth"),
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
    },
    getCards: () => {
        return axios.post(`https://pallymate-api.herokuapp.com/api/saved-card/all`, {}, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth"),
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
    },
    deleteCard: (card) => {
        return axios.delete(`https://pallymate-api.herokuapp.com/api/saved-card/` + card, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth"),
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
    },
    getTx: () => {
        return axios.get(`https://pallymate-api.herokuapp.com/api/transactions/history`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth")
            }
        });
    },
    getBalance: () => {
        return axios.get(`https://pallymate-api.herokuapp.com/api/transactions/balance`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth"),
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
    },
    updateUser: (user) => {
        return axios.post(`https://pallymate-api.herokuapp.com/api/user/update`, user, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth"),
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
    },
    verifyBank: (params) => {
        return axios.get(`https://pallymate-api.herokuapp.com/api/verify/account_no?account_no=` + params.account_no + `&bank_code=` + params.bank_code, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth"),
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
    },
    submitBank: (params) => {
        return axios.post(`https://pallymate-api.herokuapp.com/api/banks/save`, params, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth"),
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
    },
    changePass: (params) => {
        return axios.post(`https://pallymate-api.herokuapp.com/api/user/password/change`, params, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth"),
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
    },
    removeBank: (params) => {
        return axios.post(`https://pallymate-api.herokuapp.com/api/banks/remove`, params, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("auth"),
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
    }
}
export default UserActions;
