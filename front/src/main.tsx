import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './error-page.tsx';
import Login from './modules/Login/Login.tsx';
import Register from './modules/Register/Register.tsx';
import AuthLayout from './layouts/AuthLayout/AuthLayout.tsx';
import MainLayout from './layouts/MainLayout/MainLayout.tsx';
import SendEmail from './modules/SendEmail/SendEmail.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,  // Wrapped with AuthenticatedLayout
    children: [
      {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
      },
      {
        path: "/send",
        element: <SendEmail />,
        errorElement: <ErrorPage />
      },
      // Add other authenticated routes here
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
