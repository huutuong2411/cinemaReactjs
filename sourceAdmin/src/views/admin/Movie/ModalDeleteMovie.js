import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { http } from "../../../utils/http";
import { toast } from "react-toastify";
import { useState } from "react";

function ModalDeleteMovie(props) {
    const { handleClose, show, dataModal, handleDataAfterDelete } = props;


    const handleDelete = () => {

        http
            .delete('/admin/movies/' + dataModal.id)
            .then((res) => {
                console.log(res);
                handleClose()
                toast.success(res.data.message)
                handleDataAfterDelete(dataModal.id)
            })
            .catch((err) => {
                toast.error("xoá phòng không thành công")
            })
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete this movie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure to delete this room:{" "}
                    {/* {dataModal.category} */}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete} >
                    Sure
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeleteMovie;
