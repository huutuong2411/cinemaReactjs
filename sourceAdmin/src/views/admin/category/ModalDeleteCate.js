import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { http } from "../../../utils/http";
import { toast } from "react-toastify";
// import { deletetUser } from "../services/UserService";

function ModalDeleteCate(props) {
    const { handleClose, show, dataModal, handleDataAfterDelete } = props;

    const handleDelete = (id) => {

        http
            .delete('/admin/categories/' + dataModal.id)
            .then((res) => {
                handleClose()
                toast.success(res.data.message)
                handleDataAfterDelete(dataModal.id)
            })
            .catch(
                (err) => console.log(err)
            )

    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete this category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure to delete this category:{" "}
                    {dataModal.category}
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

export default ModalDeleteCate;
