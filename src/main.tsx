import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home';
import LoginComponent from './components/login/LoginComponent.tsx';
import RegisterComponent from './components/register/RegisterComponent.tsx';
import WelcomeComponent from './components/WelcomeComponent.tsx';
import GuardAuth from './serives/GuardAuth.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <LoginComponent />,
  },
  {
    path: "register",
    element: <RegisterComponent />,
  },
  {
    path: "welcome",
    element: <GuardAuth>
      <WelcomeComponent />
    </GuardAuth>,
  }

]);
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
