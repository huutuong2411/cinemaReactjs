import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BackDrop from "../../../components/BackDrop";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { http } from "../../../utils/http";
import { toast } from "react-toastify";
import moment from "moment";
import SeatsModal from "./seatsModal";
// import { deletetUser } from "../services/UserService";

function ShowtimeModal(props) {
  const [openLoading, setOpenLoading] = useState(false);
  const { handleClose, show, idMovie } = props;
  const [cities, setCities] = useState([]);
  const [theaters, settheaters] = useState([]);
  const [idCity, setIdCity] = useState("");
  const [idTheater, setIdTheater] = useState("");
  const [showModalShowtime, setShowModalShowtime] = useState(false);
  const [dayWeek, setDayWeek] = useState([]);
  const [date, setDate] = useState("");
  const [showtime, setShowtime] = useState([]);
  const [idShowTime, setIdShowtime] = useState("");

  useEffect(() => {
    setOpenLoading(true);
    http.get("/cities").then((res) => {
      setCities(res.data.data);
      setOpenLoading(false);
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
    setOpenLoading(true);
    http
      .get(
        `/showtimes/show-dayofweek?id_theater=${idTheater}&id_movie=${idMovie}`
      )
      .then((res) => {
        setDayWeek(res.data.data);
        setOpenLoading(false);
      });
  }, [idTheater, idMovie]);

  useEffect(() => {
    setOpenLoading(true);
    http
      .get(
        `/showtimes/showtime-choise?id_theater=${idTheater}&id_movie=${idMovie}&date=${date}`
      )
      .then((res) => {
        setShowtime(res.data.data);
        setOpenLoading(false);
      });
  }, [idTheater, idMovie, date]);

  const renderCity = () => {
    if (cities.length > 0) {
      return cities.map((value, index) => {
        return (
          <option className="option" id={value.id} value={value.id}>
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

  const renderDayOfWeek = () => {
    if (dayWeek.length > 0) {
      return dayWeek.map((value, index) => {
        return (
          <div
            key={index}
            className="card text-white bg-info mb-3 text-center mr-3"
            style={{ maxWidth: "110px", cursor: "pointer" }}
            onClick={() => setDate(value.date)}
          >
            <div className="card-header">
              <h6>{value.day_of_week}</h6>
            </div>
            <div
              className="card-body text-info rounded"
              style={{ padding: "20px 10px", background: "white" }}
            >
              <p className="card-title ">
                {new Date(value.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        );
      });
    } else {
      return <h5 className="mx-auto text-dark">Không có dữ liệu.</h5>;
    }
  };
  const renderShowtime = () => {
    if (showtime.length > 0) {
      return showtime.map((value, index) => {
        return (
          <div
            className="item"
            style={{ position: "relative", width: "120px", cursor: "pointer" }}
            key={index}
            onClick={() => {
              setShowModalShowtime(true);
              setIdShowtime(value.id);
            }}
          >
            <img
              src="../../assets/images/movie-seat.png"
              style={{ width: "100%" }}
            />

            <p style={{ position: "absolute", top: "27px", left: "15px" }}>
              {moment(value.start_at, "HH:mm:ss").format("HH:mm")} -
              {moment(value.end_at, "HH:mm:ss").format("HH:mm")}
            </p>
          </div>
        );
      });
    }
  };

  return (
    <>
      <BackDrop open={openLoading} />
      <SeatsModal
        show={showModalShowtime}
        handleClose={() => setShowModalShowtime(false)}
        idShowtime={idShowTime}
      />

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header>
          <Modal.Title className="text-dark font-weight-bold modal-title">
            Chọn suất chiếu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="ticket-search-form" style={{ width: "70%" }}>
            <div className="form-group ml-5">
              <span className="text-dark font-weight-bold">Tỉnh thành</span>
              <select
                className="nice-select select-bar ml-1"
                onChange={(e) => setIdCity(e.target.value)}
                tabIndex={0}
                style={{
                  color: "#000000",
                  background: "#bdbbbb",
                }}
              >
                <option value={""}>Chọn thành phố</option>
                {renderCity()}
              </select>
            </div>
            <div className="form-group mr-5">
              <span className="text-dark font-weight-bold">Rạp</span>
              <select
                className="nice-select select-bar ml-1"
                style={{
                  color: "#000000",
                  background: "#bdbbbb",
                }}
                tabIndex={0}
                onChange={(e) => setIdTheater(e.target.value)}
              >
                <option value={""}>Chọn rạp</option>
                {renderTheater()}
              </select>
            </div>
          </form>
          <div className="mt-5" style={{ display: "inline-flex" }}>
            {renderDayOfWeek()}
          </div>
          <div className="movie-schedule">{renderShowtime()}</div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ShowtimeModal;
