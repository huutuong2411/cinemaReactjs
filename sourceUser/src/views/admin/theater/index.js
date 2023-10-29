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

    // const handleShowModal = (typeModal) => {
    //     if (typeModal == 'add') {
    //         setShowModalAdd(true)
    //     } else if (typeModal == 'edit') {
    //         setShowModalEdit(true)

    //     } else if (typeModal == 'delete') {
    //         setShowModalDelete(true)
    //     }
    // }
    const [query, setQuery] = useState('');
    const [theaterAfterQuery, setTheaterAfterQuery] = useState({})
    const [cities, setCities] = useState([])
    let handleSearch = ''

    const handleClose = () => {
        setShowModalEdit(false)
        setShowModalDelete(false)
        setShowModalAdd(false)
    }

    const handleDataAfterEdit = (data) => {
        const updatedTheaterList = theater.map((obj) => {
            if (obj.id === data.id) {
                return { ...obj, address: data.address };
            } else {
                return obj;
            }
        });
        setTheater(updatedTheaterList)
    }

    const handleDataAfterDelete = (id) => {
        const newListTheater = theater.filter((obj) => obj.id !== id)
        setTheater(newListTheater)
    }

    const handleDataAfterAdd = (data) => {
        setOpenLoading(true)
        http.get('/theaters')
            .then((res) => {
                setTheater(res.data.data)
                setOpenLoading(false)
            });
    }
    useEffect(() => {
        setOpenLoading(true)
        http.get('/theaters')
            .then((res) => {
                setTheater(res.data.data)
                setOpenLoading(false)
                setTheaterAfterQuery(res.data.data)
            });

    }, [])

    useEffect(() => {
        if (query && query !== "") {
            debounceSearch(query, handleSearch)
        }
        setTheater(theaterAfterQuery)
    }, [query])

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

    const debounceSearch = debounce((searchQuery, handleSearch) => {
        setOpenLoading(true)

        if (handleSearch === 'theater') {
            http.get(`/theaters?key_word=${searchQuery}`)
                .then((res) => {
                    setTheater(res.data.data)
                    setOpenLoading(false)
                })
                .catch((res) => {
                    toast.error('Tìm kiếm rạp không thành công')
                })

        } else {
            http.get(`/theaters?city=${searchQuery}`)
                .then((res) => {
                    setTheater(res.data.data)
                    setOpenLoading(false)
                })
                .catch((res) => {
                    toast.error('Tìm kiếm rạp không thành công')
                })
        }

    }, 700)

    const renderCity = () => {
        if (cities.length > 0) {
            return cities.map((value, index) => {
                return (
                    <option className="option" id={value.id} value={value.id}>{value.name}</option>
                )
            })
        }
    }

    return (
        <>
            <BackDrop open={openLoading} />
            <div className="container mt-5 p-5">
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

                        <Link to={'admin/category'}><button className="btn btn-primary"  >Go to trash </button></Link>

                    </div>
                </div>
                <div className="d-flex justify-content-between mb-2 ">
                    <h4 className="mb-2"> Search: </h4>
                    <div className="col-auto">
                        <input
                            placeholder="Tên rạp"
                            className="form-control"
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value)
                                handleSearch = 'theater'
                            }}
                        />
                    </div>
                    <div className="col-auto">
                        <input
                            placeholder="Tên thành phố"
                            className="form-control"
                            type="text"
                            onChange={(e) => {
                                setQuery(e.target.value)
                                handleSearch = 'city'
                            }}
                        />
                        <datalist role="listbox" id="city">
                            {renderCity()}
                        </datalist>
                    </div>
                </div>
                {/* <div className="col-3 mb-2">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search user by Email"
                    // onChange={(event) => handleSearch(event)}
                    />
                </div> */}
                <div className="scrollbar scrollbar-secondary ">
                    <Table striped bordered hover className="force-overflow">
                        <thead>
                            <tr className="text-center">
                                <th className="col-1">
                                    ID
                                    <span
                                        className="sort-header"
                                    // onClick={() => {
                                    //     setSortBy(sortBy === "asc" ? "desc" : "asc");
                                    //     setSortField("id");
                                    // }}
                                    >
                                        <i className="fa-solid fa-arrow-up-long text-success"></i>
                                        <i className="fa-solid fa-arrow-down-long text-success"></i>
                                    </span>
                                </th>
                                <th>
                                    <span>Name</span>
                                    <span
                                        className="sort-header"
                                    // onClick={() => {
                                    //     setSortBy(sortBy === "asc" ? "desc" : "asc");
                                    //     setSortField("first_name");
                                    // }}
                                    >
                                        <i className="fa-solid fa-arrow-up-long text-success"></i>
                                        <i className="fa-solid fa-arrow-down-long text-success"></i>
                                    </span>
                                </th>
                                <th>
                                    <span>Address</span>
                                    <span
                                        className="sort-header"
                                    // onClick={() => {
                                    //     setSortBy(sortBy === "asc" ? "desc" : "asc");
                                    //     setSortField("first_name");
                                    // }}
                                    >
                                        <i className="fa-solid fa-arrow-up-long text-success"></i>
                                        <i className="fa-solid fa-arrow-down-long text-success"></i>
                                    </span>
                                </th>

                                <th>
                                    <span>City</span>
                                    <span
                                        className="sort-header"
                                    // onClick={() => {
                                    //     setSortBy(sortBy === "asc" ? "desc" : "asc");
                                    //     setSortField("first_name");
                                    // }}
                                    >
                                        <i className="fa-solid fa-arrow-up-long text-success"></i>
                                        <i className="fa-solid fa-arrow-down-long text-success"></i>
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
                                                    className="mx-3 btn "
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
            </div >
        </>
    );
};

export default Theater

