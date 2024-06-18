import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./contextApi/context";
import Login from "./pages/Login";
import AdminLayout from "./layout/AdminLayout";
import Temp from "./screen/Temp";
import AllAdminCreate from "./pages/AllAdminCreate";
import Wallet from "./pages/Wallet";
import CreateSubAdmin from "./pages/CreateSubAdmin";
import SubAdminView from "./pages/SubAdminView";
import ViewSubAdminPermission from "./pages/ViewSubAdminPermission";
import HierarchyPageView from './components/HierarchyPageView';
import AccountLandingModal from "./profileAccount/AccountLandingModal";

import AdminAccountStatement from "./pages/AdminAccountStatement";
import AgentDelete from "./pages/AgentDelete";

function App() {
  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/" element={<AdminLayout />}>
              <Route path="welcome" element={<Temp />} />
              <Route path="allAdminCreate" element={<AllAdminCreate />} />
              <Route path="/adminaccountstatement" element={<AdminAccountStatement/>} />
              <Route path="/agentDelete" element={<AgentDelete/>} />
              <Route path="hierarchyView/:userName" element={<HierarchyPageView />} />
              <Route path="/account-landing/:userName" element={<AccountLandingModal />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="CreateSubAdmin" element={<CreateSubAdmin />} />
              <Route path="ViewAllSubAdmin" element={<SubAdminView />} />
              <Route path="ViewSubAdminPermission/:id" element={<ViewSubAdminPermission />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </React.Fragment>
  );
}

export default App;
