import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useState } from "react";
import BackDrop from "../../../components/BackDrop";
import { toast } from "react-toastify";
import { http } from "../../../utils/http";

function ModalAddNewCate(props) {
    const { handleClose, show, handleDataAfterAdd } = props;
    const [openLoading, setOpenLoading] = useState(false)

    const [name, setName] = useState({
        name: ''
    }
    );
    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        if (name.name === "") {
            setError('Vui lòng không để trống')
        } else {
            setOpenLoading(true)
            http
                .post('admin/categories', name)
                .then((res) => {
                    handleClose()
                    toast.success(res.data.data.message)
                    handleDataAfterAdd(res.data.data)
                    setOpenLoading(false)
                })
                .catch((res) => {
                    toast.error("Thêm danh mục không thành công")
                })
        }

    };

    return (
        <>
            <BackDrop open={openLoading} />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Category</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit} action="#">
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control

                                type="text"
                                placeholder="First name"
                                onChange={(e) => setName({ 'name': e.target.value })}
                            // value={name}
                            />
                        </Form.Group>
                        <p style={{ color: 'red' }}>{error}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Form>
            </Modal>
        </>

    );
}

export default ModalAddNewCate;
