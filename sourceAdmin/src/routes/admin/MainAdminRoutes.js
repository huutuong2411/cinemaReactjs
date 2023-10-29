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
const Movie = Loadable(lazy(() => import('../../views/admin/Movie/index.js')))
const RoomAddition = Loadable(lazy(() => import('../../views/admin/room/RoomAddition.js')))
const TheaterDetail = Loadable(lazy(() => import('../../views/admin/theater/TheaterDetail.js')))
const RoomEdit = Loadable(lazy(() => import('../../views/admin/room/RoomEdit.js')))
const ShowTime = Loadable(lazy(() => import('../../views/admin/showtime/index.js')))
const ShowTimeDetail = Loadable(lazy(() => import('../../views/admin/showtime/ShowtimeDetail.js')))
const TrashRoom = Loadable(lazy(() => import('../../views/admin/room/TrashRoom.js')))
const Page404 = Loadable(lazy(() => import('../../views/Page404')));

// ==============================|| MAIN ROUTING ||============================== //

const MainAdminRoutes = {
    path: '/admin',
    element: <AdminLayout />,
    children: [
        {
            path: 'dashboard',
            element: <DashboardDefault />
        },
        {
            path: 'category',
            element: <Category />
        },
        {
            path: 'category/trash',
            element: <TrashCategory />
        },
        {
            path: 'theater',
            element: <Theater />
        },
        {
            path: 'theater/trash',
            element: <TrashTheater />
        },
        {
            path: 'theater/:id',
            element: <TheaterDetail />
        },
        {
            path: 'movie',
            element: <Movie />
        },
        {
            path: 'room-addition/:id',
            element: <RoomAddition />
        },
        {
            path: 'room-edit/:id',
            element: <RoomEdit />
        },
        {
            path: 'room/trash',
            element: <TrashRoom />
        },
        {
            path: 'show-time',
            element: <ShowTime />
        },
        {
            path: 'showtime-detail-by-theater/:id',
            element: <ShowTimeDetail />
        },
        // {
        //     path: '*',
        //     element: <Page404 />
        // },

    ],

};

export default MainAdminRoutes;
