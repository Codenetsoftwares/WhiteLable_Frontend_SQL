import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./contextApi/context";
import Login from "./pages/Login";
import AdminLayout from "./layout/AdminLayout";
import Temp from "./screen/Temp";
import AllAdminCreate from "./pages/AllAdminCreate";
import Wallet from "./pages/Wallet";

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
              <Route path="wallet" element={<Wallet/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </React.Fragment>
  );
}

export default App;
