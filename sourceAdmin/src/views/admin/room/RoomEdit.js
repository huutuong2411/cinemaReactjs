import { useNavigate, useParams } from "react-router-dom"
import BackDrop from "../../../components/BackDrop";
import { useEffect, useState } from "react";
import { http } from "../../../utils/http";
import seat01 from "../../../images/seat01.png";
import './RoomAddition.css'
import SaveIcon from '@mui/icons-material/Save';
import { toast } from "react-toastify";
import axios from "axios";


function RoomEdit() {
    const params = useParams()
    const [openLoading, setOpenLoading] = useState(false)
    const [dataRoom, setDataRoom] = useState({})
    const [dataEdit, setDataEdit] = useState({})
    const [dataSeat, setDataSeat] = useState({})
    const [error, setError] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        setOpenLoading(true)
        http
            .get('rooms/show/' + params.id)
            .then((res) => {
                setOpenLoading(false)
                setDataRoom(res.data.data.theaters)
                setDataEdit(res.data.data)
                setDataSeat(JSON.parse(res.data.data.seats))
            })
            .catch((res) => {
                console.log(res);
            })
    }, [])

    //Cập nhật tên hàng ghế
    const renameObj = (obj) => {
        const newObj = {}
        Object.keys(obj).map((rowName, index) => {
            newObj[String.fromCharCode(index + 65)] = obj[rowName]
        })
        return newObj;
    }

    //Cập nhật tổng ghế
    const totalSeat = (seats) => {
        const totalSeat = Object.values(seats).reduce((acc, seats) => acc + seats.length, 0);
        setDataEdit((prev) => ({ ...prev, seat_qty: totalSeat }))
    }

    //Thêm hàng ghế
    const addRowSeat = () => {
        const rowSeat = Object.keys(dataSeat)
        let copyArraySeat = {}
        if (rowSeat.length > 0) {
            const lastRowSeat = rowSeat[rowSeat.length - 1]
            const newRowSeat = String.fromCharCode(lastRowSeat.charCodeAt(0) + 1)

            copyArraySeat = { ...dataSeat, [newRowSeat]: [1] };
        } else {
            copyArraySeat = {
                "A": [1],
            }
        }

        totalSeat(copyArraySeat)
        setDataSeat(copyArraySeat)
    }

    //Xoá hàng
    const deleteRowSeat = (rowName) => {
        const copyArraySeat = { ...dataSeat }
        delete copyArraySeat[rowName];

        totalSeat(copyArraySeat)
        setDataSeat(renameObj(copyArraySeat))
    }

    //xoá ghế
    const deleteSeat = (rowName) => {
        const copyArraySeat = { ...dataSeat }
        copyArraySeat[rowName].pop()

        totalSeat(copyArraySeat)
        setDataSeat(copyArraySeat)
    }

    //Thêm ghế
    const addSeat = (rowName) => {
        const copyArraySeat = { ...dataSeat }
        copyArraySeat[rowName].push(copyArraySeat[rowName].length + 1);

        totalSeat(copyArraySeat)
        setDataSeat(copyArraySeat)

    }

    //Lưu room
    const saveNewRoom = () => {

        if (dataRoom.name === "") {
            setError('Vui lòng nhập tên rạp')
        } else {
            setOpenLoading(true)
            setError('')
            const data = {
                name: dataEdit.name,
                total_seats: dataEdit.seat_qty,
                seats: dataSeat,
                id_theater: dataEdit.id_theater
            }

            let token = JSON.parse(localStorage.getItem('token'))
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }

            axios
                .put(' http://localhost:8000/api/admin/rooms/' + params.id, data, config)
                .then((res) => {
                    toast.success(res.data.message)
                    setOpenLoading(false)
                    navigate('/admin/theater/' + dataEdit.id_theater)
                })
                .catch((res) => {
                    toast.error("Tạo phòng không thành công")
                })
        }
    }

    const renderSeatPlan = () => {
        if (Object.keys(dataSeat).length > 0) {
            return Object.keys(dataSeat).map((rowName, index) => {
                return (
                    <>
                        <div className="card border-left-info me-2">
                            <div className="card-body row p-2" style={{ padding: "0.7rem" }}>
                                <div className="col-1">
                                    <button className="btn btn-success ms-4 rowChar mt-1">
                                        {String.fromCharCode(index + 65)}
                                    </button>
                                </div>
                                <div className="col-8 rowSeat border border-info rounded">
                                    <div className="mt-1 mb-1">
                                        {dataSeat[rowName].map((seatName, index1) => {
                                            return (
                                                <>
                                                    <img src={seat01} />
                                                    <span className="seat">{seatName}</span>
                                                    <input type='hidden' name='seat' value='' />
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="col-3">
                                    <button onClick={() => addSeat(rowName)} className="btn btn-warning btn-icon-split addSeat ms-2 mt-1" type="button">
                                        Thêm ghế
                                    </button>
                                    <button onClick={() => deleteSeat(rowName)} className="btn btn-danger btn-icon-split deletSeat ms-3 mt-1" type="button">
                                        Xoá ghế
                                    </button>
                                    <button onClick={() => deleteRowSeat(rowName)} className="btn btn-danger btn-icon-split cancel ms-3 mt-1" type="button">
                                        Xoá hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })
        }
    }
    return (
        <>
            <BackDrop open={openLoading} />
            <div className="ms-2">
                <div className="mb-3 ">
                    <h6><strong>Name Theater:</strong> {dataRoom.name} </h6>
                    <h6><strong>Address: </strong>{dataRoom.address}</h6>
                </div>
                <div className="mb-3">
                    <button onClick={saveNewRoom} type="button" className="btn btn-success me-2 mt-2 ">
                        Lưu
                        <SaveIcon />
                    </button>
                    <strong className="me-2">Total Seat</strong>
                    <input value={dataEdit.seat_qty} disabled></input>
                    <strong className="me-2 ms-2">Name Theater</strong>
                    <input
                        value={dataEdit.name}
                        onChange={
                            (e) => { setDataEdit((prev) => ({ ...prev, name: e.target.value })) }
                        }
                        required='true'
                    ></input>
                    <span className="ms-2" style={{ color: "red" }}>{error}</span>
                </div>
                {renderSeatPlan()}
                <button type="button" onClick={addRowSeat} className="btn btn-primary mt-2">
                    Thêm hàng
                </button>
            </div>
        </>
    )
}

export default RoomEdit