import axios from "axios";
const API_HOST = process.env.REACT_APP_API_HOST;

class TransactionServices {
  depositAmount(data, id, user) {
    return axios({
      method: "POST",
      url: `${API_HOST}/api/admin/deposit-amount/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  viewBalance(id, user) {
    return axios({
      method: "GET",
      url: `${API_HOST}/api/view-balance/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  transferBalance(id, data, user) {
    return axios({
      method: "POST",
      url: `${API_HOST}/api/transfer-amount/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  viewTransactions(id, user) {
    return axios({
      method: "GET",
      url: `${API_HOST}/api/transaction-view/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  EditCreditref(data, id, user) {
    return axios({
      method: "Put",
      url: `${API_HOST}/api/admin/update-credit-ref/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  EditPartnership(data, id, user) {
    return axios({
      method: "Put",
      url: `${API_HOST}/api/admin/update-partnership/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  GetAdminAccStatement(id, user ,page , totalEntries) {
    return axios({
      method: "GET",
      url:  `${API_HOST}/api/admin/account-statement/${id}?page=${page}&pageSize=${totalEntries}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

}


export default new TransactionServices();
