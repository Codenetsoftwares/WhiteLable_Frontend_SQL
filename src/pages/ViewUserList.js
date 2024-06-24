import React, { useEffect, useState } from "react";
import Pagination from "../components/common/Pagination";
import { getViewUserList } from "../Utils/service/initiateState";
import { getUserList } from "../Utils/service/apiService";
import { useAppContext } from "../contextApi/context";


const ViewUserList = () => {
    const { dispatch, store } = useAppContext();
    const [view, setview] = useState(getViewUserList)
    // const [user, setUser] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(0);
    // const [totalEntries, setTotalEntries] = useState(5);
    // const [totalData, setTotalData] = useState(0);
    // const [search, setSearch] = useState("");
    // const [data, setData] = useState([]);
    // const [toggleCase, setToggleCase] = useState("");
    // const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);

    // const [showUpdateUserModal, setShowUpdateUserModal] = useState(false); // modal for user edit
    // const [selectedUser, setSelectedUser] = useState({});
    // const [userId, setUserId] = useState('');


    const handleChange = (name, value) => {
        setview((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    async function handleViewUserList() {
        const response = await getUserList();
        if (response) {
            setview({
                ...view,
                userList: response.data,
                totalPages: response.pagination.totalPages,
                totalData: response.pagination.totalRecords,
            });
        }
    }

    useEffect(() => {
        if (store?.admin) {
            handleViewUserList()
        }

    }, [store?.admin, view.currentPage, view.name, view.totalEntries]);


    let startIndex = Math.min((Number(view.currentPage) - 1) * Number(view.totalEntries) + 1);
    console.log('startIndex', view.currentPage);
    let endIndex = Math.min(
        Number(view.currentPage) * Number(view.totalEntries),
        Number(view.totalData),
    );

    const handlePageChange = (page) => {
        handleChange('currentPage', page);
    };

    return (
        <div class="container-fluid">
            <div class="main_content_iner overly_inner ">
                <div class="container-fluid p-0 ">
                    <div class="row">
                        <div class="col-12">
                            <div class="page_title_box d-flex flex-wrap align-items-center justify-content-between">
                                <div class="page_title_left d-flex align-items-center">
                                    <h3 className="f_s_30 f_w_700 dark_text">User List</h3>
                                </div>
                                <div class="page_title_right">
                                    <div class="page_date_button d-flex align-items-center">
                                        <img src="img/icon/calender_icon.svg" alt="" />
                                        {Date()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="white_card card_height_100 mb_30 pt-4">
                                <div class="white_card_body">
                                    <div class="QA_section">
                                        <div class="white_box_tittle list_header">
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

                                            <div class="box_right d-flex lms_block">
                                                <div class="serach_field_2">
                                                    <div class="search_inner">
                                                        <form Active="#">
                                                            <div class="search_field">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search content here..."
                                                                    value={view.search}
                                                                    onChange={(e) => {
                                                                        handleChange("search", e.target.value);
                                                                    }}
                                                                />
                                                            </div>
                                                            <button type="submit">
                                                                {" "}
                                                                <i class="ti-search"></i>{" "}
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div class="add_button ms-2">
                                                    <a
                                                        href="#"
                                                        data-toggle="modal"
                                                        data-target="#addcategory"
                                                        class="btn_1"
                                                    >
                                                        search
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="QA_table mb_30">
                                            <table class="table lms_table_active">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Full Name</th>
                                                        <th scope="col">Username</th>
                                                        <th scope="col">Phone Number</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                {view.userList.map((user, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {user.firstName} {user.lastName}
                                                        </td>
                                                        <td>{user.userName}</td>
                                                        <td>{user.phoneNumber}</td>
                                                        <td>
                                                            <div className="action_btns d-flex">
                                                                <a
                                                                    // href="#"
                                                                    className="action_btn "
                                                                    title="Edit User"

                                                                >
                                                                    <i className="far fa-edit"></i>
                                                                </a>
                                                                <a href="#" className="action_btn">
                                                                    <i className="fas fa-trash"></i>
                                                                </a>
                                                                <a
                                                                    href="#"
                                                                    className="action_btn"
                                                                    title="Add Balance"

                                                                >
                                                                    <i className="fas fa-plus"></i>
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Pagination
                                        currentPage={view.currentPage}
                                        totalPages={view.totalPages}
                                        handlePageChange={handlePageChange}
                                        startIndex={startIndex}
                                        endIndex={endIndex}
                                        totalData={view.totalData}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewUserList;
