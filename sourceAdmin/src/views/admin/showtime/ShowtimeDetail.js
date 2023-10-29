import { useEffect, useState } from "react";
import BackDrop from "../../../components/BackDrop";
import Table from 'react-bootstrap/Table';
import { http } from "../../../utils/http";
import { debounce } from 'lodash';
import { IconButton } from "@mui/material";
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ReactPaginate from "react-paginate";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import ModalEditShowtime from "./ModalEditShowtime";

function ShowTimeDetail() {
    const location = useLocation();
    const showtimeDate = location.state.showtime_date;

    const params = useParams()
    const [showtime, setShowtime] = useState({})
    const [openLoading, setOpenLoading] = useState(false)

    const [queryDate, setQueryDate] = useState('')

    const [sortBy, setSortBy] = useState('desc')
    const [sortField, setSortField] = useState('')

    const [page, setPage] = useState(1)
    const [showtimePerPage, setShowtimePerPage] = useState(5)
    const [totalPage, setTotalPage] = useState()

    const [showModalEdit, setShowModalEdit] = useState(false)
    const handleShowEdit = () => setShowModalEdit(true)

    const [dataModal, setDataModal] = useState()
    const handleClose = () => {
        setShowModalEdit(false)
    }
    const handleDataAfterEdit = () => {
        debounce(queryDate, sortBy, sortField)
    }
    useEffect(() => {
        debounceSearch(queryDate, sortBy, sortField)
    }, [queryDate, , sortBy, sortField])


    const debounceSearch = debounce((queryDate, sortBy, sortField) => {
        setOpenLoading(true)
        http
            .get(
                `/showtimes/show-by-theater?
                id_theater=${params.id}
                &date=${showtimeDate.showtimeDate}
                &column=${sortField}
                &direction=${sortBy}
                `
            )
            .then((res) => {
                setShowtime(res.data.data.data)
                setOpenLoading(false)
                setTotalPage(res.data.data.last_page)
            })
            .catch((res) => {
                console.log(res);
                setOpenLoading(false)
                // toast.error('Tìm kiếm rạp không thành công')
            })
    }, 500)

    const handlePageClick = (event) => {
        setPage(+event.selected + 1)
    }

    return (
        <>
            <BackDrop open={openLoading} />
            <ModalEditShowtime
                show={showModalEdit}
                handleClose={handleClose}
                dataModal={dataModal}
                idTheater={params.id}
                handleDataAfterEdit={handleDataAfterEdit}
            />
            <div className="container  p-5">
                <div className="d-flex justify-content-between mb-2">
                    <h2 className="mb-2"> ShowTime</h2>
                </div>
                {/* <div className=" mb-4">
                    <h6 ><strong>Name: </strong>{showtime.name}</h6>
                    <h6><strong>Address: </strong> {showtime.address}</h6>
                </div> */}
                <div className="d-flex justify-content-between mb-2 col-12">
                    <h4 className="mb-2"> Search: </h4>
                    <div className="col-3">
                        <input
                            placeholder="Ngày"
                            className="form-control"
                            type="date"
                            value={queryDate}
                            onChange={(e) => {
                                setQueryDate(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div className="scrollbar scrollbar-secondary ">
                    <Table striped bordered hover className="force-overflow">
                        <thead>
                            <tr className="text-center">
                                <th className="col-1">
                                    ID
                                    <IconButton
                                        onClick={() => {
                                            setSortBy(sortBy === "asc" ? "desc" : "asc");
                                            setSortField("showtime.id");
                                        }}
                                        aria-label="delete"
                                        size="small">
                                        <ImportExportIcon />
                                    </IconButton>
                                </th>
                                <th>
                                    <span>Room name</span>
                                    <IconButton
                                        onClick={() => {
                                            setSortBy(sortBy === "asc" ? "desc" : "asc");
                                            setSortField(" room_name");
                                        }}
                                        aria-label="delete"
                                        size="small">
                                        <ImportExportIcon />
                                    </IconButton>
                                </th>
                                <th>
                                    <span>Movie Name</span>
                                    <IconButton
                                        onClick={() => {
                                            setSortBy(sortBy === "asc" ? "desc" : "asc");
                                            setSortField("movie_name");
                                        }}
                                        aria-label="delete"
                                        size="small">
                                        <ImportExportIcon />
                                    </IconButton>
                                </th>
                                <th>
                                    <span>Start Time</span>
                                </th>
                                <th>
                                    <span>End Time</span>
                                </th>
                                <th>
                                    <span>Date</span>
                                </th>
                                <th>
                                    <span>Price</span>
                                </th>
                                <th className="col-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {showtime &&
                                showtime.length > 0 &&
                                showtime.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.room_name}</td>
                                            <td>{item.movie_name}</td>
                                            <td>{item.start_at}</td>
                                            <td>{item.end_at}</td>
                                            <td>{item.date}</td>
                                            <td>{item.price} VNĐ</td>
                                            <td>
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        setDataModal(item)
                                                        handleShowEdit()
                                                    }}
                                                >
                                                    <EditIcon />
                                                </button>
                                                <button
                                                    onClick={() => {

                                                    }}
                                                    className="btn "
                                                >
                                                    <DeleteForeverIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={2}
                        pageCount={totalPage}
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
                    <div className="col-1">
                        <select
                            className="form-select"
                            placeholder=""
                            value={showtimePerPage}
                            onChange={(e) => {
                                setShowtimePerPage(e.target.value)
                            }}
                        >
                            <option value={5} key={1}>5</option>
                            <option value={10} key={2}>10</option>
                            <option value={15} key={3}>15</option>
                        </select>
                    </div>
                </div>
            </div >

        </>
    )
}
export default ShowTimeDetail