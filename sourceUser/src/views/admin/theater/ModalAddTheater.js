import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import BackDrop from "../../../components/BackDrop";
import { toast } from "react-toastify";
import { http } from "../../../utils/http";

function ModalAddNewTheater(props) {
    const { handleClose, show, handleDataAfterAdd } = props;
    const [openLoading, setOpenLoading] = useState(false)
    const [cities, setCities] = useState([])

    const [input, setInput] = useState({
        name: '',
        address: '',
        id_city: '',
    });
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
                    <option className="option" id={value.id} value={value.id}>{value.name}</option>
                )
            })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setOpenLoading(true)
        http
            .post('admin/theaters', input)
            .then((res) => {
                handleClose()
                toast.success(res.data.message)
                handleDataAfterAdd(res.data.data, cities)
                setOpenLoading(false)
            })
            .catch((res) => {
                toast.error("Thêm danh mục không thành công")
                setOpenLoading(false)
            })
    };

    return (
        <>
            <BackDrop open={openLoading} />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Theater</Modal.Title>
                </Modal.Header>
                <Form action="#" onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                autoComplete="off"
                                name="name"
                                type="text"
                                placeholder="Name"
                                onChange={handleInput}
                            />
                            <Form.Label className="mt-2">Address</Form.Label>
                            <Form.Control
                                required
                                name="address"
                                type="text"
                                placeholder="Address"
                                onChange={handleInput}
                            />
                            <Form.Label className="mt-2">City</Form.Label>
                            <Form.Control
                                required
                                onChange={handleInput}
                                autoComplete="off"
                                list="city"
                                name="id_city"
                                placeholder="Select City"
                            >
                            </Form.Control>
                            <datalist role="listbox" id="city">
                                {renderCity()}
                            </datalist>


                            {/* <Form.Select
                                inputMode="multiple"
                                type="text"
                                name="id_city"
                                placeholder="City"
                                onChange={handleInput}
                            // value={name}
                            >
                                <option>Select City</option>
                                {renderCity()}

                            </Form.Select> */}
                        </Form.Group>
                        {/* <p style={{ color: 'red' }}>{error}</p> */}
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

export default ModalAddNewTheater;
