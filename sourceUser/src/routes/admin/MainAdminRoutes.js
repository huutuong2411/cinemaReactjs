import { lazy } from 'react';

// project imports
import AdminLayout from '../../layouts/admin';
import Loadable from '../../components/Loadable';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('../../views/admin/dashboard/index.js')));
const Category = Loadable(lazy(() => import('../../views/admin/category/index.js')))
const TrashCategory = Loadable(lazy(() => import('../../views/admin/category/TrashCategory.js')))
const Theater = Loadable(lazy(() => import('../../views/admin/theater/index.js')))
const TrashTheater = Loadable(lazy(() => import('../../views/admin/theater/TrashTheater.js')))


// ==============================|| MAIN ROUTING ||============================== //

const MainAdminRoutes = {
    path: '/',
    element: <AdminLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/admin',
            children: [
                {
                    path: 'dashboard',
                    element: <DashboardDefault />
                },
            ]
        },
        {
            path: '/admin',
            children: [
                {
                    path: 'category',
                    element: <Category />,
                },
            ]
        },
        {
            path: '/admin',
            children: [
                {
                    path: 'category/trash',
                    element: <TrashCategory />
                },
            ]
        },
        {
            path: '/admin',
            children: [
                {
                    path: 'theater',
                    element: <Theater />
                },
            ]
        },
        {
            path: '/admin',
            children: [
                {
                    path: 'theater/trash',
                    element: <TrashTheater />
                },
            ]
        },


    ]
};

export default MainAdminRoutes;
