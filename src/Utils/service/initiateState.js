export function getAdminInitialState(body = {}) {
  return {
    accessToken: body?.accessToken ?? '',
    status: body?.status ?? '',
    adminName: body?.userName ?? '',
    id: body?.adminId ?? '',
    roles: body?.roles ?? [],
    createdById: body?.createdById ?? null,
    createdByUser: body?.createdByUser ?? null,
  };
}


export function getAuthForm(body = {}) {
  return {
    userName: "", password: ""
  }
}

export function getAllCreateState(body = {}) {
  return { userList: [], currentPage: 1, totalPages: "", totalEntries: 5, name: "",  }
}