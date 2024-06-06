import React from 'react';
import { ToastContainer } from 'react-toastify';
import { AppProvider } from './contextApi/context';

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
      <AppProvider></AppProvider>
    </React.Fragment>
  );
}

export default App;
