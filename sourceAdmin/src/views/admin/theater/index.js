import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { debounce } from 'lodash';
import EditIcon from '@mui/icons-material/Edit';
import BackDrop from "../../../components/BackDrop";
import Table from 'react-bootstrap/Table';
import ReactPaginate from "react-paginate";
import ModalAddNewTheater from "./ModalAddTheater";
import ModalEditTheater from "./ModalEditTheater";
import ModalDeleteTheater from "./ModalDeleteTheater";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from "react-router-dom";
import { http } from "../../../utils/http";
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { IconButton } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const Theater = () => {
    const [theater, setTheater] = useState([])
    const [openLoading, setOpenLoading] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [dataModal, setDataModal] = useState({})

    const handleShowEditTable = () => setShowModalEdit(true)
    const handleShowAddTable = () => setShowModalAdd(true)
    const handleShowDeleteTable = () => setShowModalDelete(true)

    const [queryCity, setQueryCity] = useState('');
    const [queryTheater, setQueryTheater] = useState('');

    const [cities, setCities] = useState([])

    const [totalPage, setTotalPage] = useState()
    const [page, setPage] = useState(1)
    const [theaterPerPage, setTheaterPerPage] = useState(5)

    const [sortBy, setSortBy] = useState('asc')
    const [sortField, setSortField] = useState('id')

    const handleClose = () => {
        setShowModalEdit(false)
        setShowModalDelete(false)
        setShowModalAdd(false)
    }

    useEffect(() => {
        http
            .get('/cities')
            .then((res) => {
                setCities(res.data.data)
            })

    }, [])

    useEffect(() => {
        debounceSearch(queryTheater, queryCity, page, theaterPerPage, sortBy, sortField)
    }, [queryTheater, queryCity, page, theaterPerPage, sortBy, sortField])

    const handleDataAfterEdit = () => {
        debounceSearch(queryTheater, queryCity, page, theaterPerPage, sortBy, sortField)
    }

    const handleDataAfterDelete = () => {
        debounceSearch(queryTheater, queryCity, page, theaterPerPage, sortBy, sortField)
    }

    const handleDataAfterAdd = () => {
        debounceSearch(queryTheater, queryCity, page, theaterPerPage, sortBy, sortField)
    }
    const debounceSearch = debounce((queryTheater, queryCity, page, theaterPerPage, sortBy, sortField) => {
        setOpenLoading(true)
        http
            .get(
                `/theaters?
                id_city=${queryCity}
                &key_word=${queryTheater}
                &per_page=${theaterPerPage}
                &page=${page}
                &column=${sortField}
                &direction=${sortBy}
                `
            )
            .then((res) => {
                setTheater(res.data.data)
                setOpenLoading(false)
                setTotalPage(res.data.pagination.last_page)
            })
            .catch((res) => {
                console.log(res);
                setOpenLoading(false)
                toast.error('Tìm kiếm rạp không thành công')
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
            <div className="container  p-5">
                <ModalAddNewTheater
                    show={showModalAdd}
                    handleClose={handleClose}
                    handleDataAfterAdd={handleDataAfterAdd}
                />
                <ModalEditTheater
                    show={showModalEdit}
                    handleClose={handleClose}
                    dataModal={dataModal}
                    handleDataAfterEdit={handleDataAfterEdit}
                />

                <ModalDeleteTheater
                    show={showModalDelete}
                    handleClose={handleClose}
                    dataModal={dataModal}
                    handleDataAfterDelete={handleDataAfterDelete}
                />
                <div className="d-flex justify-content-between mb-2">
                    <h2 className="mb-2"> List Theater:</h2>
                    <div>
                        {/* <CSVLink
                            // data={listUsers}
                            // headers={headers}
                            asyncOnClick={true}
                            className="btn btn-warning mx-2"
                        >
                            Export
                        </CSVLink> */}
                        <button onClick={handleShowAddTable} className="btn btn-primary me-2">
                            Add Theater
                        </button>
                        <Link to={'trash'}><button className="btn btn-primary"  >Go to trash </button></Link>
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-2 col-5">
                    <h4 className="mb-2 col-2"> Search: </h4>
                    <div className="col-4">
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
                    <div className="col-4">
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
                                            setSortField("id");
                                        }}
                                        aria-label="delete"
                                        size="small">
                                        <ImportExportIcon />
                                    </IconButton>
                                </th>
                                <th>
                                    <span>Name</span>
                                    <span
                                        className="sort-header"
                                    >
                                    </span>
                                </th>
                                <th>
                                    <span>Address</span>
                                    <span
                                        className="sort-header"
                                    >
                                    </span>
                                </th>
                                <th>
                                    <span>City</span>
                                    <span
                                        className="sort-header"
                                    >
                                    </span>
                                </th>
                                <th className="col-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {theater &&
                                theater.length > 0 &&
                                theater.map((item, index, theater) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.address}</td>
                                            <td>{item.cities.name}</td>
                                            <td>
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        setDataModal(item, theater)
                                                        handleShowEditTable()
                                                    }}
                                                >
                                                    <EditIcon />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setDataModal(item)
                                                        handleShowDeleteTable()
                                                    }}
                                                    className="btn "
                                                >
                                                    <DeleteForeverIcon />
                                                </button>
                                                <Link to={'/admin/theater/' + item.id}>
                                                    <button
                                                        className="btn "
                                                    >
                                                        <RemoveRedEyeIcon />
                                                    </button>
                                                </Link>
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
    );
};

export default Theater

