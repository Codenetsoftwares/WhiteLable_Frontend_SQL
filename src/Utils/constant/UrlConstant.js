// import strings from "./stringConstant";

class UrlConstant {
  constructor() {}

  url_dev = 'http://localhost:8000/api';

  // Admin api
  admin = 'admin';
  view='view'
  login = `${this.url_dev}/${this.admin}-login`;
  Create = `${this.url_dev}/${this.admin}-create`;
  viewBalance = `${this.url_dev}/${this.view}-balance`;
  allCreate = `${this.url_dev}/${this.view}-all-creates`;
  createAdminHierarchy = `${this.url_dev}/${this.admin}-admin-create`;
  createUserRole = `${this.url_dev}/${this.admin}-create-subAdmin`;
  AccountStatement= `${this.url_dev}/${this.admin}/account-statement`;
  moveToTrash= `${this.url_dev}/${this.admin}/move-to-trash-user`;
  viewTrash= `${this.url_dev}/${this.admin}/view-trash`;
  deleteTrash= `${this.url_dev}/delete/admin-user`;
  restoreTrash=`${this.url_dev}/${this.admin}/restore-to-wallet-use`;
}

const urls = new UrlConstant();
export default urls;
