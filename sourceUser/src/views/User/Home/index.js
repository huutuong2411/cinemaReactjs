import { useEffect, useState } from "react";
import { http } from "../../../utils/http";
import { toast } from "react-toastify";
import BackDrop from "../../../components/BackDrop";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./custom-slider.css";
import { debounce } from "lodash";
import { Link } from "react-router-dom";

function HomePage() {
  const getSlug = require("speakingurl");
  const [cities, setCities] = useState([]);
  const [theaters, settheaters] = useState([]);
  const [idCity, setIdCity] = useState("");
  const [idTheater, setIdTheater] = useState("");
  const [date, setDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("showing");

  const [openLoading, setOpenLoading] = useState(false);
  const [listMovie, setListMovie] = useState([]);
  const movieLength = listMovie.length;
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: movieLength < 3 ? movieLength : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  useEffect(() => {
    http.get("/cities").then((res) => {
      setCities(res.data.data);
    });
  }, []);
  //render theater
  useEffect(() => {
    setOpenLoading(true);
    http.get(`/theaters?id_city=${idCity}`).then((res) => {
      settheaters(res.data.data);
      setOpenLoading(false);
    });
  }, [idCity]);

  useEffect(() => {
    debounceSearch(keyword, idTheater, date);
  }, [status, keyword, idTheater, date]);

  const debounceSearch = debounce((keyword, idTheater, date) => {
    setOpenLoading(true);
    http
      .get(
        `/movies?status=${status}&id_theater=${idTheater}&key_word=${keyword}&date=${date}`
      )
      .then((res) => {
        setListMovie(res.data.data.data);
        setOpenLoading(false);
      });
  }, 400);

  const renderCity = () => {
    if (cities.length > 0) {
      return cities.map((value, index) => {
        return (
          <option id={value.id} value={value.id} key={index}>
            {value.name}
          </option>
        );
      });
    }
  };

  const renderTheater = () => {
    if (theaters.length > 0) {
      return theaters.map((value, index) => {
        return (
          <option id={value.id} value={value.id} key={index}>
            {value.name}
          </option>
        );
      });
    }
  };

  const renderMovie = () => {
    return listMovie.map((value, index) => {
      return (
        <div className="owl-item active" key={index}>
          <div className="item">
            <div className="movie-grid">
              <div className="movie-thumb c-thumb">
                <Link to={`/movie/${getSlug(value.name)}/${value.id}`}>
                  <img src={value.image} alt="movie" />
                </Link>
              </div>
              <div className="movie-content bg-one">
                <h6 className="title m-0 text-center">
                  <Link to={`/movie/${getSlug(value.name)}/${value.id}`}>
                    {value.name}
                  </Link>
                </h6>
                <ul className="movie-rating-percent">
                  <li
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      alignItems: "center",
                    }}
                  >
                    <div className="thumb">
                      <img src="./assets/images/movie/tomato.png" alt="movie" />
                    </div>
                    <span className="content">{value.total_sales} đã bán</span>
                  </li>
                  <li
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      alignItems: "center",
                    }}
                  >
                    <div className="thumb">
                      <img src="./assets/images/movie/cake.png" alt="movie" />
                    </div>
                    <span className="content">{value.time} phút</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <BackDrop open={openLoading} />
      {/* ==========Banner-Section========== */}
      <section className="banner-section">
        <div
          className="banner-bg bg_img bg-fixed"
          data-background="./assets/images/banner/banner01.jpg"
        />
        <div className="container">
          <div className="banner-content">
            <h1 className="title  cd-headline clip text-white">
              <span className="d-block">Đặt vé</span> bộ phim
              <span className="color-theme cd-words-wrapper p-0 m-0">
                <b className="is-visible">yêu thích</b>
              </span>
            </h1>
            <p className="text-white">
              Nhanh chóng, tiện lợi, thanh toán an toàn
            </p>
          </div>
        </div>
      </section>
      {/* ==========Banner-Section========== */}
      {/* ==========Ticket-Search========== */}
      <section className="search-ticket-section padding-top pt-lg-0">
        <div className="container">
          <div
            className="search-tab bg_img"
            data-background="./assets/images/ticket/ticket-bg01.jpg"
            style={{
              backgroundImage: 'url("./assets/images/ticket/ticket-bg01.jpg")',
            }}
          >
            <div className="row align-items-center mb--20">
              <div className="col-lg-8 mb-20">
                <div className="search-ticket-header">
                  <h6 className="category">UNIVERSAL XiNê</h6>
                  <h3 className="title text-white font-weight-bold">
                    tìm kiếm phim
                  </h3>
                </div>
              </div>
              <div className="col-lg-4 mb-10">
                <div className="tab-menu ticket-tab-menu">
                  <li className="active ml-5">
                    <div className="tab-thumb">
                      <img
                        src="./assets/images/ticket/ticket-tab01.png"
                        alt="ticket"
                      />
                    </div>
                    <span>movie</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="tab-area">
              <div className="tab-item active">
                <form className="ticket-search-form">
                  <div className="form-group">
                    <div className="thumb">
                      <img src="./assets/images/ticket/city.png" alt="ticket" />
                    </div>
                    <span className="type">Tỉnh thành</span>
                    <select
                      className="nice-select select-bar ml-1"
                      onChange={(e) => setIdCity(e.target.value)}
                      tabIndex={0}
                    >
                      <option value={""}>Chọn thành phố</option>
                      {renderCity()}
                    </select>
                  </div>
                  <div className="form-group">
                    <div className="thumb">
                      <img
                        src="./assets/images/ticket/cinema.png"
                        alt="ticket"
                      />
                    </div>
                    <span className="type">Rạp</span>
                    <select
                      className="nice-select select-bar ml-1"
                      onChange={(e) => setIdTheater(e.target.value)}
                      tabIndex={0}
                    >
                      <option value={""}>Chọn rạp</option>
                      {renderTheater()}
                    </select>
                  </div>
                  <div className="form-group">
                    <div className="thumb">
                      <img src="./assets/images/ticket/date.png" alt="ticket" />
                    </div>
                    <span className="type">ngày</span>
                    <input
                      className="nice-select select-bar ml-2"
                      type="date"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <br></br>
                  <div className="form-group large">
                    <input
                      type="text"
                      placeholder="Tìm tên phim"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========Ticket-Search========== */}
      {/* ==========Movie-Section========== */}
      <section className="movie-section pt-5 padding-bottom">
        <div className="container">
          <div className="tab">
            <div className="section-header-2">
              <div className="left">
                <h2 className="title text-white font-weight-bold">
                  PHIM CHIẾU
                </h2>
                <p className="text-white">
                  Đừng bỏ lỡ bộ phim yêu thích của bạn
                </p>
              </div>
              <ul className="tab-menu">
                <li
                  className={status === "showing" ? "active" : ""}
                  onClick={() => {
                    setStatus("showing");
                  }}
                >
                  Đang chiếu
                </li>
                <li
                  className={status === "coming_soon" ? "active" : ""}
                  onClick={() => {
                    setStatus("coming_soon");
                  }}
                >
                  Sắp chiếu
                </li>
                <li
                  className={status === "hot" ? "active" : ""}
                  onClick={() => {
                    setStatus("hot");
                  }}
                >
                  Hot
                </li>
              </ul>
            </div>
            <div className="tab-area mb-30-none">
              <div className="tab-item active">
                <div className="owl-carousel owl-theme tab-slider owl-loaded owl-drag">
                  <div className="owl-stage-outer">
                    <div
                      className="owl-stage"
                      style={{
                        transform: "translate3d(-1462px, 0px, 0px)",
                        transition: "all 0.25s ease 0s",
                        left: "128%",
                        width: "100%",
                      }}
                    >
                      {listMovie.length > 0 ? (
                        <Slider {...settings}>{renderMovie()}</Slider>
                      ) : (
                        <img
                          src="/assets/images/pngwing.png"
                          style={{
                            width: "50%",
                            margin: "0 30% 0 30%",
                            top: "-130px",
                            position: "relative",
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="owl-nav disabled">
                    <button
                      type="button"
                      role="presentation"
                      className="owl-prev"
                    >
                      <span aria-label="Previous">‹</span>
                    </button>
                    <button
                      type="button"
                      role="presentation"
                      className="owl-next"
                    >
                      <span aria-label="Next">›</span>
                    </button>
                  </div>
                  <div className="owl-dots disabled" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========Movie-Section========== */}
    </>
  );
}

export default HomePage;
