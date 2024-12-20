import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';


import App from './App.tsx'
import { AuthProvider } from './Components/AuthContext/AuthContext.tsx';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)

