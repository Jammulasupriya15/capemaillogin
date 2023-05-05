import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit"
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider authStorageType="localStorage">
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

