export function getAdminInitialState(body = {}) {
  return {
    accessToken: body?.accessToken ?? "",
    status: body?.status ?? "",
    adminName: body?.userName ?? "",
    id: body?.adminId ?? "",
    roles: body?.roles ?? [],
    createdById: body?.createdById ?? null,
    createdByUser: body?.createdByUser ?? null,
  };
}

export function getAuthForm(body = {}) {
  return {
    userName: "",
    password: "",
  };
}

export function getAllCreateState(body = {}) {
  return {
    userList: [],
    currentPage: 1,
    totalPages: "",
    totalEntries: 5,
    name: "",
    totalData: "",
  };
}

export function getCreditRefAndPartnership(body = {}) {
  return {
    data: [
      {
        date: "",
        value: 0,
      },
    ],
  };
}

export function getCreateSubAdmin(body = {}) {
  return {
    userName: "",
    password: "",
    roles: [
      {
        permission: [],
      },
    ],
  };
}

export function getAllSubAdminCreateState(body = {}) {
  return {
    userList: [],
    currentPage: 1,
    totalPages: "",
    totalEntries: 5,
    name: "",
    totalData: "",
  };
}

export function getSubAdminPermissionData(body = {}) {
  return {
    userName: "",
    roles: [],
  };
}

export function getHierarchyState(body = {}) {
  return {
    path: [],
    userDetails: {},
    currentPage: 0,
    totalPages: 0,
    totalEntries: 5,
  };
}
