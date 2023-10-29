import { Link } from "react-router-dom"
import { CardText, Table } from "react-bootstrap"
import { useEffect, useState } from "react"
import { http } from "../../../utils/http";
import { toast } from "react-toastify";
import BackDrop from "../../../components/BackDrop";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ModalAddMovie from "./ModalAddMovie";
import ModalEditMovie from "./ModalEditMovie";
import { debounce } from 'lodash';
import ReactPaginate from "react-paginate";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModalShowMovie from "./ModalShowMovie";
import ModalDeleteMovie from "./ModalDeleteMovie";

function Movie() {
    const [dataMovie, setDataMovie] = useState([])
    const [openLoading, setOpenLoading] = useState(false)
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [dataModal, setDataModal] = useState()
    const [categories, setCategories] = useState()

    const handleShowMovie = () => setShowModal(true)
    const handleShowAddMovie = () => setShowModalAdd(true)
    const handleShowEditModal = () => setShowModalEdit(true)
    const handleDeleteMovie = () => setShowModalDelete(true)

    const [queryMovie, setQueryMovie] = useState('')
    const [queryCategories, setQueryCategories] = useState('')

    const [totalPage, setTotalPage] = useState()
    const [page, setPage] = useState(1)
    const [theaterPerPage, setTheaterPerPage] = useState(5)

    const handleClose = () => {
        setShowModalEdit(false)
        setShowModal(false)
        setShowModalDelete(false)
        setShowModalAdd(false)
    }

    const handleDataAfterAdd = (data) => {
        setDataMovie(state => ([...state, data]))
    }

    const handleDataAfterDelete = () => {
        debounceSearch(queryMovie, queryCategories, page, theaterPerPage)
    }

    useEffect(() => {
        http
            .get('/categories')
            .then((res) => {
                setCategories(res.data.data)
            })
            .catch((res) => {
                toast.error('Lấy danh sách thể loại không thành công')
            })
    }, [])

    useEffect(() => {
        debounceSearch(queryMovie, queryCategories, page, theaterPerPage)
    }, [queryMovie, queryCategories, page])

    const debounceSearch = debounce((queryMovie, queryCategories, page, theaterPerPage, sortBy, sortField) => {
        setOpenLoading(true)
        http
            .get(
                `/movies?
                key_word=${queryMovie}
                &id_category=${queryCategories}
                &per_page=${theaterPerPage}
                &page=${page}
                `
            )
            .then((res) => {
                setDataMovie(res.data.data.data)
                setOpenLoading(false)
                console.log(res)
                setTotalPage(res.data.data.last_page)
                // setTotalPage(res.data.pagination.last_page)
            })
            .catch((res) => {
                console.log(res);
                setOpenLoading(false)
                toast.error("lấy danh sách phim không thành công");
            })
    }, 500)

    const handlePageClick = (event) => {
        setPage(+event.selected + 1)
    }

    const renderCategory = () => {
        if (categories) {
            if (categories.length > 0) {
                return categories.map((value, index) => {
                    return (
                        <option className="option" id={value.id} value={value.id}>{value.category}</option>
                    )
                })
            }
        }

    }
    return (
        <>

            <BackDrop open={openLoading} />
            <div className="container p-5">
                <ModalAddMovie
                    show={showModalAdd}
                    handleClose={handleClose}
                    handleDataAfterAdd={handleDataAfterAdd}
                />
                <ModalEditMovie
                    show={showModalEdit}
                    handleClose={handleClose}
                    dataModal={dataModal}
                // handleDataAfterEdit={handleDataAfterEdit}
                />
                <ModalShowMovie
                    show={showModal}
                    handleClose={handleClose}
                    dataModal={dataModal}
                />
                <ModalDeleteMovie
                    show={showModalDelete}
                    handleClose={handleClose}
                    dataModal={dataModal}
                    handleDataAfterDelete={handleDataAfterDelete}
                />
                <div className="d-flex justify-content-between mb-2">
                    <h2 className="mb-2"> List Movie:</h2>
                    <div>
                        {/* <CSVLink
                            // data={listUsers}
                            // headers={headers}
                            asyncOnClick={true}
                            className="btn btn-warning mx-2"
                        >
                            Export
                        </CSVLink> */}
                        <button onClick={handleShowAddMovie} className="btn btn-primary me-2">
                            Add Movie
                        </button>
                        <Link to={'trash'}><button className="btn btn-primary"  >Go to trash </button></Link>
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-2 col-5">
                    <h4 className="mb-2 col-2"> Search </h4>
                    <div className="col-4">
                        <input
                            placeholder="Name"
                            className="form-control"
                            type="text"
                            value={queryMovie}
                            onChange={(e) => {
                                setQueryMovie(e.target.value)
                            }}
                        />
                    </div>
                    <div className="col-4">
                        <select
                            className="form-select"
                            placeholder="Select Genre"
                            value={queryCategories}
                            onChange={(e) => {
                                setQueryCategories(e.target.value)
                            }}
                        >
                            <option value={''}>Select Genre</option>
                            {renderCategory()}
                        </select>
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
                                    <span
                                        className="sort-header"
                                    >
                                    </span>
                                </th>
                                <th>
                                    <span>Image</span>
                                    <span
                                        className="sort-header"
                                    >
                                    </span>
                                </th>
                                <th>
                                    <span>Start Day</span>
                                    <span
                                        className="sort-header"
                                    >
                                    </span>
                                </th>
                                <th>
                                    <span>Genre</span>
                                    <span
                                        className="sort-header"
                                    >
                                    </span>
                                </th>
                                <th>
                                    <span>Total Sale</span>
                                    <span
                                        className="sort-header"
                                    >
                                    </span>
                                </th>
                                <th className="col-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {dataMovie &&
                                dataMovie.length > 0 &&
                                dataMovie.map((item, index,) => {
                                    return (
                                        <tr key={item}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td><img style={{ width: "80px" }} src={item.image} /></td>
                                            <td>{item.start_date}</td>
                                            <td>{item.category_name}</td>
                                            <td>{item.total_sales ? item.total_sales : "Chưa có vé nào được bán"}</td>
                                            <td>
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        setDataModal(item)
                                                        handleShowEditModal()
                                                    }}
                                                >
                                                    <EditIcon />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setDataModal(item)
                                                        handleDeleteMovie()
                                                    }}
                                                    className="btn "
                                                >
                                                    <DeleteForeverIcon />
                                                </button>
                                                {/* <Link to={'/admin/theater/' + item.id}> */}
                                                <button
                                                    className="btn "
                                                    onClick={() => {
                                                        setDataModal(item)
                                                        handleShowMovie()
                                                    }}
                                                >
                                                    <RemoveRedEyeIcon />
                                                </button>
                                                {/* </Link> */}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <div>
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
                    </div>
                    <div className="col-1">
                        <select
                            className="form-select"
                            placeholder=""
                            value={theaterPerPage}
                            onChange={(e) => {
                                setTheaterPerPage(e.target.value)
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
export default Movie