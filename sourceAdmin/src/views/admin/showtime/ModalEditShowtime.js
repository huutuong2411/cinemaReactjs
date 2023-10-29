import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import BackDrop from "../../../components/BackDrop"
import { http } from "../../../utils/http";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

function ModalEditShowtime(props) {
    const params = useParams()
    const { handleClose, show, dataModal, handleDataAfterEdit, idTheater } = props;

    const [endTime, setEndTime] = useState()
    const [input, setInput] = useState({
        id_room: '',
        id_movie: '',
        start_at: '',
        date: '',
        price: ''

    });
    const [openLoading, setOpenLoading] = useState(false)
    const [rooms, setRooms] = useState([])
    const [movies, setMovies] = useState([])
    if (dataModal) {
        const parsedTime = moment(dataModal.time, "HH:mm:ss")
        const formattedTime = parsedTime.format("hh:mm");

        // console.log(formattedTime);

    }
    useEffect(() => {
        setInput({
            id_room: dataModal ? dataModal.id_room : '',
            id_movie: dataModal ? dataModal.id_movie : '',
            start_at: dataModal ? dataModal.start_at : '',
            date: dataModal ? dataModal.date : '',
            price: dataModal ? dataModal.price : ''
        })
        setEndTime(dataModal ? dataModal.end_at : '')
    }, [dataModal])

    useEffect(() => {
        http
            .get('theaters/show/' + params.id)
            .then((res) => {
                // console.log(res.data.data.rooms);
                setRooms(res.data.data.rooms)
            })
            .catch((res) => {
                toast.error('Lấy danh sách phòng không thành công')
            })
    }, [])
    useEffect(() => {
        http
            .get('movies')
            .then((res) => {
                setMovies(res.data.data.data)
            })
            .catch((res) => {
                toast.error('Lấy danh sách phim không thành công')
            })
    }, [])

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInput(state => ({ ...state, [name]: value }))
    }

    const renderRoom = () => {
        if (rooms.length > 0) {
            return rooms.map((value, index) => {
                return (
                    <option className="option" key={value.id} id={value.id} value={value.id}>{value.name}</option>
                )
            })
        }
    }

    const renderMovie = () => {
        if (movies.length > 0) {
            return movies.map((value, index) => {
                return (
                    <option className="option" key={value.id} id={value.id} value={value.id}>{value.name}</option>
                )
            })
        }
    }

    const handleEndTime = (e) => {
        const inputTime = e.target.value
        const startTime = moment(inputTime, "HH:mm:ss")

        movies.map((item) => {

            if (item.id === input.id_movie) {
                const endTime = startTime.add(item.time, "minutes");
                setEndTime(endTime.format("HH:mm:ss"));
            }
        })

    }

    const renderTotalTime = () => {
        if (input.id_movie !== "") {
            return movies.map((item) => {
                if (item.id == input.id_movie) {
                    console.log(item);
                    return (
                        <>
                            <Form.Label className="mt-2">Total Time</Form.Label>
                            <input disabled className="form-control" value={`${item.time} minutes`}></input>

                        </>
                    )
                }
            })
        }
    }
    const handleEdit = (e) => {
        setOpenLoading(true)
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }
        axios
            .put(' http://localhost:8000/api/admin/showtimes/' + dataModal.id, input, config)
            .then((res) => {
                setInput('')
                console.log(res);
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
                    <Modal.Title>Edit this showtime</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="" controlId="formBasicEmail" >
                        <Form.Label>ID Room:</Form.Label>
                        <select
                            className="form-select"
                            required
                            onChange={handleInput}
                            autoComplete="off"
                            list="city"
                            name="id_room"
                            placeholder="Select City"
                            style={{ position: 'relative' }}
                            value={input.id_room}
                        >
                            <option value={''}>Select Room</option>
                            {renderRoom()}
                        </select>
                    </Form.Group>
                    <Form.Label className="mt-2">Movie</Form.Label>
                    <select
                        className="form-select"
                        required
                        onChange={handleInput}
                        autoComplete="off"
                        list="city"
                        name="id_movie"
                        placeholder="Select City"
                        style={{ position: 'relative' }}
                        value={input.id_movie}
                    >
                        <option value={''}>Select Movie</option>
                        {renderMovie()}

                    </select>
                    {renderTotalTime()}
                    <Form.Label className="mt-2">Start at</Form.Label>
                    <input
                        className="form-control"
                        required
                        name="start_at"
                        type="time"
                        placeholder="Time"
                        value={input.start_at}
                        onChange={(e) => { handleInput(e); handleEndTime(e) }}
                    />
                    <Form.Label className="mt-2">End at</Form.Label>
                    <Form.Control
                        required
                        disabled
                        type="time"
                        placeholder="Time"
                        value={endTime}
                    />
                    <Form.Label className="mt-2">Date</Form.Label>
                    <Form.Control
                        required
                        name="date"
                        type="text"
                        placeholder="Date"
                        value={input.date}
                        onChange={handleInput}
                    />
                    <Form.Label className="mt-2">Price</Form.Label>
                    <Form.Control
                        required
                        name="price"
                        type="text"
                        placeholder="Price"
                        value={input.price}
                        onChange={handleInput}
                    />
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

export default ModalEditShowtime;
