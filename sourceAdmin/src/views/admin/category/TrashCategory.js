import { useEffect, useState } from "react";
import { http } from "../../../utils/http";
import BackDrop from "../../../components/BackDrop";
import Table from 'react-bootstrap/Table';
import ReactPaginate from "react-paginate";
import { Link, Route } from "react-router-dom";
import { toast } from "react-toastify";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import Category from ".";

function TrashCategory() {
    const [openLoading, setOpenLoading] = useState(false)
    const [categoryTrash, setCategoryTrash] = useState()

    useEffect(() => {
        setOpenLoading(true)
        http
            .get('admin/categories/trash')
            .then((res) => {
                setOpenLoading(false)
                setCategoryTrash(res.data.data)
                console.log(res.data.data)
            })
    }, [])

    const handleRestore = (id) => {
        http
            .get('admin/categories/restore/' + id)
            .then((res) => {
                toast.success(res.data.message)

                const newListData = categoryTrash.filter((obj) => obj.id !== id)
                setCategoryTrash(newListData)

            })
            .catch((res) => {
                console.log(res)
            })
    }
    return (
        <>
            <BackDrop open={openLoading} />
            <div className="container mt-5 p-5">
                {/* <ModalDeleteCate
                /> */}
                <div className="d-flex justify-content-between mb-2">
                    <h2 className="mb-2"> List Categories:</h2>
                    <div>
                        <Link to='/admin/category'><button className="btn btn-primary">Back to category </button></Link>
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
                            {categoryTrash &&
                                categoryTrash.length > 0 &&
                                categoryTrash.map((item, index, category) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>

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
export default TrashCategory