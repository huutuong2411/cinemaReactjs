import { lazy } from 'react';

import Loadable from '../components/Loadable';

const AuthLogin = Loadable(lazy(() => import('../views/admin/authentication/login.js')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/login',
    element: <AuthLogin />
};

export default AuthenticationRoutes;