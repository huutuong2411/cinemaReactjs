import './App.css';
// Routing
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { AdminRoutes, AuthenRoutes, Page404 } from './routes';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate()
  const currentRoute = useLocation().pathname.substring(1)

  useEffect(() => {

    const isLogin = JSON.parse(localStorage.getItem('isLogin'));
    if (!isLogin) {
      navigate("/login")
    } else if (canAccessRoute(currentRoute) === "login") {
      navigate("/admin/dashboard")
    } 

  }, [])

  function canAccessRoute(currentRoute) {
    if (currentRoute === 'login') {
      return "login";
    } else if (currentRoute.startsWith('admin')) {
      return "true-route"
    }

  }

  return (
    <>
      <AdminRoutes />
      <AuthenRoutes />
      <ToastContainer />
      {/* <Page404 /> */}
    </>
  )
}

export default App;
