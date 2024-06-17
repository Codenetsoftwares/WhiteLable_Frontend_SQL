import UrlConstant from "../constant/UrlConstant";
import strings from "../constant/stringConstant";
import { getAuthCallParams, getNoAuthCallParams, makeCall } from "./service";

export async function login(body, isToast = false) {
  try {
    const callParams = getNoAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(UrlConstant.login, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function allAdminCreate(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(UrlConstant.Create, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function viewBalance(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(
      `${UrlConstant.viewBalance}/${body._id}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getAllCreate(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(
      `${UrlConstant.allCreate}/${body._id}?page=${body.pageNumber}&pageSize=${body.dataLimit}&userName=${body.name}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateCreditRef(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.PUT, body.data, isToast);
    const response = await makeCall(
      `${UrlConstant.updateCreditRef}/${body.id}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updatePartnership(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.PUT, body.data, isToast);
    const response = await makeCall(
      `${UrlConstant.updatePartnership}/${body.id}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function transferAmount(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(
      strings.POST,
      body.data,
      isToast
    );
    const response = await makeCall(
      `${UrlConstant.transferAmount}/${body.adminId}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function addCash(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(
      strings.POST,
      body.data,
      isToast
    );
    const response = await makeCall(
      `${UrlConstant.addCash}/${body.adminId}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getPartnershipLog(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(
      `${UrlConstant.viewPartnership}/${body.id}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getCreditRefLog(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(
      `${UrlConstant.viewCreditRefLog}/${body.id}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function createSubAdmin(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(
      `${UrlConstant.createSubAdmin}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getAllSubAdminCreate(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(
      `${UrlConstant.allSubAdmin}/${body._id}?page=${body.pageNumber}&pageSize=${body.dataLimit}&userName=${body.name}`,
      callParams,
      isToast
    );

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getHierarchy(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(
      `${UrlConstant.getHierarchy}/${body.adminName}/${body.action}?pageSize=${body.totalEntries}&page=${body.pageNumber}&searchName=${body.searchName}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getviewSubAdminPermission(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(
      `${UrlConstant.viewSubAdminPermission}/${body._id}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getEditSubAdminPermission(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.PUT, body, isToast);
    const response = await makeCall(
      `${UrlConstant.editSubAdminPermission}/${body._id}`,
      callParams,
      isToast
    );
    return response;
  } catch (error) {
    throw error;
  }
}
