import { useRoutes } from 'react-router-dom';

// routes
import MainAdminRoutes from './admin/MainAdminRoutes';
import AuthenticationRoutes from 'src/routes/AuthenRoutes.js';
import ErrorPage from './Route404';
// import MainUserRoutes from './user/MainUserRoutes';
// import AccessUserRoute from 'src/routes/AccessUserRoute';


// ==============================|| ROUTING RENDER ||============================== //

export function AdminRoutes() {
    return useRoutes([MainAdminRoutes]);
}
export function AuthenRoutes() {
    return useRoutes([AuthenticationRoutes])
}
export function Page404() {
    return useRoutes([ErrorPage])
}
// export function UserRoutes() {
//     return useRoutes([MainUserRoutes])
// }
// export function AccessUserRoutes() {
//     return useRoutes([AccessUserRoute])
// }
