import React from "react";
import { Pagination } from "react-bootstrap";
import DatePicker from "react-datepicker";

const BetHistory = ({ setEndDate, setStartDate, startDate, endDate }) => {
  return (
    <div className="col-sm-8 mt-3">
      <div className="card mb-3 w-100 rounded">
        <div
          className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-md-between"
          style={{ backgroundColor: "#e6e9ed" }}
        >
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
            <div class="container">
              <div class="row">
                <div class="col-sm">Data Source</div>
                <div class="col-sm">Choose Type</div>
                <div class="col-sm">From</div>
                <div class="col-sm">To</div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-sm">
                  {" "}
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select</option>
                    <option value="settle">LIVE DATA</option>
                    <option value="unsettle">BACKUP DATA</option>
                    <option value="void">OLD DATA</option>
                  </select>
                </div>
                <div class="col-sm">
                  {" "}
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select</option>
                    <option value="settle">Settle</option>
                    <option value="unsettle">UnSettle</option>
                    <option value="void">void</option>
                  </select>
                </div>
                <div class="col-sm">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div class="col-sm">
                  {" "}
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group mb-0 px-2">
            <button
              className="btn btn-primary btn-sm "
              // onClick={handleGetStatement}
            >
              Get History
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
          <b>&nbsp;&nbsp;Bet History</b>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <div class="white_card_body">
              {/* Table */}
              <div class="QA_section">
                <div class="QA_table mb_30">
                  <table class="table lms_table_active3 table-bordered">
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "#e6e9ed",
                          color: "#5562a3",
                        }}
                      >
                        <th scope="col">
                          <b>User Name</b>
                        </th>
                        <th scope="col">
                          <b>Sport Name</b>
                        </th>
                        <th scope="col">
                          <b>Event</b>
                        </th>
                        <th scope="col">
                          <b>Market</b>
                        </th>
                        <th scope="col">
                          <b>Selection</b>
                        </th>
                        <th scope="col">
                          <b>Type</b>
                        </th>
                        <th scope="col">
                          <b>Odds Req.</b>
                        </th>
                        <th scope="col">
                          <b>Stack</b>
                        </th>
                        <th scope="col">
                          <b>Place Time</b>
                        </th>
                        <th scope="col">
                          <b>Settle Time</b>
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
                {/* Table */}
              </div>

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
            {/* {props.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                startIndex={startIndex}
                endIndex={endIndex}
                totalData={totalData}
              />
            )} */}

            {/* Pagiantion */}
          </li>
        </ul>
      </div>
      {/* card */}
    </div>
  );
};

export default BetHistory;
