import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import BackDrop from "../../../components/BackDrop"
import { http } from "../../../utils/http";

function ModalEditTheater(props) {
    const { handleClose, show, dataModal, handleDataAfterEdit } = props;
    const [input, setInput] = useState({
        name: '',
        address: '',
        id_city: '',
    });
    const [openLoading, setOpenLoading] = useState(false)
    const [cities, setCities] = useState([])

    useEffect(() => {
        setInput({
            name: dataModal.name,
            address: dataModal.address,
            id_city: dataModal.id_city
        })
    }, [dataModal])

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInput(state => ({ ...state, [name]: value }))
    }

    useEffect(() => {
        http
            .get('/cities')
            .then((res) => {
                setCities(res.data.data)
            })
            .catch((res) => {
                toast.error('Lấy danh sách thành phố không thành công')
            })
    }, [])

    const renderCity = () => {
        if (cities.length > 0) {
            return cities.map((value, index) => {
                return (
                    <option className="option" key={value.id} id={value.id} value={value.id}>{value.name}</option>
                )
            })
        }
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
            .put(' http://localhost:8000/api/admin/theaters/' + dataModal.id, input, config)
            .then((res) => {
                setInput('')
                handleDataAfterEdit()
                handleClose()
                setOpenLoading(false)
                toast.success(res.data.message);
            })
            .catch((err) => {
                setOpenLoading(false)
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
                            name="name"
                            placeholder="Name"
                            value={input.name}
                            onChange={handleInput}
                        />
                    </Form.Group>
                    <Form.Label className="mt-2">Address</Form.Label>
                    <Form.Control
                        required
                        name="address"
                        type="text"
                        placeholder="Address"
                        value={input.address}
                        onChange={handleInput}
                    />
                    <Form.Label className="mt-2">City</Form.Label>
                    <select
                        className="form-select"
                        required
                        onChange={(e) => handleInput(e)}
                        autoComplete="off"
                        list="city"
                        name="id_city"
                        placeholder="Select City"
                        style={{ position: 'relative' }}
                        value={input.id_city}
                    >
                        <option value={''}>Select City</option>
                        {renderCity()}
                    </select>

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

export default ModalEditTheater;
