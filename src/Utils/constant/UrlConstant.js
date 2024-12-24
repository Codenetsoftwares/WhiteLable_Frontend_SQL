// import strings from "./stringConstant";

class UrlConstant {
  constructor() {}
  url_dev = "https://wl.server.dummydoma.in/api";
  // url_dev = "http://localhost:8000/api";

  // Admin api
  admin = "admin";
  view = "view";
  user = "user";
  get = "get";

  login = `${this.url_dev}/${this.admin}-login`;
  Create = `${this.url_dev}/${this.admin}-create`;
  viewBalance = `${this.url_dev}/${this.view}-balance`;
  allCreate = `${this.url_dev}/${this.view}-all-creates`;
  createAdminHierarchy = `${this.url_dev}/${this.admin}-admin-create`;
  createUserRole = `${this.url_dev}/${this.admin}-create-subAdmin`;
  updateCreditRef = `${this.url_dev}/${this.admin}/update-credit-ref`;
  updatePartnership = `${this.url_dev}/${this.admin}/update-partnership`;
  transferAmount = `${this.url_dev}/transfer-amount`;
  addCash = `${this.url_dev}/${this.admin}/deposit-amount`;
  viewPartnership = `${this.url_dev}/partnershipView`;
  viewCreditRefLog = `${this.url_dev}/creditRefView`;
  getHierarchy = `${this.url_dev}/Root-Path`;
  createSubAdmin = `${this.url_dev}/${this.admin}/create-subAdmin`;
  allSubAdmin = `${this.url_dev}/${this.view}-all-subAdmin-creates`;
  viewSubAdminPermission = `${this.url_dev}/${this.admin}/single-sub-admin`;
  editSubAdminPermission = `${this.url_dev}/${this.admin}/edit-subadmin-permissions`;
  UserProfileView = `${this.url_dev}/User-Profile-view`;
  allTransactionView = `${this.url_dev}/transaction-view`;
  AccountStatement = `${this.url_dev}/${this.admin}/account-statement`;
  moveToTrash = `${this.url_dev}/${this.admin}/move-to-trash-user`;
  viewTrash = `${this.url_dev}/${this.admin}/view-trash`;
  deleteTrash = `${this.url_dev}/delete/admin-user`;
  restoreTrash = `${this.url_dev}/${this.admin}/restore-to-wallet-use`;
  activityLog = `${this.url_dev}/get-ip`;
  resetPasswordAdmin = `${this.url_dev}/${this.admin}/reset-password`;
  View_AddCash_history = `${this.url_dev}/${this.view}-main-balance`;
  getGameNames = `${this.url_dev}/${this.user}-colorGame-games`;
  getBetHistory = `${this.url_dev}/${this.user}-colorGame-betHistory`;
  getProfitLossGame = `${this.url_dev}/${this.user}-colorGame-profitLoss`;
  getProfitLossEvent = `${this.url_dev}/${this.user}-colorGame-market_profitLoss`;
  getProfitLossRunner = `${this.url_dev}/${this.user}-colorGame-runner_profitLoss`;
  get_Live_BetGame = `${this.url_dev}/${this.get}-live-betGames`;
  get_user_BetMarket = `${this.url_dev}/${this.get}-userBetMarket`;
  activeInactive = `${this.url_dev}/activate`;
  betList = `${this.url_dev}/get-colorGame-user-betList`;
  getLotteryBetHistory = `${this.url_dev}/${this.get}-lottery-bet-history`;
  getLotteryProfitLossEvent = `${this.url_dev}/lottery-profit-loss`;
  betLotteryList = `${this.url_dev}/lottery-betHistory-profitLoss`;
  getLiveUsers = `${this.url_dev}/get-live-users`;
  getBetBook = `${this.url_dev}/${this.get}-user-master-book`;
  resetPassword = `${this.url_dev}/login-reset-password`; // api needs to be changed
  betLotteryMarketAnalysis = `${this.url_dev}/${this.get}-lottery-marketAnalysis`;
}

const urls = new UrlConstant();
export default urls;
