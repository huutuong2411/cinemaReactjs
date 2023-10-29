import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BackDrop from "../../../components/BackDrop";
import { useEffect, useState } from "react";
import { http } from "../../../utils/http";
// import { deletetUser } from "../services/UserService";

function SeatModal(props) {
  const [openLoading, setOpenLoading] = useState(false);
  const [seats, setSeats] = useState(false);
  const { handleClose, show, idShowtime } = props;

  useEffect(() => {
    http.get(`/showtimes/show/${idShowtime}`).then((res) => {
      setSeats(res.data.data);
      setOpenLoading(false);
    });
  }, [idShowtime]);
  var defaultSeat = null;

  if (seats.length > 0) {
    defaultSeat = JSON.parse(seats[0].room_seat);
  }

  const renderModal = () => {
    if (defaultSeat && Object.keys(defaultSeat).length > 0) {
      return Object.keys(defaultSeat).map((rowName, index) => {
        return (
          <div
            className="card-body row p-2"
            style={{ padding: "0.7rem" }}
            key={index}
          >
            <div className="col-1">
              <button className="btn btn-success ms-4 rowChar mt-1">
                {String.fromCharCode(index + 65)}
              </button>
            </div>
            <div className="col-11 rowSeat border border-info rounded">
              <div className="mt-1 mb-1" style={{ display: "inline-flex" }}>
                {defaultSeat[rowName].map((seatName, index1) => {
                  return (
                    <>
                      <div style={{ position: "relative" }}>
                        <img src="../../assets/images/movie/seat01-free.png" />
                        <span
                          className="seat"
                          style={{
                            position: "absolute",
                            left: "13px",
                            top: "5px",
                          }}
                        >
                          {seatName}
                        </span>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <>
      <BackDrop open={openLoading} />
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header>
          <Modal.Title className="text-dark font-weight-bold modal-title">
            Sơ đồ ghế
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="screen-thumb">
            <img src="../../assets/images/movie/screen-thumb.png" alt="movie" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <strong className="text-dark font-weight-bold">
              Phòng: {seats.length > 0 && seats[0].room_name}
            </strong>

            <strong className="text-dark font-weight-bold">
              Giá vé: {seats.length > 0 && seats[0].price}
            </strong>
            <strong className="text-dark font-weight-bold">
              Giờ chiếu: {seats.length > 0 && seats[0].end_at}
            </strong>
          </div>
          {renderModal()}
          <strong className="text-dark font-weight-bold">Địa chỉ:</strong>
          <span className="text-dark font-weight-bold ml-3">
            {seats.length > 0 && seats[0].theater_address}
          </span>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SeatModal;
