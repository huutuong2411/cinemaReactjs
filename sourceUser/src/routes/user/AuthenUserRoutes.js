import { lazy } from "react";

// project imports
import Loadable from "../../components/Loadable";

// import MinimalLayout from 'layout/MinimalLayout';

//login option 3 routing
const AuthLogin = Loadable(
  lazy(() => import("../../views/admin/authentication/login.js"))
);

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenUserRoutes = {
  path: "/login",
  element: <AuthLogin />,
};

export default AuthenUserRoutes;
