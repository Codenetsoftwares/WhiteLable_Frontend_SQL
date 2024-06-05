import AdminLayout from "./Components/Layout/AdminLayout";
import { AuthProvider } from "./Utils/Auth";
import { RequireAuth } from "./Utils/RequireAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./Pages/Accounts/Login/Login";
import ErrorPage from "./ErrorPage";
import Welcome from "./Pages/Welcome/Welcome";
import Authform from "./Components/AuthForm";
import Create from "./Pages/Accounts/Login/Create";
import UserCreate from "./Pages/Accounts/Login/UserCreate";
import { ToastContainer, toast } from "react-toastify";
import MainTransaction from "./Components/MainTransaction";
import AgentDelete from "./Components/AgentDelete";
import AccountLandingModal from "./Components/MyAccount/AccountLandingModal";
import HierarchyPageView from "./Components/HierarchyPageView";
import PartnershipViewLog from "./Pages/PartnershipViewLog";
import AppRoutes from "./Routes/AppRoutes";
import { AppProvider } from "./contextApi/context";

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
        <AppRoutes />
      </AppProvider>
    </React.Fragment>
  );
}

export default App;
