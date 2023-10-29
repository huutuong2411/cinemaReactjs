// project imports .. Layout
import UserLayout from "../layouts/user";

import HomePage from "../views/user/Home";

// ==============================|| MAIN ROUTING ||============================== //

const AccessUserRoute = {
    path: "/",
    element: <UserLayout />,
    children: [
        {
            path: "/home",
            element: <HomePage />,
        },
        // {
        //     path: '/',
        //     children: [
        //         {
        //             path: 'category',
        //             element: <Category />,
        //         },
        //     ]
        // },
    ],
};

export default AccessUserRoute;
