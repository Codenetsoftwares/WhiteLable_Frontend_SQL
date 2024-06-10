// import strings from "./stringConstant";

class UrlConstant {
  constructor() {}

  url_dev = 'http://localhost:8000/api';

  // Admin api
  admin = 'admin';
  login = `${this.url_dev}/${this.admin}-login`;
  Create = `${this.url_dev}/${this.admin}-create`;
  createAdminHierarchy = `${this.url_dev}/${this.admin}-admin-create`;
  createUserRole = `${this.url_dev}/${this.admin}-create-subAdmin`;
  ViewCreatedUser = `${this.url_dev}/view-all-creates`;
  ViewBalance = `${this.url_dev}/view-balance`;
  
}

const urls = new UrlConstant();
export default urls;
