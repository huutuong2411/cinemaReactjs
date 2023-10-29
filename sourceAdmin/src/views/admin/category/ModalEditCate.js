import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import BackDrop from "../../../components/BackDrop"

function ModalEditCate(props) {
    const { handleClose, show, dataModal, handleDataAfterEdit } = props;
    const [name, setName] = useState();
    const [openLoading, setOpenLoading] = useState(false)

    useEffect(() => {
        setName(dataModal.category)
    }, [dataModal])

    const handleInput = (e) => {
        setName(e.target.value)
    }
    const handleEdit = (e) => {
        setOpenLoading(true)
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }
        axios
            .put(' http://localhost:8000/api/admin/categories/' + dataModal.id, { 'name': name }, config)
            .then((res) => {
                setName('')
                handleDataAfterEdit(res.data.data)
                handleClose()
                setOpenLoading(false)
                toast.success(res.data.message);
            })
            .catch((err) => {
                toast.error("sửa danh mục không thành công")
            })

    };

    return (
        <>
            <BackDrop open={openLoading} />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit this Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Name"
                            onChange={(e) => handleInput(e)}
                            value={name}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleEdit}>
                        Edit
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >
        </>

    );
}

export default ModalEditCate;
