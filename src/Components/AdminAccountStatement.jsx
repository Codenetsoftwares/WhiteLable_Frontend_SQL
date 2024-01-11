import React, { useState, useEffect } from "react";
import { useAuth } from "../Utils/Auth";
import TransactionServices from "../Services/TransactionServices";
import Pagination from "./Pagination";

const AdminAccountStatement = () => {
  const [statementView, setstatementView] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [totalEntries, setTotalEntries] = useState(5);
  const [totalData, setTotalData] = useState(0);

  const auth = useAuth();
  const page = 1;
  console.log("Auth from AdminAccountStatement  =>>>>> ", auth);

  useEffect(() => {
    TransactionServices.GetAdminAccStatement(
      auth.user.id,
      auth.user,
      currentPage,
      totalEntries
    )
      .then((res) => {
        console.log("ress", res.data);
        setstatementView(res.data.data);
        setTotalPages(res.data.totalPages);
        setTotalData(res.data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth.user.id, auth.user, page]);

  console.log("Statement from AdminAccountStatement  =>>>>>", statementView);
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }

  let startIndex = Math.min((currentPage - 1) * totalEntries + 1);
  let endIndex = Math.min(currentPage * totalEntries, totalData);

  const handlePageChange = (page) => {
    console.log("Changing to page:", page);

    setCurrentPage(page);
  };
  console.log("option meanu", totalEntries);

  return (
    <div className="d-flex justify-content-center m-5">
      {/* card */}
      <div class="card w-100 rounded">
        <div
          class="card-heade text-white p-1"
          style={{ backgroundColor: "#26416e" }}
        >
          <b>&nbsp;&nbsp;Account Statement</b>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <div class="white_card_body">
              {/* Table */}
              <div class="QA_section">
                <div class="QA_table mb_30">
                  <table class="table lms_table_active3 ">
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "#e6e9ed",
                          color: "#5562a3",
                        }}
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
                        {/* <th scope="col">
                          <b>Balance</b>
                        </th> */}
                        <th scope="col">
                          <b>Remark</b>
                        </th>
                        <th scope="col">
                          <b>From//To</b>
                        </th>
                      </tr>
                    </thead>

                    {statementView.map((transaction) => (
                      <tr key={transaction._id}>
                        <th scope="row">
                          <a href="#" className="question_content">
                            {formatDate(transaction.date)}
                          </a>
                        </th>
                        {transaction.transactionType === "Withdrawal" ? (
                          <>
                            <td></td>
                            <td className="text-danger">
                              {transaction.withdraw}
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{transaction.amount}</td>
                            <td></td>
                          </>
                        )}

                        {/* <td>
                          {transaction.transactionType === "Debit"
                            ? transaction.debitBalance
                            : transaction.balance}
                        </td> */}
                        <td>{transaction.remarks}</td>
                        <td>{`${transaction.From} / ${transaction.To}`}</td>
                      </tr>
                    ))}
                  </table>
                </div>
                {/* Table */}
              </div>

              {/* No Data Found */}

              {/* End of No Data Found */}
            </div>
          </li>
          <li class="list-group-item">
            <select
              class="form-select form-select-sm w-25"
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
            {/* Pagiantion */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              startIndex={startIndex}
              endIndex={endIndex}
              totalData={totalData}
            />
            {/* Pagiantion */}
          </li>
        </ul>
      </div>
      {/* card */}
    </div>
  );
};

export default AdminAccountStatement;
