import React, { useState, useEffect } from "react";
import Card from "./Card";
import { useAppContext } from "../../contextApi/context";
import {
  viewBalance_api,
  viewCreatedUser_api,
} from "../../Utils/service/apiService";
import { viewCreatedUser } from "../../Utils/service/initiateState";

const MainTransaction = () => {
  const { store, dispatch } = useAppContext();
  console.log("========>>>>>> id", store.admin.id);

  const [state, setState] = useState({ viewCreatedUser });
  console.log("======>>> console", state);

  async function createViewUserList() {
    const response = await viewCreatedUser_api({
      id: store.admin.id,
    });

    if (response) {
      console.log("=====>>> response for created user data", response);
      setState(response.data);
    } else {
    }
  }

  useEffect(() => {
    createViewUserList();
  }, []);

  async function viewWallet() {
    const response = await viewBalance_api({
      id: store.admin.id,
    });

    if (response) {
      console.log("========>>> response for wallet ", response);
    } else {
    }
  }
  useEffect(() => {
    viewWallet();
  }, []);

  const balance = 5000;

  const currentPage = 1;
  const totalEntries = 6;
  // const totalData = userList.length;
  // const totalPages = Math.ceil(totalData / totalEntries);

  const handlePageChange = (page) => {
    console.log("Changing to page:", page);
  };

  const startIndex = (currentPage - 1) * totalEntries + 1;
  // const endIndex = Math.min(currentPage * totalEntries, totalData);

  return (
    <div>
      <div className="row">
        <h2 className="text-center font-weight-bold mb-4">USER LIST</h2>
      </div>
      <div className="text-center mt-10">
        <p style={{ fontWeight: "bold" }}>Total Balance</p>
        <h4 className="mb-1">₹{balance}</h4>
        <button
          data-bs-toggle="modal"
          data-bs-target="#depositBalance"
          className="btn btn-danger"
          aria-label="Close"
        >
          ADD CASH
        </button>
      </div>
      <div className="white_card_body m-3">
        <div className="QA_section">
          <div className="white_box_tittle list_header">
            <div className="col-2 text-center">
              <select
                className="form-select form-select-sm"
                aria-label=".form-select-sm example"
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
                <form>
                  <div className="search_field">
                    <input type="text" placeholder="Search content here..." />
                  </div>
                  <button type="submit">
                    <i className="ti-search"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="QA_table mb_30" style={{ overflow: "auto" }}>
            {state.length > 0 ? (
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
                        className="text-bolder fs-6"
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
                  {state.map((data) => {
                    const creditRefLength = data.creditRefs.length;
                    const partnershipLength = data.partnerships.length;
                    return (
                      <Card
                        userName={data.userName}
                        role={data.roles[0].role}
                        key={data.adminId}
                        creditRef={data.creditRefs[creditRefLength - 1]?.value}
                        balance={data.balance}
                        loadBalance={data.loadBalance}
                        refProfitLoss={0} // Assuming 0 since it's not in the data
                        userId={data.adminId}
                        partnership={
                          data.partnerships[partnershipLength - 1]?.value
                        }
                        Status={data.status}
                        creditRefLength={creditRefLength}
                        partnershipLength={partnershipLength}
                      />
                    );
                  })}
                </table>
                <div>
                  {/* <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    totalData={totalData}
                  /> */}
                </div>
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
      {/* <DepositBalance /> */}
    </div>
  );
};

export default MainTransaction;
