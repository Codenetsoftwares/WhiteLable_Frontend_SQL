import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { AppProvider } from './contextApi/context';
import Login from './pages/Login';

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
            <Route path="/" element={<Login />} />

          </Routes>
        </BrowserRouter>
      </AppProvider>
    </React.Fragment>
  );
}

export default App;
