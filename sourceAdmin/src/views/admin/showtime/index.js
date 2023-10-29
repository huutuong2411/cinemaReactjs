import { useEffect, useState } from "react";
import BackDrop from "../../../components/BackDrop";
import Table from 'react-bootstrap/Table';
import { http } from "../../../utils/http";
import { debounce } from 'lodash';
import { IconButton } from "@mui/material";
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ReactPaginate from "react-paginate";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from "react-router-dom";

function ShowTime() {
    const navigate = useNavigate()
    const [showtime, setShowtime] = useState({})
    const [openLoading, setOpenLoading] = useState(false)
    const [cities, setCities] = useState({})

    const [queryCity, setQueryCity] = useState('')
    const [queryTheater, setQueryTheater] = useState('')
    const [queryDate, setQueryDate] = useState('')

    const [sortBy, setSortBy] = useState('desc')
    const [sortField, setSortField] = useState('')

    const [page, setPage] = useState(1)
    const [showtimePerPage, setShowtimePerPage] = useState(5)
    const [totalPage, setTotalPage] = useState()

    const handleShowtimeDetail = (showtimeDate, theaterID) => {
        navigate('/admin/showtime-detail-by-theater/' + theaterID, { state: { showtime_date: { showtimeDate } } })
    }
    useEffect(() => {
        debounceSearch(queryCity, queryTheater, queryDate, sortBy, sortField)
    }, [queryCity, queryTheater, queryDate, , sortBy, sortField])

    useEffect(() => {
        http
            .get('/cities')
            .then((res) => {
                setCities(res.data.data)
            })

    }, [])

    const debounceSearch = debounce((queryCity, queryTheater, queryDate, sortBy, sortField) => {
        setOpenLoading(true)
        http
            .get(
                `/showtimes?
                id_city=${queryCity}
                &key_word=${queryTheater}
                &date=${queryDate}
                &column=${sortField}
                &direction=${sortBy}
                `
            )
            .then((res) => {
                console.log(res);
                setShowtime(res.data.data)
                setOpenLoading(false)
                setTotalPage(res.data.pagination.last_page)
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
    const renderCity = () => {
        if (cities.length > 0) {
            return cities.map((value, index) => {
                return (
                    <option className="option" key={value.id} id={value.id} value={value.id}>{value.name}</option>
                )
            })
        }
    }
    return (
        <>
            <BackDrop open={openLoading} />
            <div className="container p-5">
                <div className="d-flex justify-content-between mb-2">
                    <h2 className="mb-2">ShowTime</h2>
                    <div>
                        <button className="btn btn-primary me-2">
                            Add ShowTime
                        </button>
                        {/* <Link to={'trash'}><button className="btn btn-primary">Go to trash</button></Link> */}
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-2 col-12">
                    <h4 className="mb-2"> Search: </h4>
                    <div className="col-3">
                        <select
                            className="form-select"
                            placeholder="Tên thành phố"
                            value={queryCity}
                            onChange={(e) => {
                                setQueryCity(e.target.value)
                            }}
                        >
                            <option value={''}>Select City</option>
                            {renderCity()}
                        </select>
                    </div>
                    <div className="col-3">
                        <input
                            placeholder="Tên rạp"
                            className="form-control"
                            type="text"
                            value={queryTheater}
                            onChange={(e) => {
                                setQueryTheater(e.target.value)
                            }}
                        />
                    </div>
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

                                </th>
                                <th>
                                    <span>Name</span>
                                    <IconButton
                                        onClick={() => {
                                            setSortBy(sortBy === "asc" ? "desc" : "asc");
                                            setSortField("theater_name");
                                        }}
                                        aria-label="delete"
                                        size="small">
                                        <ImportExportIcon />
                                    </IconButton>
                                </th>
                                <th>
                                    <span>Date</span>
                                    <IconButton
                                        onClick={() => {
                                            setSortBy(sortBy === "asc" ? "desc" : "asc");
                                            setSortField("showtime_date");
                                        }}
                                        aria-label="delete"
                                        size="small">
                                        <ImportExportIcon />
                                    </IconButton>
                                </th>
                                <th>
                                    <span>Total showtime</span>
                                    <IconButton
                                        onClick={() => {
                                            setSortBy(sortBy === "asc" ? "desc" : "asc");
                                            setSortField("showtime_count");
                                        }}
                                        aria-label="delete"
                                        size="small">
                                        <ImportExportIcon />
                                    </IconButton>
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
                                            <td>{item.theater_id}</td>
                                            <td>{item.theater_name}</td>
                                            <td>{item.showtime_date}</td>
                                            <td>{item.showtime_count}</td>
                                            <td>

                                                <button
                                                    className="btn "
                                                    onClick={() => handleShowtimeDetail(item.showtime_date, item.theater_id)}
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
export default ShowTime