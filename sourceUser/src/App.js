import "./App.css";
// Routing
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserRoutes } from "./routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AuthenRoutes } from "./routes";
import { RegisterRoutes } from "./routes";
function App() {
  const navigate = useNavigate();
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));

  // const user = JSON.parse(localStorage.getItem('user'));
  // user.role === 'admin' -> navigate admin
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu mỗi khi URL thay đổi
  }, [pathname]);

  return (
    <>
      {/* <Protected isLogin={isLogin}>
        <AdminRoutes />
      </Protected> */}
      <UserRoutes />
      <AuthenRoutes />
      <RegisterRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
