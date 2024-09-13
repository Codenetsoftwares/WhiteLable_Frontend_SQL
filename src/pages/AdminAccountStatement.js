import React, { useEffect, useState } from "react";
import { useAppContext } from "../contextApi/context";
import { getAccountStatement_api } from "../Utils/service/apiService";
import { permissionObj } from "../Utils/constant/permission";
import Pagination from "../components/common/Pagination";
import { adminAccountStatementInitialState } from "../Utils/service/initiateState";
import DatePicker from "react-datepicker";

const AdminAccountStatement = () => {
  const { dispatch, store } = useAppContext();
  console.log("========>>> _id", store);

  const [state, setState] = useState(adminAccountStatementInitialState());

  const setStartDate = (date) => {
    setState((prevState) => ({ ...prevState, startDate: date }));
  };

  const setEndDate = (date) => {
    setState((prevState) => ({ ...prevState, endDate: date }));
  };

  const formatDate = (dateString) => {
    // Parse the date string to create a Date object
    const date = new Date(dateString);

    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");

    // Format the date as "YYYY-MM-DD"
    return `${year}-${month}-${day}`;
  };

  console.log("=====>>> stored data", state);
  async function AccountStatement() {
    const response = await getAccountStatement_api({
      _id: store?.admin?.id,
      pageNumber: state.currentPage,
      dataLimit: state.totalEntries,
      fromDate: formatDate(state.startDate),
      toDate: formatDate(state.endDate),
    });
    // console.log("======>>>>>> response", response.pagination);

    setState((prevState) => ({
      ...prevState,
      statement: response.data,
      totalPages: response?.pagination?.totalPages,
      totalData: response?.pagination?.totalItems,
    }));
  }

  function handlePageChange(page) {
    console.log("========>>>> page change", page);

    setState((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
  }

  useEffect(() => {
    if (store?.admin) {
      if (
        permissionObj.allAdmin.includes(store?.admin?.roles[0].role) ||
        permissionObj.allSubAdmin.includes(store?.admin?.roles[0].role)
      ) {
        AccountStatement();
      }
    }
  }, [store?.admin, state.currentPage, state.totalEntries]);

  // function formatDate(dateString) {
  //   const options = {
  //     year: "numeric",
  //     month: "numeric",
  //     day: "numeric",
  //     hour: "numeric",
  //     minute: "numeric",
  //     second: "numeric",
  //   };
  //   return new Date(dateString).toLocaleDateString("en-US", options);
  // }

  const startIndex = Math.min((state.currentPage - 1) * state.totalEntries + 1);
  const endIndex = Math.min(
    state.currentPage * state.totalEntries,
    state.totalData
  );

  return (
    <div className="d-flex justify-content-center m-5">
      {/* card */}
      <div className="card w-100 rounded">
        <div
          className="card-heade text-white p-1"
          style={{ backgroundColor: "#26416e" }}
        >
          <b>&nbsp;&nbsp;Account Statement</b>
        </div>

        <div className="form-group mb-3 mb-md-0 px-2">
          <div class="container">
            <div class="row">
              <div class="col-sm">Total Entries</div>
              <div class="col-sm">Data Source</div>
              <div class="col-sm">From : </div>
              <div class="col-sm">To : </div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <select
                  className="form-select form-select-sm w-50 m-1"
                  aria-label=".form-select-sm example"
                  onChange={(e) =>
                    setState((prevState) => ({
                      ...prevState,
                      totalEntries: e.target.value,
                      currentPage: 1,
                    }))
                  }
                >
                  <option selected value="10">
                    10 entries
                  </option>
                  <option value="25">25 entries</option>
                  <option value="50">50 entries</option>
                  <option value="75">75 entries</option>
                  <option value="100">100 entries</option>
                </select>
              </div>
              <div class="col-sm">
                {" "}
                <select
                  class="form-select form-select-sm w-50 m-1"
                  aria-label="Default select example"
                >
                  <option selected>Select</option>
                  <option value="settle">LIVE DATA</option>
                  <option value="unsettle">BACKUP DATA</option>
                  <option value="void">OLD DATA</option>
                </select>
              </div>
              <div class="col-sm">
                <DatePicker
                  selected={state.startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <div class="col-sm">
                {" "}
                <DatePicker
                  selected={state.endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </div>
            </div>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="white_card_body">
              {/* Table */}
              <div className="QA_section">
                <div className="QA_table mb_30">
                  <table className="table lms_table_active3">
                    <thead>
                      <tr
                        style={{ backgroundColor: "#e6e9ed", color: "#5562a3" }}
                      >
                        <th scope="col">
                          <b>Date/Time</b>
                        </th>
                        <th scope="col">
                          <b>Deposit</b>
                        </th>
                        <th scope="col">
                          <b>Withdraw</b>
                        </th>
                        <th scope="col">
                          <b>Balance</b>
                        </th>
                        <th scope="col">
                          <b>Remark</b>
                        </th>
                        <th scope="col">
                          <b>From &rarr; To</b>
                        </th>
                      </tr>
                    </thead>
                    {state?.statement?.map((transaction) => (
                      <tr key={transaction._id}>
                        <th scope="row">
                          <a href="#" className="question_content">
                            {formatDate(transaction.date)}
                          </a>
                        </th>
                        <td>
                          {transaction.transactionType === "credit" ||
                          transaction.transactionType === "deposit" ? (
                            <span>{transaction.amount}</span>
                          ) : null}
                        </td>
                        <td>
                          {transaction.transactionType === "withdrawal" && (
                            <span className="text-danger">
                              {transaction.amount}
                            </span>
                          )}
                        </td>
                        <td>{transaction.balance}</td>
                        <td>{transaction.remarks}</td>
                        <td>
                          {transaction.hasOwnProperty(
                            "transferFromUserAccount"
                          ) &&
                          transaction.hasOwnProperty(
                            "transferToUserAccount"
                          ) ? (
                            <>
                              {transaction.transferFromUserAccount} &rarr;{" "}
                              {transaction.transferToUserAccount}
                            </>
                          ) : (
                            "Self-Transaction"
                          )}
                        </td>
                      </tr>
                    ))}
                  </table>
                  {state.statement.length === 0 && (
                    <div className="alert text-dark bg-light mt-3" role="alert">
                      <div className="alert-text d-flex justify-content-center">
                        <b> &#128680; No Data Found !! </b>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* End of No Data Found */}
            </div>
          </li>
          {state.statement.length !== 0 && (
            <li className="list-group-item">
              {/* Pagination */}
              <Pagination
                currentPage={state.currentPage}
                totalPages={state.totalPages}
                handlePageChange={handlePageChange}
                startIndex={startIndex}
                endIndex={endIndex}
                totalData={state.totalData}
              />
              {/* Pagination */}
            </li>
          )}
        </ul>
      </div>
      {/* card */}
    </div>
  );
};

export default AdminAccountStatement;
