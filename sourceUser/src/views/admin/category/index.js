import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import BackDrop from "../../../components/BackDrop";
import Table from 'react-bootstrap/Table';
import ReactPaginate from "react-paginate";
import ModalAddNewCate from "./ModalAddCate";
import ModalEditCate from "./ModalEditCate";
import ModalDeleteCate from "./ModalDeleteCate";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate, Link } from "react-router-dom";

const Category = () => {
    const [category, setCategory] = useState()
    const [openLoading, setOpenLoading] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [dataModal, setDataModal] = useState({})

    const handleShowEditTable = () => setShowModalEdit(true)
    const handleShowAddTable = () => setShowModalAdd(true)
    const handleShowDeleteTable = () => setShowModalDelete(true)


    const handleClose = () => {
        setShowModalEdit(false)
        setShowModalDelete(false)
        setShowModalAdd(false)
    }
    const handleDataAfterEdit = (data) => {
        const updatedCaterList = category.map((obj) => {
            if (obj.id === data.id) {
                return { ...obj, category: data.category };
            } else {
                return obj;
            }
        });
        setCategory(updatedCaterList)
    }

    const handleDataAfterDelete = (id) => {
        const newListCategory = category.filter((obj) => obj.id !== id)
        setCategory(newListCategory)
    }

    const handleDataAfterAdd = (data) => {
        setCategory(state => ([...state, data]))
        console.log(category);
        console.log(data);
    }
    useEffect(() => {
        setOpenLoading(true)
        axios.get('http://127.0.0.1:8000/api/categories')
            .then((res) => {
                setCategory(res.data.data)
                setOpenLoading(false)
            });

    }, [])

    return (
        <>
            <BackDrop open={openLoading} />
            <div className="container mt-5 p-5">
                <ModalAddNewCate
                    show={showModalAdd}
                    handleClose={handleClose}
                    handleDataAfterAdd={handleDataAfterAdd}
                />
                <ModalEditCate
                    show={showModalEdit}
                    handleClose={handleClose}
                    dataModal={dataModal}
                    handleDataAfterEdit={handleDataAfterEdit}
                />

                <ModalDeleteCate
                    show={showModalDelete}
                    handleClose={handleClose}
                    dataModal={dataModal}
                    handleDataAfterDelete={handleDataAfterDelete}
                />
                <div className="d-flex justify-content-between mb-2">
                    <h2 className="mb-2"> List Categories:</h2>
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
                            Add Category
                        </button>

                        <Link to={'admin/category'}><button className="btn btn-primary"  >Go to trash </button></Link>

                    </div>
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
                                <th className="col-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {category &&
                                category.length > 0 &&
                                category.map((item, index, category) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.category}</td>
                                            <td>
                                                <button
                                                    className="mx-3 btn "
                                                    onClick={() => {
                                                        setDataModal(item, category)
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

export default Category

