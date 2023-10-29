import { useEffect, useState } from "react";
import seat01 from "../../../images/seat01.png";
import { http } from "../../../utils/http";
import './RoomAddition.css'
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackDrop from "../../../components/BackDrop";

function RoomAddition() {

    useEffect(() => {
        setArraySeat({
            "A": [1],
        })
    }, [])
    const navigate = useNavigate()
    const [openLoading, setOpenLoading] = useState(false)
    const [error, setError] = useState('')
    const [arraySeat, setArraySeat] = useState({})
    const [dataRoom, setDataRoom] = useState({
        name: "",
        total_seats: 1,
        id_theater: ""
    })
    const params = useParams()

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
        setDataRoom((prev) => ({ ...prev, total_seats: totalSeat }))
    }

    //Thêm hàng ghế
    const addRowSeat = () => {
        const rowSeat = Object.keys(arraySeat)
        let copyArraySeat = {}
        if (rowSeat.length > 0) {
            const lastRowSeat = rowSeat[rowSeat.length - 1]
            const newRowSeat = String.fromCharCode(lastRowSeat.charCodeAt(0) + 1)

            copyArraySeat = { ...arraySeat, [newRowSeat]: [1] };
        } else {
            copyArraySeat = {
                "A": [1],
            }
        }

        totalSeat(copyArraySeat)
        setArraySeat(copyArraySeat)
    }

    //Xoá hàng ghế
    const deleteRowSeat = (rowName) => {
        const copyArraySeat = { ...arraySeat }
        delete copyArraySeat[rowName];

        totalSeat(copyArraySeat)
        setArraySeat(renameObj(copyArraySeat))
    }

    //Thêm ghế
    const addSeat = (rowName) => {
        const copyArraySeat = { ...arraySeat }
        copyArraySeat[rowName].push(copyArraySeat[rowName].length + 1);

        totalSeat(copyArraySeat)
        setArraySeat(copyArraySeat)

    }

    //Xoá ghế
    const deleteSeat = (rowName) => {
        const copyArraySeat = { ...arraySeat }
        copyArraySeat[rowName].pop()

        totalSeat(copyArraySeat)
        setArraySeat(copyArraySeat)
    }

    //Lưu room
    const saveNewRoom = () => {
        if (dataRoom.name === "") {
            setError('Vui lòng nhập tên rạp')
        } else {
            setOpenLoading(true)        

            setError('')
            const data = {
                name: dataRoom.name,
                total_seats: dataRoom.total_seats,
                seats: arraySeat,
                id_theater: params.id
            }

            http
                .post('admin/rooms', data)
                .then((res) => {
                    toast.success(res.data.message)
                    setOpenLoading(false)
                    navigate('/admin/theater/' + params.id)
                })
                .catch((res) => {
                    toast.error("Tạo phòng không thành công")
                })
        }

    }

    const renderSeatPlan = () => {
        if (Object.keys(arraySeat).length > 0) {
            return Object.keys(arraySeat).map((rowName, index) => {
                return (
                    <div className="card border-left-info mx-2">
                        <div className="card-body row p-2" style={{ padding: "0.7rem" }}>
                            <div className="col-1">
                                <button className="btn btn-success ms-4 rowChar mt-1">
                                    {String.fromCharCode(index + 65)}
                                </button>
                            </div>
                            <div className="col-8 rowSeat border border-info rounded">
                                <div className="mt-1 mb-1">
                                    {arraySeat[rowName].map((seatName, index1) => {
                                        return (
                                            <>
                                                <img src={seat01} />
                                                <span className="seat">{seatName}</span>
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
                )
            })
        }
    }

    return (
        <>
            <BackDrop open={openLoading} />

            <div className="mb-3">
                <button type="button" onClick={saveNewRoom} className="btn btn-success mx-2 mt-2 ">
                    Lưu
                    <SaveIcon />
                </button>
                <strong className="me-2">Total Seat</strong>
                <input value={dataRoom.total_seats} disabled></input>
                <strong className="me-2 ms-2">Name Room</strong>
                <input
                    required='true'
                    onChange={
                        (e) => { setDataRoom((prev) => ({ ...prev, name: e.target.value })) }
                    }
                    value={dataRoom.name}
                ></input>
                <span className="ms-2" style={{ color: "red" }}>{error}</span>
            </div>
            {renderSeatPlan()}
            <div className="">
                <button type="button" onClick={addRowSeat} className="btn btn-primary mx-2 mt-2">
                    Thêm hàng
                </button>
            </div>
        </>
    )
}

export default RoomAddition