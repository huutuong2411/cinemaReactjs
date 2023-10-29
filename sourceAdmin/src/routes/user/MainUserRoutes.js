// project imports .. Layout
import UserLayout from "../../layouts/user";

// Page or View
import HomePage from "../../views/user/Home";
import Movie from "../../views/user/Movie";

// ==============================|| MAIN ROUTING ||============================== //

const MainUserRoutes = {
  path: "/",
  element: <UserLayout />,
  children: [
    {
      path: "home",
      element: <HomePage />
    },
    {
      path: "movie",
      element: <Movie />,
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

export default MainUserRoutes;
