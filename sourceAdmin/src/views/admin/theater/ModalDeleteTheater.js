import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { http } from "../../../utils/http";
import { toast } from "react-toastify";
import { useState } from "react";

function ModalDeleteTheater(props) {
    const { handleClose, show, dataModal, handleDataAfterDelete } = props;
    const [openLoading, setOpenLoading] = useState(false)

    const handleDelete = (id) => {
        setOpenLoading(true)

        http
            .delete('/admin/theaters/' + id)
            .then((res) => {
                setOpenLoading(false)
                handleClose()
                toast.success(res.data.message)
                handleDataAfterDelete()

            })
            .catch((err) => {
                setOpenLoading(false)
                toast.error("xoá rạp không thành công")
            })
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete this theater</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure to delete this theater:{" "}
                    {/* {dataModal.category} */}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => handleDelete(dataModal.id)}>
                    Sure
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteTheater;
