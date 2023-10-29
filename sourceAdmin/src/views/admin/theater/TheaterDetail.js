import BackDrop from "../../../components/BackDrop";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { http } from "../../../utils/http";
import ModalDeleteRoom from "../room/ModalDeleteRoom";
import ModalShowRoom from "../room/ModalShowRoom";

function TheaterDetail() {
    const params = useParams()
    const [openLoading, setOpenLoading] = useState(false)
    const [theaterDetail, setTheaterDetail] = useState({})
    const [rooms, setRooms] = useState([])
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [dataModal, setDataModal] = useState({})

    const handleShowDeleteRoom = () => setShowModalDelete(true)
    const handleShowRoom = () => setShowModal(true)


    useEffect(() => {
        setOpenLoading(true)
        http
            .get('theaters/show/' + params.id)
            .then((res) => {
                setOpenLoading(false)
                setTheaterDetail(res.data.data)
                setRooms(res.data.data.rooms)
            })
            .catch((res) => {
                setOpenLoading(false)
                console.log(res);
            })
    }, [params.id])

    const handleClose = () => {
        setShowModalDelete(false)
        setShowModal(false)
    }

    const handleDataAfterDelete = (idRoom) => {
        const roomAfterDelete = rooms.filter((obj) => obj.id !== idRoom)
        setRooms(roomAfterDelete)
    }

    return (
        <>
            <BackDrop open={openLoading} />
            <div className="container p-5">
                <ModalShowRoom
                    show={showModal}
                    handleClose={handleClose}
                    dataModal={dataModal}
                />

                <ModalDeleteRoom
                    show={showModalDelete}
                    handleClose={handleClose}
                    dataModal={dataModal}
                    handleDataAfterDelete={handleDataAfterDelete}
                />
                <div className="d-flex justify-content-between mb-2">
                    <h2 className="mb-2"> Theater Detail</h2>
                    <div>
                        <Link to={'/admin/room-addition/' + params.id}><button className="btn btn-primary me-2">Add Room</button></Link>
                        <Link to={'/admin/room/trash'}><button className="btn btn-primary">Go to trash</button></Link>
                    </div>
                </div>
                <div className=" mb-4">
                    <h6 ><strong>Name: </strong>{theaterDetail.name}</h6>
                    <h6><strong>Address: </strong> {theaterDetail.address}</h6>
                </div>
                <div className="scrollbar scrollbar-secondary ">
                    <Table striped bordered hover className="force-overflow">
                        <thead>
                            <tr className="text-center">
                                <th className="col-1">
                                    ID
                                </th>
                                <th>
                                    <span>Name Room</span>
                                </th>
                                <th>
                                    <span>Total Seat</span>
                                </th>
                                <th className="col-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {rooms &&
                                rooms.length > 0 &&
                                rooms.map((item, index, rooms) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.seat_qty}</td>

                                            <td>
                                                <Link to={'/admin/room-edit/' + item.id}>
                                                    <button
                                                        className="btn"
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                </Link>
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        setDataModal(item)
                                                        handleShowDeleteRoom()
                                                    }}
                                                >
                                                    <DeleteForeverIcon />
                                                </button>
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        setDataModal(item)
                                                        handleShowRoom()
                                                    }}
                                                >
                                                    <RemoveRedEyeIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </div>
            </div >
        </>
    )
}

export default TheaterDetail