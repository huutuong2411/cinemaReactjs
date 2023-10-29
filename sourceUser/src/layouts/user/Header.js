import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import EmailConfirmation from "../../components/EmailConfirmation"
function Header() {
  const location = useLocation();
  const [selected, setSelected] = useState("");
  let isLogin = JSON.parse(localStorage.getItem("isLogin"));
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelected("Trang chủ");
        break;
      case "/movie":
        setSelected("movie");
        break;
      default:
        setSelected("");
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLogout = () => {
    if(isLogin) {
      localStorage.removeItem('isLogin')
      localStorage.removeItem('auth')
      localStorage.removeItem('token')
    }
  }
  return (
    <>
    <EmailConfirmation/>
      <div className="overlay"></div>
      <a href="#0" className="scrollToTop">
        <i className="fas fa-angle-up"></i>
      </a>

      <header className="header-section header-active">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo">
              <Link to="/" style={{ textDecoration: "none" }}>
                <img src="../../assets/images/logo/logo.png" alt="logo" />
              </Link>
            </div>
            <ul className="menu" style={{ margin: 0 }}>
              <li>
                <Link
                  to="/"
                  className={selected === "Trang chủ" ? "active" : ""}
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/movie"
                  className={selected === "movie" ? "active" : ""}
                >
                  PHIM chiếu
                </Link>
                <ul className="submenu">
                  <li>
                    <Link
                      href="movie-grid.html"
                      style={{ textDecoration: "none" }}
                    >
                      Các danh mục phim
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="#0" style={{ textDecoration: "none" }}>
                  blog
                </Link>
                <ul className="submenu">
                  <li>
                    <Link href="blog.html" style={{ textDecoration: "none" }}>
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="blog-details.html"
                      style={{ textDecoration: "none" }}
                    >
                      Blog Single
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="contact.html" style={{ textDecoration: "none" }}>
                  review phim
                </Link>
              </li>
              <li>
                <Link href="contact.html" style={{ textDecoration: "none" }}>
                  contact
                </Link>
              </li>
              <li className="header-button pr-0">
                <Link onClick={handleLogout} to={isLogin ? '' : 'http://localhost:4000/login'} style={{ textDecoration: "none" }}>
                  {isLogin ? 'Đăng xuất' : 'Đăng nhập'}
                </Link>
              </li>
            </ul>
            <div className="header-bar d-lg-none">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
