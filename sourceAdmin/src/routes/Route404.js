import { lazy } from 'react';

import Loadable from '../components/Loadable';

const Page404 = Loadable(lazy(() => import('../views/Page404')));

// ==============================|| 404 ROUTING ||============================== //

const ErrorPage = {
    path: '/*',
    element: < Page404 />
};

export default ErrorPage;