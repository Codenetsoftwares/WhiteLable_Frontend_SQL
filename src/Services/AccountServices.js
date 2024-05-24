import axios from "axios";
const API_HOST = process.env.REACT_APP_API_HOST;

class AccountService {
  AllLogin(data) {
    return axios({
      method: "POST",
      url: API_HOST + "/api/admin-login",
      data: data,
    });
  }

  AllCreate(data, user) {
    return axios({
      method: "POST",
      url: API_HOST + "/api/admin-create",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  UserCreate(data, user) {
    return axios({
      method: "POST",
      url: API_HOST + "/api/admin/Create-user",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  getAllCreates(id, page, name, totalEntries, user) {
    console.log(totalEntries);
    return axios({
      method: "get",
      url: `${API_HOST}/api/view-all-creates/${id}?page=${page}&searchName=${name}&pageSize=${totalEntries}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  deleteAgent(data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/move-to-trash-user`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  ActiveInactive(data, id, user) {
    console.log(data, id);
    return axios({
      method: "POST",
      url: `${API_HOST}/api/activate/${id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  ViewAgentDelete(user) {
    return axios({
      method: "get",
      url: API_HOST + "/api/admin/view-trash",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  IsAgentDeleteApprove(_id, user) {
    return axios({
      method: "delete",
      url: `${API_HOST}/api/delete/admin-user/${_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  restoreAgent(data, user) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/admin/restore-to-wallet-user`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  getActiveStatus(_id, user) {
    return axios({
      method: "GET",
      url: `${API_HOST}/api/admin/active-status/${_id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  getHierarchy(userName, action, user, data, totalEntries) {
    console.log(user);
    console.log("Pagesize from getHierarchy", totalEntries);
    return axios({
      method: "post",
      url: `${API_HOST}/api/Root-Path/${userName}/${action}?pageSize=${totalEntries}`,
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  getPartnershipData(id, user) {
    return axios({
      method: "GET",
      url: `${API_HOST}/api/partnershipView/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  getCreditRefBalance(id, user) {
    return axios({
      method: "GET",
      url: `${API_HOST}/api/creditRefView/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  
  getViewSubUserRole(id, page, name, totalEntries, user) {
    console.log(name)
    return axios({
      method: "GET",
      url: `${API_HOST}/api/admin/view-sub-admins/${id}?page=${page}&searchName=${name}&pageSize=${totalEntries}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  getSingleViewSubUserRole(id, user) {
    return axios({
      method: "POST",
      url: `${API_HOST}/api/admin/single-sub-admin/${id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

 RenewPermission( id, user, data) {
    return axios({
      method: "PUT",
      url: `${API_HOST}/admin/edit-subadmin-permissions/${id}`,
       data: data ,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },

    });
  }
  

  SubCreate(data, user) {
    return axios({
      method: "POST",
      url: API_HOST + "/api/admin/create-subAdmin",
      data: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  ViewUserRole(id, page, name, totalEntries, user) {
    console.log(name)
    return axios({
      method: "GET",
      url: `${API_HOST}/api/view-all-subAdmin-creates/${id}?page=${page}&searchName=${name}&pageSize=${totalEntries}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

}

export default new AccountService();
