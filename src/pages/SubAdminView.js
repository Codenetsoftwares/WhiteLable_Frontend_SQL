import React, { useState, useEffect } from "react";
import Pagination from "../components/common/Pagination";
import { Link } from "react-router-dom";
import { useAppContext } from "../contextApi/context";
import { getAllSubAdminCreate } from "../Utils/service/apiService";
import { permissionObj } from "../Utils/constant/permission";
import { getAllSubAdminCreateState } from "../Utils/service/initiateState";



const SubAdminView = () => {
    const [subAdminData, setSubAdminData] = useState(getAllSubAdminCreateState())

    const { store, dispatch } = useAppContext()

    const handleChange = (name, value) => {
        setSubAdminData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    useEffect(() => {
        if (store?.admin) {
            permissionObj.allAdmin.includes(store?.admin?.roles[0].role) &&
                getAll_SubAdmin_Create()
        }
    }, [store?.admin, subAdminData.currentPage, subAdminData.name, subAdminData.totalEntries]);

    async function getAll_SubAdmin_Create() {

        const response = await getAllSubAdminCreate({
            _id: store?.admin?.id,
            pageNumber: subAdminData.currentPage,
            dataLimit: subAdminData.totalEntries,
            name: subAdminData.name
        });

        if (response) {
            setSubAdminData({
                ...subAdminData, userList: response.data, totalPages: response.pagination.totalPages, totalData: response.pagination.totalRecords
            })
        }
    }

    const handlePageChange = (page) => {
        console.log("Changing to page:", page);
        handleChange("currentPage", page);
    };

    let startIndex = Math.min((Number(subAdminData.currentPage) - 1) * Number(subAdminData.totalEntries) + 1);
    console.log("startIndex", subAdminData.currentPage)
    let endIndex = Math.min(Number(subAdminData.currentPage) * Number(subAdminData.totalEntries), Number(subAdminData.totalData));


    return (
        <div className="main_content_iner ">
            <div className="container-fluid p-0">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="white_card card_height_100 mb_30">
                            <div className="white_card_header">
                                <div className="box_header m-0">
                                    <div className="main-title">
                                        <h3 className="m-0" >List of User Roles</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="white_card_body">
                                <div className="QA_section">
                                    <div className="white_box_tittle list_header">
                                        <div className="col-2 text-center">
                                            <select
                                                className="form-select form-select-sm"
                                                aria-label=".form-select-sm example"
                                                onChange={(e) => handleChange("totalEntries", e.target.value)}
                                            >
                                                <option selected value="5">
                                                    Show 5 entries
                                                </option>
                                                <option value="10">10 entries</option>
                                                <option value="15">15 entries</option>
                                                <option value="25">25 entries</option>
                                                <option value="50">50 entries</option>
                                                <option value="75">75 entries</option>
                                            </select>
                                        </div>

                                        <div
                                            className="serach_field_2 ms-auto"
                                            style={{ marginLeft: "-10px" }}
                                        >
                                            <div className="search_inner">
                                                <form Active="#">
                                                    <div className="search_field">
                                                        <input
                                                            value={subAdminData.name}
                                                            onChange={(e) => {
                                                                handleChange("name", e.target.value);
                                                            }}
                                                            type="text"
                                                            placeholder="Search content here..."
                                                        />
                                                    </div>
                                                    <button type="submit">
                                                        {" "}
                                                        <i className="ti-search"></i>{" "}
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="QA_table mb_30" style={{ overflow: "auto" }}>
                                        {/* table-responsive */}
                                        <table className="table lms_table_active3 " >
                                            <thead style={{
                                                height: "10px",
                                                backgroundColor: "#006699",
                                                color: "white",
                                                fontWeight: "bold",
                                            }}>
                                                <tr>
                                                    <th scope="col" style={{ fontWeight: "bold", color: "white" }}>Serial Number</th>
                                                    <th scope="col" style={{ fontWeight: "bold", color: "white" }}>Name</th>
                                                    <th scope="col" style={{ fontWeight: "bold", color: "white" }}>Detail</th>
                                                    <th scope="col" style={{ fontWeight: "bold", color: "white" }}>Status</th>
                                                    <th scope="col" style={{ fontWeight: "bold", color: "white" }}>Change Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subAdminData?.userList &&
                                                    subAdminData?.userList?.map((user, index) => (
                                                        <tr key={user._id}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{user.userName}</td>

                                                            <td>
                                                                <Link to={`/ViewSubAdminPermission/${user.adminId}`}>
                                                                    <button className="btn btn-sm btn-success">
                                                                        Go To
                                                                    </button>
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="border border-1 w-75 text-center bg-success rounded-pill "
                                                                    style={{ cursor: "auto" }}
                                                                >
                                                                    {user.status}
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <span className="mx-1">
                                                                    <button
                                                                        className={`btn border border-2 rounded ${store?.admin?.roles[0].permission.some(
                                                                            (role) => role === "Status"
                                                                        )
                                                                            ? ""
                                                                            : [
                                                                                "superAdmin",
                                                                                "WhiteLabel",
                                                                                "HyperAgent",
                                                                                "SuperAgent",
                                                                                "MasterAgent",
                                                                            ].includes(store?.admin?.roles[0].role)
                                                                                ? ""
                                                                                : "disabled"
                                                                            }`}
                                                                        title="Setting"
                                                                        type="button"
                                                                        onClick={() => {
                                                                            // handleprops(user);
                                                                        }}
                                                                    >
                                                                        <i className="fa-thin fas fa-gear"></i>
                                                                    </button>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Pagination
                    currentPage={subAdminData.currentPage}
                    totalPages={subAdminData.totalPages}
                    handlePageChange={handlePageChange}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    totalData={subAdminData.totalData}
                />

                {/* Modal */}

                {/*                */}
            </div>
        </div>
    );
};

export default SubAdminView;
