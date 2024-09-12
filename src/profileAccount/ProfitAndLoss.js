import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Pagination from "../components/common/Pagination";
import { Link } from "react-router-dom";
import {
  getProfitLossEvent,
  getProfitLossRunner,
} from "../Utils/service/apiService";
import ProfitAndLossEvent from "./ProfitAndLossEvent";
import ProfitAndLossRunner from "./ProfitLossRunner";

const ProfitAndLoss = ({
  UserName,
  setEndDate,
  setStartDate,
  startDate,
  endDate,
  dataGameWise,
  currentPage,
  totalData,
  handlePageChange,
  totalPages,
  SetProfitLossData,
}) => {
  //Pagination
  const startIndex = Math.min((currentPage - 1) * 10 + 1);
  const endIndex = Math.min(currentPage * 10, totalData);

  const [profitLossEventData, SetProfitLossEventData] = useState({
    data: [],
    totalPages: 0,
    totalData: 0,
    currentPage: 1,
    itemPerPage: 10,
    searchItem: "",
  });

  const [profitLossRunnerData, SetProfitLossRunnerData] = useState({
    data: [],
    totalPages: 0,
    totalData: 0,
    currentPage: 1,
    itemPerPage: 10,
    searchItem: "",
  });

  const [toggle, SetToggle] = useState(true);
  const [component, SetComponent] = useState(null);
  const [marketId, SetMarketId] = useState(null);

  async function getProfitLossRunnerWise() {
    SetToggle(false);
    const response = await getProfitLossRunner({
      userName: UserName,
      marketId: marketId,
      limit: profitLossRunnerData.itemPerPage,
      searchName: profitLossRunnerData.searchItem,  
    });
    console.log("runner=>>>", response);
    SetProfitLossRunnerData((prevState) => ({
      ...prevState,
      data: response.data,
      totalPages: response.pagination.totalPages,
      totalData: response.pagination.totalItems,
    }));
  }

  useEffect(() => {
    if (marketId) getProfitLossRunnerWise();
  }, [
    marketId,
    profitLossRunnerData.itemPerPage,
    profitLossRunnerData.searchItem,
  ]);

  async function getProfitLossEventWise(gameId, componentName) {
    // if useEffcet  added give condition toggle must be false for end point to hit
    SetToggle(false);
    SetComponent(componentName);
    const response = await getProfitLossEvent({
      userName: UserName,
      gameId: gameId,
      // limit: profitLossEventData.itemPerPage,  //Work pending by serverSide
      searchName: profitLossEventData.searchItem,
    });
    console.log("event=>>>", response);
    SetProfitLossEventData((prevState) => ({
      ...prevState,
      data: response.data,
      totalPages: response.pagination.totalPages,
      totalData: response.pagination.totalItems,
    }));
  }
  console.log("component", component);
  let componentToRender;
  if (component === "ProfitAndLossEvent") {
    componentToRender = (
      <ProfitAndLossEvent
        data={profitLossEventData}
        SetComponent={SetComponent}
        SetMarketId={SetMarketId}
        SetProfitLossEventData={SetProfitLossEventData}
        currentPage={profitLossEventData.currentPage}
        SetToggle={SetToggle}
        totalItems={profitLossEventData.totalData}
      />
    );
  } else {
    componentToRender = (
      <ProfitAndLossRunner
        data={profitLossRunnerData}
        SetComponent={SetComponent}
        SetProfitLossRunnerData={SetProfitLossRunnerData}
        currentPage={profitLossRunnerData.currentPage}
        totalItems={profitLossRunnerData.totalData}
      />
    );
  }

  const handelItemPerPage = (event) => {
    console.log("event.target.value", event.target.value);
    SetProfitLossData((prevState) => ({
      ...prevState,
      itemPerPage: Number(event.target.value),
      currentPage: Number(currentPage),
    }));
  };

  const handleSearch = (e) => {
    SetProfitLossData((prev) => ({
      ...prev,
      searchItem: e.target.value,
    }));
  };

  return (
    <div className="col-sm-8 mt-3">
      {toggle && (
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

          </div>
        </div>
      )}

      {/* card */}
      {toggle === true ? (
        <div class="card w-100 rounded">
          <div
            class="card-heade text-white p-1"
            style={{ backgroundColor: "#26416e" }}
          >
            <b>&nbsp;&nbsp;Profit & Loss</b>
          </div>

          <div className="m-1 d-flex justify-content-between align-items-center">
            <select
              className="form-select w-auto m-1"
              onChange={handelItemPerPage}
            >
              <option defaultValue>Data Range</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <input
              type="search"
              className="form-control w-auto"
              placeholder="Search..."
              onChange={handleSearch}
            />
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
                          align="center"
                        >
                          <th scope="col">
                            <b>Sport Name</b>
                          </th>
                          <th scope="col">
                            <b>Profit & Loss</b>
                          </th>
                          <th scope="col">
                            <b>Commission</b>
                          </th>
                          <th scope="col">
                            <b>Total P&L</b>
                          </th>
                        </tr>
                        {dataGameWise?.length > 0 ? (
                          dataGameWise?.map((data) => (
                            <tr align="center">
                              {" "}
                              <td
                                onClick={() =>
                                  getProfitLossEventWise(
                                    data?.gameId,
                                    "ProfitAndLossEvent"
                                  )
                                }
                                className="text-primary fw-bold"
                                style={{ cursor: "pointer" }}
                              >
                                {data?.gameName}
                              </td>
                              <td>{data?.profitLoss || "NDS"}</td>
                              <td>{data?.commission || "NDS"}</td>
                              <td>{data?.totalProfitLoss}</td>
                            </tr>
                          ))
                        ) : (
                          <tr align="center">
                            <td colspan="4">
                              <div
                                class="alert alert-info fw-bold"
                                role="alert"
                              >
                                No Data Found !!
                              </div>
                            </td>
                          </tr>
                        )}
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
              {dataGameWise.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                  startIndex={startIndex}
                  endIndex={endIndex}
                  totalData={totalData}
                />
              )}
              {/* Pagiantion */}
            </li>
          </ul>
        </div>
      ) : (
        <>{componentToRender}</>
      )}

      {/* card */}
    </div>
  );
};

export default ProfitAndLoss;
