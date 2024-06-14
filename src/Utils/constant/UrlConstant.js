// import strings from "./stringConstant";

class UrlConstant {
  constructor() { }

  url_dev = 'http://localhost:8000/api';

  // Admin api
  admin = 'admin';
  view = 'view'
  login = `${this.url_dev}/${this.admin}-login`;
  Create = `${this.url_dev}/${this.admin}-create`;
  viewBalance = `${this.url_dev}/${this.view}-balance`;
  allCreate = `${this.url_dev}/${this.view}-all-creates`;
  createAdminHierarchy = `${this.url_dev}/${this.admin}-admin-create`;
  createSubAdmin = `${this.url_dev}/${this.admin}/create-subAdmin`;
  allSubAdmin = `${this.url_dev}/${this.view}-all-subAdmin-creates`;
  viewSubAdminPermission = `${this.url_dev}/${this.admin}/single-sub-admin`;
  editSubAdminPermission = `${this.url_dev}/${this.admin}/edit-subadmin-permissions`;
  UserProfileView=`${this.url_dev}/User-Profile-view`;
  allTransactionView=`${this.url_dev}/transaction-view`;
}

const urls = new UrlConstant();
export default urls;
