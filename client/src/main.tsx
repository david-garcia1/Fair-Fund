import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'

import ErrorPage from './Pages/ErrorPage.tsx';
import Home from './Pages/Home.tsx';
import Login from './Pages/Login.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ]
  }
]);

const rootElement = document.getElementById('root');
if(rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
