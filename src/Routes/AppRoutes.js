import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "../Utils/RequireAuth";
import Authform from "../Components/AuthForm";
import Login from "../Pages/Accounts/Login/Login";
import ErrorPage from "../ErrorPage";
import AdminLayout from "../Components/Layout/AdminLayout";
import Welcome from "../Pages/Welcome/Welcome";
import Create from "../Pages/Accounts/Login/Create";
import PartnershipViewLog from "../Pages/PartnershipViewLog";
import MainTransaction from "../Components/MainTransaction";
import AgentDelete from "../Components/AgentDelete";
import AccountLandingModal from "../Components/MyAccount/AccountLandingModal";
import HierarchyPageView from "../Components/HierarchyPageView";
import CreateSub from "../Components/CreateSub";
import ViewExistingUserRoles from "../Components/UserRole/ViewExistingUserRole";
import SingleExistingUserRoleView from "../Components/UserRole/SingleExistingUserRoleView";

const AppRoutes = () => {
  const userrole = sessionStorage.getItem("role") || "";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="authform" element={<Authform />} />
        <Route index element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route
            path="welcome"
            element={
              <RequireAuth>
                <Welcome />
              </RequireAuth>
            }
          />
          <Route
            path="Create"
            element={
              <RequireAuth>
                <Create />
              </RequireAuth>
            }
          />
          <Route
            path="partnershipViewLog/:userId"
            element={
              <RequireAuth>
                <PartnershipViewLog />
              </RequireAuth>
            }
          />

          <Route
            path="maintransaction"
            element={
              <RequireAuth>
                <MainTransaction />
              </RequireAuth>
            }
          />
          <Route
            path="agentDelete"
            element={
              <RequireAuth>
                <AgentDelete />
              </RequireAuth>
            }
          />
          <Route
            path="/account-landing/:userId"
            element={
              <RequireAuth>
                <AccountLandingModal />
              </RequireAuth>
            }
          />
          <Route
            path="hierarchypageview/:userId"
            element={
              <RequireAuth>
                <HierarchyPageView />
              </RequireAuth>
            }
          />
          <Route
            path="/AddUserRole"
            element={
              <RequireAuth>
                <CreateSub />
              </RequireAuth>
            }
          />

          <Route
            path="/ExistingRoles"
            element={
              <RequireAuth>
                <ViewExistingUserRoles />
              </RequireAuth>
            }
          />

          <Route
            path="/SingleExistingRoles/:id"
            element={
              <RequireAuth>
                <SingleExistingUserRoleView/>
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
