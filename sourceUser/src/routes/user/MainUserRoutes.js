// project imports .. Layout
import UserLayout from "../../layouts/user";

// Page or View
import HomePage from "../../views/User/Home";
import Movie from "../../views/User/Movie";
import MovieDetail from "../../views/User/MovieDetail";

// ==============================|| MAIN ROUTING ||============================== //

const MainUserRoutes = {
  path: "/",
  element: <UserLayout />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/confirm",
      element: <HomePage />,
    },
    {
      path: "/movie",
      element: <Movie />,
    },
    {
      path: "/movie/:movieName/:id",
      element: <MovieDetail />,
    },
  ],
};

export default MainUserRoutes;
