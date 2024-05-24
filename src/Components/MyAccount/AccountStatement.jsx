import React, { useState, useEffect } from "react";
import Pagination from "../Pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ShimmerEffect from "../ShimmerEffect";

const AccountStatement = ({
  props,
  handlePageChange,
  currentPage,
  totalPages,
  // handleGetStatement,    
  startDate,
  endDate,
  setEndDate,
  setStartDate,
  startIndex,
  endIndex,
  totalData,
}) => {
  const [dataSource, setDataSource] = useState("");

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

  return (
    <div className="col-sm-8 mt-3">
      <div className="card mb-3 w-100 rounded">
        <div
          className="card-header text-white p-1"
          style={{ backgroundColor: "#26416e" }}
        >
          <b>&nbsp;&nbsp;Get Account Statement</b>
        </div>
        <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-md-between">
          {/* <div className="form-group mb-3 mb-md-0 px-2">
            <label>Data Source:</label>
            <select
              className="form-control"
              value={dataSource}
              onChange={(e) => setDataSource(e.target.value)}
            >
              <option value="">Select a data source</option>
              <option value="source1">Source 1</option>
              <option value="source2">Source 2</option>
              Add more options as needed
            </select>
          </div> */}
          <div className="form-group mb-3 mb-md-0 px-2">
            <label>From Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="form-group mb-3 mb-md-0 px-2">
            <label>To Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
          <div className="form-group mb-0 px-2">
            <button
              className="btn btn-primary"
              // onClick={handleGetStatement}
            >
              Get Statement
            </button>
          </div>
        </div>
      </div>

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
                        <th scope="col">
                          <b>Balance</b>
                        </th>
                        <th scope="col">
                          <b>Remark</b>
                        </th>
                        <th scope="col">
                          <b>From//To</b>
                        </th>
                      </tr>
                    </thead>
                    {/* Need To uncomment */}

                    {/* {props.map((transaction) => (
                      <tr key={transaction._id}>
                        <th scope="row">
                          <a href="#" className="question_content">
                            {formatDate(transaction.date)}
                          </a>
                        </th>
                        {transaction.transactionType === "Debit" ? (
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

                        <td>
                          {transaction.transactionType === "Debit"
                            ? transaction.debitBalance
                            : transaction.balance}
                        </td>
                        <td>{transaction.remarks}</td>
                        <td>{`${transaction.From} / ${transaction.To}`}</td>
                      </tr>
                    ))} */}
                  </table>
                </div>
                {/* Table */}
              </div>
              {/* Need To uncomment */}
              {/* No Data Found */}
              {/* {props.length === 0 && (
          <div className="alert text-dark bg-light mt-3" role="alert">
            <div className="alert-text d-flex justify-content-center">
              <b> &#128680; No Data Found !! </b>
            </div>
          </div>
        )} */}
              {/* End of No Data Found */}
            </div>
          </li>
          <li class="list-group-item">
            {/* Need To uncomment */}
            {/* Pagiantion */}
            {/* <div class="col-lg-12">
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-end">
                  <li class="page-item disabled">
                    <a
                      class="page-link"
                      href="#"
                      tabindex="-1"
                      aria-disabled="true"
                    >
                      Previous
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div> */}
            {/* Need To uncomment */}
            {/* {props.length>0 &&  <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                startIndex={startIndex}
                endIndex={endIndex}
                totalData={totalData}
              /> } */}

            {/* Pagiantion */}
          </li>
        </ul>
      </div>
      {/* card */}
    </div>
  );
};

export default AccountStatement;
