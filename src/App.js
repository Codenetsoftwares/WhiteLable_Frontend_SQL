import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./contextApi/context";
import Login from "./pages/Login";
import AdminLayout from "./Layout/AdminLayout";
import AllAdminCreate from "./pages/AllAdminCreate";
import Wallet from "./pages/Wallet";
import CreateSubAdmin from "./pages/CreateSubAdmin";
import SubAdminView from "./pages/SubAdminView";
import ViewSubAdminPermission from "./pages/ViewSubAdminPermission";
import HierarchyPageView from "./components/HierarchyPageView";
import AccountLandingModal from "./profileAccount/AccountLandingModal";

import AdminAccountStatement from "./pages/AdminAccountStatement";
import AgentDelete from "./pages/AgentDelete";
import WelcomePage from "./pages/welcomepage/WelcomePage";
import View_AddCash_history from "./pages/View_AddCash_history";
import Market_Analysis from "./pages/Market_Analysis";
import User_BetMarket from "./pages/User_BetMarket";
import BetHistoryForPl from "./profileAccount/BetHistoryForPl";
import BetHistoryLotteryForPl from "./profileAccount/BetHistoryLotteryForPl";
import { DemoMarket_Analysis } from "./pages/DemoMarket_Analysis";
import PrivateRoute from "./components/common/privateRoute";
import NotFound from "./components/common/notFound";
// import WelcomePage from "./screen/WelcomePage";

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
            <Route index path="/" element={<Navigate to="/login" />} />
            <Route path = "/login" element={<Login/>} />
            <Route path="/" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
              <Route path="welcome" element={<WelcomePage />} />
              <Route path="allAdminCreate" element={<AllAdminCreate />} />
              <Route
                path="/adminaccountstatement"
                element={<AdminAccountStatement />}
              />
              <Route path="/agentDelete" element={<AgentDelete />} />
              <Route
                path="hierarchyView/:userName"
                element={<HierarchyPageView />}
              />
              <Route
                path="/account-landing/:userName"
                element={<AccountLandingModal />}
              />
              <Route path="wallet" element={<PrivateRoute><Wallet /></PrivateRoute>} />
              <Route path="CreateSubAdmin" element={<PrivateRoute><CreateSubAdmin /></PrivateRoute>} />
              <Route path="Demo" element={<PrivateRoute><DemoMarket_Analysis /></PrivateRoute>} />
              <Route path="ViewAllSubAdmin" element={<PrivateRoute><SubAdminView /></PrivateRoute>} />
              <Route
                path="ViewSubAdminPermission/:id"
                element={<PrivateRoute><ViewSubAdminPermission /></PrivateRoute>}
              />
              <Route
                path="View_AddCash_history"
                element={<PrivateRoute><View_AddCash_history /></PrivateRoute>}
              />
              <Route path="Market_analysis" element={<PrivateRoute><Market_Analysis /></PrivateRoute>} />
              <Route
                path="betHistForPL/:userName/:runnerId"
                element={<PrivateRoute><BetHistoryForPl /></PrivateRoute>}
              />
              <Route
                path="/User_BetMarket/:marketId"
                element={<PrivateRoute><User_BetMarket /></PrivateRoute>}
              />
              <Route
                path="betHistLotteryForPL/:userName"
                element={<PrivateRoute><BetHistoryLotteryForPl/></PrivateRoute>}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </React.Fragment>
  );
}

export default App;
