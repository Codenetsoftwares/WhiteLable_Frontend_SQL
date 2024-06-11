// import strings from "./stringConstant";

class UrlConstant {
  constructor() {}

  url_dev = "http://localhost:8000/api";

  // Admin api
  admin = "admin";
  view = "view";
  login = `${this.url_dev}/${this.admin}-login`;
  Create = `${this.url_dev}/${this.admin}-create`;
  viewBalance = `${this.url_dev}/${this.view}-balance`;
  allCreate = `${this.url_dev}/${this.view}-all-creates`;
  createAdminHierarchy = `${this.url_dev}/${this.admin}-admin-create`;
  createUserRole = `${this.url_dev}/${this.admin}-create-subAdmin`;
  updateCreditRef = `${this.url_dev}/${this.admin}/update-credit-ref`;
}

const urls = new UrlConstant();
export default urls;
