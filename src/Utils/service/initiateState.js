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


export function viewCreatedUser(){
return {
  
  
    userName: "",
    roles: [
        {
            role: "",
            permission: [
                ""
            ]
        }
    ],
    balance: 0,
    loadBalance: 0 ,
    creditRefs: [],
    createdById: "",
    partnerships: [],
    status: ""
}



}


