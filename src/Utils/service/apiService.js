import UrlConstant from '../constant/UrlConstant';
import strings from '../constant/stringConstant';
import { getAuthCallParams, getNoAuthCallParams, makeCall } from './service';

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
    const response = await makeCall(`${UrlConstant.viewBalance}/${body._id}`, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getAllCreate(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(`${UrlConstant.allCreate}/${body._id}?page=${body.pageNumber}&pageSize=${body.dataLimit}&userName=${body.name}`, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}


export async function getAccountStatement_api(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(`${UrlConstant.AccountStatement}/${body._id}?page=${body.pageNumber}&pageSize=${body.dataLimit}`, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}


export async function moveToTrash_api(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(UrlConstant.moveToTrash, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}



export async function viewTrash_api(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(UrlConstant.viewTrash, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteTrash_api(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.DELETE, body, isToast);
    const response = await makeCall(`${UrlConstant.deleteTrash}/${body.trashId}`, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function restoreTrash_api(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.POST, body, isToast);
    const response = await makeCall(UrlConstant.restoreTrash, callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}