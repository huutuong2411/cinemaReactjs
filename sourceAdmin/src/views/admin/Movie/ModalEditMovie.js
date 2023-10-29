import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import BackDrop from "../../../components/BackDrop";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { http } from "../../../utils/http";
import axios from "axios";

function ModalEditMovie(props) {
    const { dataModal, handleClose, show, handleDataAfterAdd } = props;
    const [openLoading, setOpenLoading] = useState(false)
    const [categories, setCategories] = useState({})
    const [image, setImage] = useState("")
    const [input, setInput] = useState({
        name: '',
        trailer: '',
        id_category: '',
        start_date: '',
        time: '',
        description: ''
    })

    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.preview)
        }
    }, [image])

    useEffect(() => {
        http
            .get('/categories')
            .then((res) => {
                setCategories(res.data.data)
            })
            .catch((res) => {
                console.log(res);
            })
    }, [])

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInput(state => ({ ...state, [name]: value }))
    }

    const validationSchema = Yup.object({
        trailer: Yup.string()
            .url('Invalid URL format')
            .required('URL is required'),
        name: Yup.string()
            .required('Name is required'),
        poster: Yup.mixed()
            .test('fileFormat', 'Invalid file format. Only JPG, JPEG, and PNG are allowed.', (value) => {
                if (value && value.type) {
                    return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
                }
                return true
            })
            .test('fileSize', 'File size is too large. Max size is 5MB.', (value) => {
                if (value && value.size) {
                    return value.size <= 5 * 1024 * 1024;
                }
                return true
            }),
        id_category: Yup.string()
            .required('Genre is required'),
        // .oneOf(['a', 'b', 'c'], 'Invalid genre selection'),
        start_date: Yup.date()
            .min(new Date('1900-01-01'), 'Date must be after 01/01/1900'),
        time: Yup.number()
            .required('Time is required'),
        description: Yup.string()
            .required('Description is required')
    });

    const handleSubmit = async (values) => {

        const formData = new FormData();

        formData.append('_method', "PUT")
        formData.append('name', values.name)
        formData.append('poster', image)
        formData.append('trailer', values.trailer)
        formData.append('id_category', values.id_category)
        formData.append('start_date', values.start_date)
        formData.append('time', values.time)
        formData.append('description', values.description)

        setOpenLoading(true)

        let token = JSON.parse(localStorage.getItem('token'))

        const option = {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            },
        }

        console.log(formData);
        axios
            .post(`http://localhost:8000/api/admin/movies/${dataModal.id}`, formData, option)
            .then((res) => {
                // handleDataAfterAdd(res.data.data)
                handleClose()
                console.log(res);
                setOpenLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setOpenLoading(false)
            }
            );

    };
    const renderCategories = () => {
        if (categories.length > 0) {
            return categories.map((index, value) => {
                return (
                    <option value={index.id}>{index.category}</option>
                )
            })
        }
    }
    return (
        <>
            <BackDrop open={openLoading} />
            <Modal show={show} onHide={() => {
                handleClose()
                setImage("")
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Theater</Modal.Title>
                </Modal.Header>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{
                        name: '',
                        poster: '',
                        trailer: '',
                        id_category: '',
                        start_date: '',
                        time: '',
                        description: ''
                    }}
                    onSubmit={(values) => handleSubmit(values)}>
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                        <>
                            <form noValidate onSubmit={handleSubmit}>
                                <Modal.Body>
                                    <div className="form-control">
                                        <label class="form-label" htmlFor="url">Name:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            placeholder="Enter a name of movie"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        />
                                        {touched.name && errors.name ? (
                                            <div className="error" style={{ color: "red" }}>{errors.name}</div>
                                        ) : null}
                                        <label class="form-label mt-1" htmlFor="url">Poster:</label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            name="poster"
                                            onChange={(e) => {
                                                handleChange(e);
                                                values.poster = e.currentTarget.files[0];
                                                values.poster.preview = URL.createObjectURL(values.poster)
                                                // const reader = new FileReader()

                                                // reader.onload = (event) => {
                                                //     const imageDataURL = event.target.result;
                                                //     setFieldValue('poster', imageDataURL);
                                                // };
                                                // reader.readAsDataURL(values.poster)
                                                setImage(values.poster);
                                            }}
                                            onBlur={handleBlur}
                                            value={values.poster.preview}
                                        />
                                        {touched.poster && errors.poster ? (
                                            <div className="error">{errors.poster}</div>
                                        ) : null}
                                        {image ?
                                            <img src={image.preview} alt="Hình ảnh" width="100" height="100" /> :
                                            <img src={dataModal.image} alt="Hình ảnh" width="100" height="100" />}
                                        <br />
                                        <label class="form-label mt-1" htmlFor="url">Trailer:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="trailer"
                                            name="trailer"
                                            placeholder="Enter a valid url"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.trailer}
                                        />
                                        {touched.trailer && errors.trailer ? (
                                            <div className="error" style={{ color: "red" }}>{errors.trailer}</div>
                                        ) : null}
                                        <label class="form-label mt-1" htmlFor="url">Genre:</label>
                                        <select
                                            className="form-select"
                                            type="text"
                                            id="url"
                                            name="id_category"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.id_category}
                                        >
                                            <option value=''></option>
                                            {renderCategories()}
                                        </select>
                                        {touched.id_category && errors.id_category ? (
                                            <div className="error" style={{ color: "red" }}>{errors.id_category}</div>
                                        ) : null}
                                        <label class="form-label mt-1" htmlFor="url">Start Day:</label>
                                        <input
                                            className="form-control"
                                            type="date"
                                            id="url"
                                            name="start_date"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.start_date}
                                        />
                                        {touched.start_date && errors.start_date ? (
                                            <div className="error" style={{ color: "red" }}>{errors.start_date}</div>
                                        ) : null}
                                        <label class="form-label mt-1" htmlFor="url">Time:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="url"
                                            name="time"
                                            placeholder="Minutes"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.time}
                                        />
                                        {touched.time && errors.time ? (
                                            <div className="error" style={{ color: "red" }}>{errors.time}</div>
                                        ) : null}
                                        <label class="form-label mt-1" htmlFor="url">Description:</label>
                                        <textarea
                                            className="form-control"
                                            type="text"
                                            id="url"
                                            name="description"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.description}
                                        />
                                        {touched.description && errors.description ? (
                                            <div className="error" style={{ color: "red" }}>{errors.description}</div>
                                        ) : null}
                                    </div>

                                </Modal.Body>

                                <Modal.Footer>
                                    <Button variant="primary" type="submit">
                                        Add
                                    </Button>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </>
                    )}
                </Formik >

            </Modal >
        </>

    );
}

export default ModalEditMovie;
