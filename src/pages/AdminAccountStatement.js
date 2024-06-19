import React, { useEffect, useState } from "react";
import { useAppContext } from "../contextApi/context";
import { getAccountStatement_api } from "../Utils/service/apiService";
import { permissionObj } from "../Utils/constant/permission";
import Pagination from "../components/common/Pagination";
import { adminAccountStatementInitialState } from "../Utils/service/initiateState";

const AdminAccountStatement = () => {
  const { dispatch, store } = useAppContext();
  console.log("========>>> _id", store);

  const [state, setState] = useState(adminAccountStatementInitialState());

  async function AccountStatement() {
    const response = await getAccountStatement_api({
      _id: store?.admin?.id,
      pageNumber: state.currentPage,
      dataLimit: state.totalEntries,
    });
    console.log("======>>>>>> response", response.pagination);

    setState((prevState) => ({
      ...prevState,
      statement: response.data,
      totalPages: response.pagination.totalPages,
      totalData: response.pagination.totalItems,
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

  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

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
                          <b>Remark</b>
                        </th>
                        <th scope="col">
                          <b>From//To</b>
                        </th>
                      </tr>
                    </thead>
                    {state.statement.map((transaction) => (
                      <tr key={transaction._id}>
                        <th scope="row">
                          <a href="#" className="question_content">
                            {formatDate(transaction.date)}
                          </a>
                        </th>
                        {transaction.transactionType === "debit" ? (
                          <>
                            <td></td>
                            <td className="text-danger">
                              {transaction.amount}
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{transaction.amount}</td>
                            <td></td>
                          </>
                        )}
                        <td></td>
                        <td> {transaction.hasOwnProperty('transferFromUserAccount') && transaction.hasOwnProperty('transferToUserAccount')
        ? `${transaction.transferFromUserAccount} / ${transaction.transferToUserAccount}`
        : 'Self-Transaction'}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
              {/* End of No Data Found */}
            </div>
          </li>
          <li className="list-group-item">
            <select
              className="form-select form-select-sm w-25"
              aria-label=".form-select-sm example"
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  totalEntries: e.target.value,
                }))
              }
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
        </ul>
      </div>
      {/* card */}
    </div>
  );
};

export default AdminAccountStatement;
