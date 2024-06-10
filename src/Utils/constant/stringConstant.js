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


  // roles
  superAdmin = 'superAdmin';
  whiteLabel = '?page=${body.pageNumber}&pageSize=${body.dataLimit}';
  hyperAgent = 'hyperAgent';
  superAgent = 'superAgent';
  masterAgent = 'masterAgent';
  subWhiteLabel = 'subWhiteLabel';
  subAdmin = 'subAdmin';
  subHyperAgent = 'subHyperAgent';
  subSuperAgent = 'subSuperAgent';
  subMasterAgent = 'subMasterAgent';
  createAdmin = 'createAdmin';

  // permission
  createSubAdmin = 'create-subAdmin';
  transferBalance = 'transferBalance';
  status = 'status';
  creditRefEdit = 'creditRef-Edit';
  partnershipEdit = 'partnership-Edit';
  creditRefView = 'creditRef-View';
  partnershipView = 'partnership-view';
  userProfileView = 'user-profile-view';
  profileView = 'profile-view';
  viewAdminData = 'view-admin-data';
  createAdmin = 'create-Admin';
  createUser = 'create-user';
  accountStatement = 'accountStatement';
  activityLog = 'activityLog';
  deleteAdmin = 'delete-admin';
  restoreAdmin = 'restore-admin';
  moveToTrash = 'move-to-trash';
  trashView = 'trash-view';

}

let strings = new StringConstants();
export default strings;
