export class StringConstants {
  LOGIN = 'login';

  //others
  LOCAL_STORAGE_KEY = 'my_app_state';
  applicationJSON = { 'Content-Type': 'application/json' };

  // http methods
  GET = 'GET';
  POST = 'POST';
  PUT = 'PUT';

  // reducer type

  LOG_IN = 'LOG_IN';
  LOG_OUT = 'LOG_OUT';
}

let strings = new StringConstants();
export default strings;