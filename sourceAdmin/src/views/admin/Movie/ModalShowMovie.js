import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

function ModalShowMovie(props) {
    const { handleClose, show, dataModal } = props;
    if (dataModal) {
        return (
            <>
                <Modal show={show} onHide={handleClose} className="modal-lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Movie Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={dataModal.name}
                            />
                        </Form.Group>
                        <Form.Label className="mt-2">Poster</Form.Label>
                        <br />
                        <img src={dataModal.image} width={200} />
                        <br />
                        {/* <Image src={dataModal.image} rounded /> */}
                        <Form.Label className="mt-2">Trailer</Form.Label>
                        <Form.Control
                            readOnly
                            value={dataModal.trailer}
                        />
                        <Form.Label className="mt-2">Genre</Form.Label>
                        <Form.Control
                            name="address"
                            type="text"
                            placeholder="Address"
                            value={dataModal.category_name}
                        />
                        <Form.Label className="mt-2">Start Date</Form.Label>
                        <Form.Control
                            name="address"
                            type="text"
                            placeholder="Address"
                            value={dataModal.start_date}
                        />
                        <Form.Label className="mt-2">Total Time</Form.Label>
                        <Form.Control
                            name="address"
                            type="text"
                            placeholder="Address"
                            value={dataModal.time}
                        />
                        <Form.Label className="mt-2">Description</Form.Label>
                        <div dangerouslySetInnerHTML={{

                            __html: dataModal.description,

                        }}>

                        </div>
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
}

export default ModalShowMovie