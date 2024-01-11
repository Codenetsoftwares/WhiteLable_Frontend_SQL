import axios from "axios";
const API_HOST = process.env.REACT_APP_API_HOST;

class MyAccountServices {
  getAccountStatement(id, page, fromDate, toDate, user) {
  console.log(fromDate,toDate)
    return axios({
      method: "get",
      url: `${API_HOST}/api/transaction-view/${id}?page=${page}&startDate=${fromDate}&endDate=${toDate}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  // getAccountProfile(id, user) {
  //   return axios({
  //     method: "get",
  //     url: `${API_HOST}/api/User-Profile-view/${id}`,
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   });
  // }

  getActivityLog(username, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/getip/${username}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  getProfile(username, user) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/User-Profile-view/${username}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  changePassword(data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/reset-password`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
}

export default new MyAccountServices();
