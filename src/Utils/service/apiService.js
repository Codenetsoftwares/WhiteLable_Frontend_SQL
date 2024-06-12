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
    const callParams = await getAuthCallParams(strings.POST, body.data, isToast);
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
