import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import seat01 from "../../../images/seat01.png";
import screen from "../../../images/screen.png";
import './RoomAddition.css'


function ModalShowRoom(props) {
    const { handleClose, show, dataModal } = props;
    let data = ''

    if (dataModal.seats) {
        data = JSON.parse(dataModal.seats)
    }
    const renderModal = () => {
        if (Object.keys(data).length > 0) {
            return Object.keys(data).map((rowName, index) => {
                return (
                    <div className="card-body row p-2" style={{ padding: "0.7rem" }}>
                        <div className="col-1">
                            <button className="btn btn-success ms-4 rowChar mt-1">
                                {String.fromCharCode(index + 65)}
                            </button>
                        </div>
                        <div className="col-11 rowSeat border border-info rounded">
                            <div className="mt-1 mb-1">
                                {data[rowName].map((seatName, index1) => {
                                    return (
                                        <>
                                            <img src={seat01} />
                                            <span className="seat">{seatName}</span>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                )
            })
        }
    }
    return (
        <>

            <Modal show={show} onHide={handleClose} className="modal-xl">
                <Modal.Header closeButton>
                    <Modal.Title>Room Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <img src={screen} className="mb-1" style={{ width: "50%", position: "relative", left: "25%" }} />

                    {renderModal()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* <BackDrop open={openLoading} /> */}


        </>
    )
}

export default ModalShowRoom