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


export async function viewCreatedUser_api(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(`${UrlConstant.ViewCreatedUser}/${body.id}`,callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}



export async function viewBalance_api(body = {}, isToast = false) {
  try {
    const callParams = await getAuthCallParams(strings.GET, body, isToast);
    const response = await makeCall(`${UrlConstant.ViewBalance}/${body.id}`,callParams, isToast);
    return response;
  } catch (error) {
    throw error;
  }
}