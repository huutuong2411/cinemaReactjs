import { useRoutes } from "react-router-dom";

// routes

import MainUserRoutes from "./user/MainUserRoutes";
import AuthenUserRoutes from "./user/AuthenUserRoutes";
import RegisterUserRoutes from "./RegisterUserRoutes";
// ==============================|| ROUTING RENDER ||============================== //

export function UserRoutes() {
  return useRoutes([MainUserRoutes]);
}
export function AuthenRoutes() {
  return useRoutes([AuthenUserRoutes]);
}

export function RegisterRoutes() {
  return useRoutes([RegisterUserRoutes]);
}
