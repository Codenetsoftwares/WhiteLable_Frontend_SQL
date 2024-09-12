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

export function adminAccountStatement(body = {}) {
  return {
    accountDetails: [],
    currentPage: 1,
    totalPages: "",
    totalEntries: 5,
    name: "",
    totalData: "",
  };
}

export function accountStatementInitialState(body = {}) {
  return {
    statementView: [],
    activityView: [],
    profileView: {
      roles: [
        {
          role: null
        },
      ],
    },
    toggle: 1,
    activeItem: "statement",
    currentPage: 1,
    totalPages: 0,
    endDate: new Date(),
    totalData: 0,
    startDate: (() => {
      const date = new Date();
      date.setDate(date.getDate() - 7);
      return date;
    })(),
  };
}

export function activeInactiveInitialState(body = {}) {
  return {
    active: true,
    btncolor1: false,
    btncolor2: false,
    btncolor3: false,
    lock: true,
    password: "",
    isClicked: false,
  };
}

export function adminAccountStatementInitialState() {
  return {
    statement: [],
    currentPage: 1,
    totalPages: 0,
    totalEntries: 5,
    totalData: 0,
  };
}
export function view_AddCashHistory_InitialState() {
  return {
    history: [],
    currentPage: 1,
    totalPages: 0,
    totalEntries: 10,
    totalData: 0,
  };
}
export function get_liveGames(body = {}) {
  return {
    data: [],
    currentPage: 1,
    totalPages: "",
    totalEntries: 5,
    name: "",
    totalData: "",
  };
}
