import string from '../constants/string';

export const permissionObj = {
  allAdmin: [string.superAdmin, string.whiteLabel, string.hyperAgent, string.superAgent, string.masterAgent],
  allSubAdmin: [
    string.subAdmin,
    string.subWhiteLabel,
    string.subHyperAgent,
    string.subSuperAgent,
    string.subMasterAgent,
  ],
};
