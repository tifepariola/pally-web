import $axios from 'api/api';

const UserActions = {
    getUser: () => {
        return $axios.get(`/user`);
    },

    getTxLog: () => {
        return $axios.get(`/transactions/history`);
    },

    getBanks: () => {
        return $axios.get(`/banks/list`);
    },

    getCards: () => {
        return $axios.post(`/saved-card/all`, {});
    },

    deleteCard: (card) => {
        return $axios.delete(`/saved-card/${card}`);
    },

    getTx: () => {
        return $axios.get(`/transactions/history`);
    },

    getBalance: () => {
        return $axios.get(`/transactions/balance`);
    },

    updateUser: (user) => {
        return $axios.post(`/user/update`, user);
    },

    verifyBank: (params) => {
        return $axios.get(
            `/verify/account_no?account_no=${params.account_no}&bank_code=${params.bank_code}`
        );
    },

    submitBank: (params) => {
        return $axios.post(`/banks/save`, params);
    },

    changePass: (params) => {
        return $axios.post(`/user/password/change`, params);
    },

    removeBank: (params) => {
        return $axios.post(`/banks/remove`, params);
    }
}

export default UserActions;
