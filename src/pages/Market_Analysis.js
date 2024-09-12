import React, { useEffect, useState } from 'react';
import { get_liveGames } from '../Utils/service/initiateState';
import { getLiveGames } from '../Utils/service/apiService';
import { toast } from 'react-toastify';
import { customErrorHandler } from '../Utils/helper';
import { useAppContext } from '../contextApi/context';
import { permissionObj } from '../Utils/constant/permission';
import SingleCard from '../components/common/singleCard';

const Market_Analysis = () => {
    const { dispatch, store } = useAppContext();
    const [liveGmes, setLiveGmes] = useState(get_liveGames())
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState("Select User");

    const options = [
        "User 1",
        "User 2",
        "User 3",
        "User 4",
        "User 5",
        "User 6",
        "User 7",
        "User 8",
        "User 9",
        "User 10"
    ];

    const handleSelect = (option) => {
        setSelectedUser(option);
        setIsOpen(false); // Close the dropdown after selection
    };


    const handleClearSearch = () => {
    };


    async function getView_LiveGames() {
        try {
            const response = await getLiveGames({
                // pageNumber: state.currentPage,
                // dataLimit: state.totalEntries,
            });
            console.log("======>>>>>> response", response.data);

            setLiveGmes((prevState) => ({
                ...prevState,
                data: response?.data,
                totalPages: response?.pagination?.totalPages,
                totalData: response?.pagination?.totalItems,
            }));
        } catch (error) {
            toast.error(customErrorHandler(error))
        }
    }

    console.log("======>>>>>> response", liveGmes);


    useEffect(() => {
        if (store?.admin) {
            if (
                permissionObj.allAdmin.includes(store?.admin?.roles[0].role) ||
                permissionObj.allSubAdmin.includes(store?.admin?.roles[0].role)
            ) {
                getView_LiveGames();
            }
        }
    }, []);

    return (
        <div className="container my-5">
            <div className="card shadow-sm">
                <div
                    className="card-header"
                    style={{
                        backgroundColor: "#7D7D7D",
                        color: "#FFFFFF",
                    }}
                >
                    <h3 className="mb-0 fw-bold fs-5">Live Bet Game</h3>
                </div>
                <div className="card-body">
                    {/* Search and Entries Selection */}
                    <div className="row mb-4">
                        {/* <div className="col-md-6 position-relative">
                            <FaSearch
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "20px",
                                    transform: "translateY(-50%)",
                                    color: "#6c757d",
                                    fontSize: "18px",
                                }}
                            />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by game name or market name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    paddingLeft: "40px",
                                    borderRadius: "30px",
                                    border: "2px solid #6c757d",
                                }}
                            />
                            {searchTerm && (
                                <FaTimes
                                    onClick={handleClearSearch}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        right: "20px",
                                        transform: "translateY(-50%)",
                                        color: "#6c757d",
                                        cursor: "pointer",
                                    }}
                                />
                            )}
                        </div> */}

                        {/* <div className="col-md-6 text-end">
                            <label className="me-2 fw-bold">Show</label>
                            <select
                                className="form-select rounded-pill d-inline-block w-auto"
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                style={{
                                    borderRadius: "50px",
                                    border: "2px solid #6c757d",
                                }}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                            </select>
                            <label className="ms-2 fw-bold">entries</label>
                        </div> */}
                    </div>

                    {/* Table */}
                    <SingleCard
                        className=" mb-5 "
                        style={{
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 1)",
                        }}
                    >
                        <div className="table-responsive">
                            <table
                                className="table table-hover rounded-table"
                                style={{
                                    border: "2px solid #6c757d",
                                    borderRadius: "10px",
                                }}
                            >
                                <thead
                                    className="table-primary"
                                    style={{
                                        position: "sticky",
                                        top: 0,
                                        zIndex: 1,
                                    }}
                                >
                                    <tr>
                                        <th>Serial Number</th>
                                        <th>Game Name</th>
                                        <th>Market Name</th>
                                        <th>User List</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {liveGmes.data.length > 0 ? (
                                        <>
                                            {liveGmes.data.map((data, i) => {
                                                return (
                                                    <tr key={data.marketId}>
                                                        <td >
                                                            {i + 1}
                                                        </td>
                                                        <td >
                                                            {data.gameName}
                                                        </td>
                                                        <td >
                                                            {data.marketName}
                                                        </td>
                                                        <td>
                                                            <div className="custom-dropdown" style={{ position: 'relative', width: '200px' }}>
                                                                {/* Dropdown toggle */}
                                                                <div
                                                                    className="dropdown-header"
                                                                    onClick={() => setIsOpen(!isOpen)}
                                                                    style={{
                                                                        padding: '10px',
                                                                        border: '1px solid #6c757d',
                                                                        borderRadius: '5px',
                                                                        backgroundColor: '#f8f9fa',
                                                                        cursor: 'pointer'
                                                                    }}
                                                                >
                                                                    {selectedUser}
                                                                </div>

                                                                {/* Dropdown list */}
                                                                {isOpen && (
                                                                    <ul
                                                                        className="dropdown-list"
                                                                        style={{
                                                                            position: 'absolute',
                                                                            top: '100%',
                                                                            left: 0,
                                                                            width: '100%',
                                                                            maxHeight: '150px',
                                                                            overflowY: 'auto',
                                                                            border: '1px solid #6c757d',
                                                                            borderRadius: '5px',
                                                                            backgroundColor: '#fff',
                                                                            zIndex: 1000,
                                                                            listStyle: 'none',
                                                                            padding: '0',
                                                                            margin: '0',
                                                                        }}
                                                                    >
                                                                        {options.map((option, index) => (
                                                                            <li
                                                                                key={index}
                                                                                onClick={() => handleSelect(option)}
                                                                                style={{
                                                                                    padding: '10px',
                                                                                    borderBottom: '1px solid #ddd',
                                                                                    cursor: 'pointer',
                                                                                }}
                                                                                onMouseOver={(e) => e.target.style.backgroundColor = '#f1f1f1'}
                                                                                onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
                                                                            >
                                                                                {option}
                                                                            </li>
                                                                        ))}
                                                                      
                                                                    </ul>
                                                                )}
                                                            </div>

                                                        </td>
                                                        <td>
                                                            <button type="button" class="btn btn-outline-info">Go To Bet Market</button>
                                                        </td>

                                                    </tr>
                                                )
                                            })}
                                        </>
                                    ) : (<tr>
                                        <td colSpan="4" className="text-center">
                                            No inactive games found.
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </SingleCard>

                    {/* Pagination */}
                    {/* <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        totalData={totalData}
                    /> */}
                </div>
            </div>
        </div>
    )
}

export default Market_Analysis;