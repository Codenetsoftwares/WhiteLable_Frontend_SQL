import React, { useState, useEffect } from "react";
import { getAllCreateState } from "../Utils/service/initiateState";
import { permissionObj } from "../Utils/constant/permission";
import { getAllCreate, viewBalance } from '../Utils/service/apiService'
import { useAppContext } from "../contextApi/context";




const Wallet = () => {
    const { dispatch, store } = useAppContext();
    const [balance, setBalance] = useState(0);
    const [walletCard, setWalletCard] = useState(getAllCreateState)


    useEffect(() => {
        if (store?.admin) {
            {
                permissionObj.allAdmin.includes(store?.admin?.roles[0].role) &&
                    getAll_Create()
            }
            {
                permissionObj.allSubAdmin.includes(store?.admin?.roles[0].role) &&
                    getAll_Create()
            }
        }
    }, [store?.admin, currentPage, totalEntries, name]);

    useEffect(() => {
        if (store?.admin) {
            {
                permissionObj.allAdmin.includes(store?.admin?.roles[0].role) &&
                    view_Balance()
            }
            {
                permissionObj.allSubAdmin.includes(store?.admin?.roles[0].role) &&
                    view_Balance()
            }
        }
    }, []);

    async function getAll_Create() {

        const response = await getAllCreate({
            _id: store?.admin?.id,
            pageNumber: walletCard.currentPage,
            dataLimit: walletCard.totalEntries,
            name: walletCard.name
        });

        if (response) {
            console.log(response)
            setWalletCard({ userList: [], currentPage: 1, totalPages: "", totalEntries: 5, name: "", totalEntries: 0 })
        }
    }


    async function view_Balance() {
        const response = await viewBalance({
            _id: store?.admin?.id,
            pageNumber: walletCard.currentPage,
            dataLimit: walletCard.totalEntries,
            name: walletCard.name
        });

        if (response) {
            setWalletCard({ userList: [], currentPage: 1, totalPages: "", totalEntries: 5, name: "", totalEntries: 0 })
        }
    }


    let startIndex = Math.min((currentPage - 1) * totalEntries + 1);
    let endIndex = Math.min(currentPage * totalEntries, totalData);

    const handlePageChange = (page) => {
        console.log("Changing to page:", page);

        setCurrentPage(page);
        setIsLoading(false);
    };
    console.log("option meanu", totalEntries);

    return (
        <div  >
            <div className="row ">
                <h2 className="text-center font-weight-bold mb-4" style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '4px' }}>USER LIST</h2>
            </div>
            <div className="text-center mt-10">
                <p style={{ fontWeight: 'bold' }}>Total Balance</p>
                <h4 className="mb-1">₹{balance}</h4>
                {auth.user.roles &&
                    store?.admin?.roles.length > 0 &&
                    store?.admin?.roles[0].role === "superAdmin" && (
                        <button
                            data-bs-toggle="modal"
                            data-bs-target="#depositBalance"
                            className="btn btn-danger"
                            aria-label="Close"
                        >
                            ADD CASH
                        </button>
                    )}
            </div>
            <div className="white_card_body m-3">
                <div className="QA_section">
                    <div className="white_box_tittle list_header">
                        <div className="col-2 text-center">
                            <select
                                className="form-select form-select-sm"
                                aria-label=".form-select-sm example"
                                onChange={(e) => setTotalEntries(e.target.value)}
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
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
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
                        {/* {isLoading ? (
                            userList.length > 0 ? (
                                <>
                                    <table className="table lms_table_active3 table-bordered table-sm">
                                        <thead
                                            style={{
                                                height: "10px",
                                                backgroundColor: "#006699",
                                                color: "white",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="text-bolder fs-6 "
                                                    style={{ fontWeight: "bold", color: "white" }}
                                                >
                                                    Username
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-bolder fs-6 text-center"
                                                    style={{ fontWeight: "bold", color: "white" }}
                                                >
                                                    Credit Ref.
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-bolder fs-6 text-center"
                                                    style={{ fontWeight: "bold", color: "white" }}
                                                >
                                                    Partnership
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-bolder fs-6 text-center"
                                                    style={{ fontWeight: "bold", color: "white" }}
                                                >
                                                    Balance
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-bolder fs-6 text-center"
                                                    style={{ fontWeight: "bold", color: "white" }}
                                                >
                                                    Exposure
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-bolder fs-6 text-center"
                                                    style={{ fontWeight: "bold", color: "white" }}
                                                >
                                                    Avail. Bal.
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-bolder fs-6 text-center"
                                                    style={{ fontWeight: "bold", color: "white" }}
                                                >
                                                    Ref. P/L
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-bolder fs-6 text-center"
                                                    style={{ fontWeight: "bold", color: "white" }}
                                                >
                                                    Status
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-bolder fs-6 text-center"
                                                    style={{ fontWeight: "bold", color: "white" }}
                                                >
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        {userList.map((data, i) => {
                                            const creditRefLength = data.creditRef.length;
                                            const partnershipLength = data.partnership.length;
                                            return (
                                                <Card
                                                    userName={data.userName}
                                                    role={data.roles[0].role}
                                                    key={data.id}
                                                    creditRef={data.creditRef[creditRefLength - 1]?.value}
                                                    balance={data.balance}
                                                    loadBalance={data.loadBalance}
                                                    refProfitLoss={data.refProfitLoss}
                                                    userId={data.id}
                                                    partnership={
                                                        data.partnership[partnershipLength - 1]?.value
                                                    }
                                                    Status={data.Status}
                                                    creditRefLength={creditRefLength}
                                                    partnershipLength={partnershipLength}
                                                />
                                            );
                                        })}
                                    </table>
                                    <div>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            handlePageChange={handlePageChange}
                                            startIndex={startIndex}
                                            endIndex={endIndex}
                                            totalData={totalData}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="alert text-dark bg-light" role="alert">
                                    <div className="alert-text d-flex justify-content-center">
                                        <b> &#128680; No Data Found !! </b>
                                    </div>
                                </div>
                            )
                        ) : (
                            <></>
                        )} */}
                        {userList.length > 0 ? (
                            <>
                                <table className="table lms_table_active3 table-bordered table-sm">
                                    <thead
                                        style={{
                                            height: "10px",
                                            backgroundColor: "#006699",
                                            color: "white",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-bolder fs-6 "
                                                style={{ fontWeight: "bold", color: "white" }}
                                            >
                                                Username
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-bolder fs-6 text-center"
                                                style={{ fontWeight: "bold", color: "white" }}
                                            >
                                                Credit Ref.
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-bolder fs-6 text-center"
                                                style={{ fontWeight: "bold", color: "white" }}
                                            >
                                                Partnership
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-bolder fs-6 text-center"
                                                style={{ fontWeight: "bold", color: "white" }}
                                            >
                                                Balance
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-bolder fs-6 text-center"
                                                style={{ fontWeight: "bold", color: "white" }}
                                            >
                                                Exposure
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-bolder fs-6 text-center"
                                                style={{ fontWeight: "bold", color: "white" }}
                                            >
                                                Avail. Bal.
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-bolder fs-6 text-center"
                                                style={{ fontWeight: "bold", color: "white" }}
                                            >
                                                Ref. P/L
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-bolder fs-6 text-center"
                                                style={{ fontWeight: "bold", color: "white" }}
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-bolder fs-6 text-center"
                                                style={{ fontWeight: "bold", color: "white" }}
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    {userList.map((data, i) => {
                                        const creditRefLength = data.creditRef.length;
                                        const partnershipLength = data.partnership.length;
                                        return (
                                            <Card
                                                userName={data.userName}
                                                role={data.roles[0].role}
                                                key={data.id}
                                                creditRef={data.creditRef[creditRefLength - 1]?.value}
                                                balance={data.balance}
                                                loadBalance={data.loadBalance}
                                                refProfitLoss={data.refProfitLoss}
                                                userId={data.id}
                                                partnership={
                                                    data.partnership[partnershipLength - 1]?.value
                                                }
                                                Status={data.Status}
                                                creditRefLength={creditRefLength}
                                                partnershipLength={partnershipLength}
                                            />
                                        );
                                    })}
                                </table>
                                {/* <div>
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            handlePageChange={handlePageChange}
                                            startIndex={startIndex}
                                            endIndex={endIndex}
                                            totalData={totalData}
                                        />
                                    </div> */}
                            </>
                        ) : (
                            <div className="alert text-dark bg-light" role="alert">
                                <div className="alert-text d-flex justify-content-center">
                                    <b> &#128680; No Data Found !! </b>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Wallet;