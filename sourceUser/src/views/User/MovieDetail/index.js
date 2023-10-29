import { useEffect, useState } from "react";
import { http } from "../../../utils/http";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackDrop from "../../../components/BackDrop";
import ModalMustLogin from "./login";
import ShowtimeModal from ".././Showtime/ShowtimeModal";
function MovieDetail() {
  const { movieName, id } = useParams();
  const [openLoading, setOpenLoading] = useState(false);
  const [movie, setMovie] = useState("");
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [showModalShowtime, setShowModalShowtime] = useState(false);
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  const userRole = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    setOpenLoading(true);
    http.get(`/movies/show/${id}`).then((res) => {
      setMovie(res.data.data);
      setOpenLoading(false);
    });
  }, [id]);

  const handleOrder = () => {
    if (!isLogin || userRole.id_role !== 1) {
      setShowModalLogin(true);
    } else {
      setShowModalShowtime(true);
    }
  };

  return (
    <>
      <BackDrop open={openLoading} />
      <ModalMustLogin
        show={showModalLogin}
        handleClose={() => setShowModalLogin(false)}
      />
      <ShowtimeModal
        show={showModalShowtime}
        handleClose={() => setShowModalShowtime(false)}
        idMovie={id}
      />
      {/* ==========Banner-Section========== */}
      <section
        className="details-banner bg_img"
        data-background="../../assets/images/banner/banner03.jpg"
      >
        <div className="container">
          <div className="details-banner-wrapper">
            <div className="details-banner-thumb">
              <img src={movie && movie.image} alt="movie" />
              <Link
                to={movie && movie.trailer}
                className="video-popup"
                target="_blank"
              >
                <img
                  src="../../assets/images/movie/video-button.png"
                  alt="movie"
                />
              </Link>
            </div>
            <div className="details-banner-content offset-lg-3">
              <h3 className="title">{movie && movie.name}</h3>
              <a href="#0" className="button">
                {movie && movie.categories.name}
              </a>
              <div className="social-and-duration">
                <div className="duration-area">
                  <div className="item">
                    <i className="fas fa-calendar-alt" />
                    <span>
                      {movie && new Date(movie.start_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="item">
                    <i className="far fa-clock" />
                    <span>{movie && movie.time} phút</span>
                  </div>
                </div>
                <ul className="social-share">
                  <li>
                    <a href="#0">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i className="fab fa-pinterest-p" />
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i className="fab fa-google-plus-g" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ==========Banner-Section========== */}
      {/* ==========Book-Section========== */}
      <section className="book-section bg-one">
        <div className="container">
          <div className="book-wrapper offset-lg-3">
            <div className="left-side">
              <div className="item">
                <div className="item-header">
                  <div className="thumb">
                    <img
                      src="../../assets/images/movie/cake2.png"
                      alt="movie"
                    />
                  </div>
                  <div className="counter-area">
                    <span>{movie && movie.id}</span>
                  </div>
                </div>
                <p>Đã bán</p>
              </div>
              <div className="item">
                <div className="item-header">
                  <h5 className="title">4.5</h5>
                  <div className="rated">
                    <i className="fas fa-heart" />
                    <i className="fas fa-heart" />
                    <i className="fas fa-heart" />
                    <i className="fas fa-heart" />
                    <i className="fas fa-heart" />
                  </div>
                </div>
                <p>Users Rating</p>
              </div>
            </div>
            <a
              type="button"
              className="custom-button"
              onClick={() => handleOrder()}
            >
              Chọn suất chiếu
            </a>
          </div>
        </div>
      </section>
      {/* ==========Book-Section========== */}
      {/* ==========Movie-Section========== */}
      <section className="movie-details-section padding-top padding-bottom">
        <div className="container">
          <div className="row justify-content-center flex-wrap-reverse mb--50">
            <div className="col-lg-9 mb-50">
              <div className="movie-details">
                <div className="tab summery-review">
                  <ul className="tab-menu">
                    <li className="active">Mô tả</li>
                    <li>Bình luận</li>
                  </ul>
                  <div className="tab-area">
                    <div className="tab-item active">
                      <div
                        className="item"
                        dangerouslySetInnerHTML={{
                          __html: movie.description,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MovieDetail;
