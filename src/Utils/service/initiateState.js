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

// data from server
// {
// "Status": "Active",
// "adminId": "cd4d1c9d-668d-42da-8638-5935eabab035",
// "createdById": null,
// "createdByUser": null,
// "exp": 1717612402,
// "iat": 1717583602,
// "roles": [
//   {
//     "role": "superAdmin",
//     "permission": ["All-Access"]
//   }
// ],
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiY2Q0ZDFjOWQtNjY4ZC00MmRhLTg2MzgtNTkzNWVhYmFiMDM1IiwiY3JlYXRlZEJ5SWQiOm51bGwsImNyZWF0ZWRCeVVzZXIiOm51bGwsInVzZXJOYW1lIjoiZGVtb2FkbWluIiwicm9sZXMiOlt7InJvbGUiOiJzdXBlckFkbWluIiwicGVybWlzc2lvbiI6WyJBbGwtQWNjZXNzIl19XSwiU3RhdHVzIjoiQWN0aXZlIiwiaWF0IjoxNzE3NTgzNjAyLCJleHAiOjE3MTc2MTI0MDJ9.HtbZ6WZ9xrSrpgLJzc2eg0E5ecbaqFie-0QgLGM-O8I",
// "userName": "demoadmin"
// }
