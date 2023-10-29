import { useEffect, useState } from "react";
import { http } from "../../../utils/http";
import BackDrop from "../../../components/BackDrop";
import Table from 'react-bootstrap/Table';
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function TrashRoom() {
    const [openLoading, setOpenLoading] = useState(false)
    const [roomTrash, setRoomTrash] = useState()
    const [cities, setCities] = useState([])

    useEffect(() => {
        setOpenLoading(true)
        http
            .get('admin/rooms/trash')
            .then((res) => {
                setOpenLoading(false)
                setRoomTrash(res.data.data)
            })
    }, [])
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

    const handleRestore = (id) => {
        http
            .get('admin/rooms/restore/' + id)
            .then((res) => {
                toast.success(res.data.message)
                const newListData = roomTrash.filter((obj) => obj.id !== id)
                setRoomTrash(newListData)
            })
            .catch((res) => {
                toast.error('Khôi phục không thành công')
            })
    }
    return (
        <>
            <BackDrop open={openLoading} />
            <div className="container p-5">
                {/* <ModalDeleteCate
                /> */}
                <div className="d-flex justify-content-between mb-2">
                    <h2 className="mb-2"> List Theaters:</h2>
                    {/* <div>
                        <Link to={'/admin/theater/'}><button className="btn btn-primary"  >Back to theater detail </button></Link>
                    </div> */}
                </div>
                <div className="scrollbar scrollbar-secondary ">
                    <Table striped bordered hover className="force-overflow">
                        <thead>
                            <tr className="text-center">
                                <th className="col-1">
                                    ID
                                    <span
                                        className="sort-header"
                                    >
                                        <i className="fa-solid fa-arrow-up-long text-success"></i>
                                        <i className="fa-solid fa-arrow-down-long text-success"></i>
                                    </span>
                                </th>
                                <th>
                                    <span>Name</span>
                                    <span
                                        className="sort-header"
                                    >
                                        <i className="fa-solid fa-arrow-up-long text-success"></i>
                                        <i className="fa-solid fa-arrow-down-long text-success"></i>
                                    </span>
                                </th>
                                <th>
                                    <span>Total Seat</span>
                                    <span
                                        className="sort-header"

                                    >
                                        <i className="fa-solid fa-arrow-up-long text-success"></i>
                                        <i className="fa-solid fa-arrow-down-long text-success"></i>
                                    </span>
                                </th>
                                <th className="col-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {roomTrash &&
                                roomTrash.length > 0 &&
                                roomTrash.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.seat_qty}</td>
                                            <td>
                                                <button
                                                    onClick={() => handleRestore(item.id)}
                                                    className="btn btn-outline-primary"
                                                >
                                                    Restore
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    // onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    // pageCount={total_pages}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="pagea-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </div>
        </>
    )
}
export default TrashRoom