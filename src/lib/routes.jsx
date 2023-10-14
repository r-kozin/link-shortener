import { createBrowserRouter } from "react-router-dom"
import Dashboard from "../components/dashboard/Dashboard"
import { Layout } from "../layout/Layout"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Redirect } from "../components/redirect/Redirect"
import { Home } from "../components/home/Home"

export const ROOT = '/'
export const LOGIN = '/login'
export const REGISTER = '/register'

export const REDIRECT = '/:shortCode'

export const PROTECTED = '/app'
export const DASHBOARD = '/app/dashboard'


export const routes = createBrowserRouter([
    { path: ROOT, element: <Home /> },
    { path: LOGIN, element: <Login /> },
    { path: REGISTER, element: <Register />},
    { path: REDIRECT, element: <Redirect /> },
    {
      path: PROTECTED,
      element: <Layout />,
      children: [
        {
          path: DASHBOARD,
          element: <Dashboard />,
        },
      ],
    },
  ]);