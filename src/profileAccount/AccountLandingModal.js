import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import ActivityLog from "./ActivityLog";

import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import AccountStatement from "./AccountStatement";
import AccountProfile from "./AccountProfile";

import {
  getActivityLog_api,
  getAllTransactionView,
  getBetHistory,
  getGameNames,
  getProfitLossGame,
  getUserProfileView,
} from "../Utils/service/apiService";
import { accountStatementInitialState } from "../Utils/service/initiateState";
import BetHistory from "./BetHistory";
import ProfitAndLoss from "./ProfitAndLoss";
import strings from "../Utils/constant/stringConstant";

const AccountLandingModal = () => {
  const { userName } = useParams();
  console.log("======>>> username", userName);
  const [state, setState] = useState(accountStatementInitialState());
  const [backupDate, setbackupDate] = useState({
    endDate: null,
    startDate: null,
  });
  const [betHistoryData, SetBetHistoryData] = useState({
    gameList: [],
    SelectedGameId: null,
    dataHistory: [],
    totalPages: 0,
    totalData: 0,
    currentPage: 1,
    itemPerPage: 10,
    endDate: new Date(),
    startDate: (() => {
      const date = new Date();
      date.setDate(date.getDate() - 7);
      return date;
    })(),
    dataSource: "live",
  });

  const [profitLossData, SetProfitLossData] = useState({
    dataGameWise: [],
    dataMarketWise: [],
    dataHistory: [],
    totalPages: 0,
    totalData: 0,
    currentPage: 1,
    itemPerPage: 10,
    endDate: "",
    startDate: "",
    searchItem: "",
    dataSource: "live",
    backupStartDate: null,
    backupEndDate: null,
  });

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

  useEffect(() => {
    getAll_userProfileStatement();
    getGameForBetHistory();
  }, [userName]);

  useEffect(() => {
    getAll_transactionView();
    getActivityLog();
    if (betHistoryData.SelectedGameId) {
      getHistoryForBetHistory();
    }
  }, [
    userName,
    state.currentPage,
    state.startDate,
    state.endDate,
    state.totalEntries,
    betHistoryData.SelectedGameId,
    betHistoryData.currentPage,
    betHistoryData.itemPerPage,
    betHistoryData.endDate,
    betHistoryData.startDate,
    state.dataSource,
    betHistoryData.dataSource,
  ]);

  useEffect(() => {
    getProfitLossGameWise();
  }, [
    profitLossData.startDate,
    profitLossData.endDate,
    profitLossData.currentPage,
    profitLossData.itemPerPage,
    // profitLossData.searchItem,
    profitLossData.dataSource,
  ]);

  // Debounce for search
  useEffect(() => {
    let timer = setTimeout(() => {
      getProfitLossGameWise();
    }, 300);
    return () => clearTimeout(timer);
  }, [profitLossData.searchItem]);

  async function getAll_userProfileStatement() {
    const response = await getUserProfileView({ userName });
    console.log("=======>>> response for user-profile-view", response);
    setState((prevState) => ({
      ...prevState,
      profileView: response.data,
    }));
  }
  console.log("User=>>>", state?.profileView?.roles[0]?.role);
  console.log("User=>>>", state);

  console.log("tom===>", formatDate(state.startDate));

  async function getAll_transactionView() {
    const response = await getAllTransactionView({
      userName,
      pageNumber: state.currentPage,
      fromDate: state.startDate,
      toDate: state.endDate,
      limit: state.totalEntries,
      dataSource: state.dataSource,
    });
    console.log("response for transaction view line 67", response);
    setState((prevState) => ({
      ...prevState,
      statementView: response.data,
      totalPages: response?.pagination?.totalPages,
      totalData: response?.pagination?.totalItems,
    }));
  }

  async function getActivityLog() {
    const response = await getActivityLog_api({ userName });
    setState((prevState) => ({
      ...prevState,
      activityView: response.data,
    }));
  }

  // For Bet History Page DropDown
  async function getGameForBetHistory() {
    const response = await getGameNames();
    SetBetHistoryData((betHistoryData) => ({
      ...betHistoryData,
      gameList: response.data,
    }));
  }
  // For Bet History Data to show
  async function getHistoryForBetHistory() {
    const response = await getBetHistory({
      userName,
      gameId: betHistoryData.SelectedGameId,
      fromDate: formatDate(betHistoryData.startDate),
      toDate: formatDate(betHistoryData.endDate),
      page: betHistoryData.currentPage,
      limit: betHistoryData.itemPerPage,
      dataSource: betHistoryData.dataSource,
    });
    console.log("res->>", response);
    SetBetHistoryData((prevState) => ({
      ...prevState,
      dataHistory: response.data,
      totalPages: response.pagination.totalPages,
      totalData: response.pagination.totalItems,
    }));
  }
  // For Game wise Profit Loss Data to show
  async function getProfitLossGameWise() {
    const response = await getProfitLossGame({
      userName,
      fromDate: profitLossData.startDate,
      toDate: profitLossData.endDate,
      limit: profitLossData.itemPerPage,
      searchName: profitLossData.searchItem,
      dataSource: profitLossData.dataSource,
    });
    console.log("getProfitLossGameWise", response);
    SetProfitLossData((prevState) => ({
      ...prevState,
      dataGameWise: response.data,
      totalPages: response.pagination.totalPages,
      totalData: response.pagination.totalItems,
    }));
  }
  // console.log("getProfitLossGameWise", profitLossData);

  console.log("getHistoryForBetHistory", betHistoryData);

  const startIndex = Math.min((state.currentPage - 1) * state.totalEntries + 1);
  const endIndex = Math.min(
    state.currentPage * state.totalEntries,
    state.totalData
  );

  const startIndexBetHistory = Math.min(
    (betHistoryData.currentPage - 1) * betHistoryData.itemPerPage + 1
  );
  const endIndexBetHistory = Math.min(
    betHistoryData.currentPage * betHistoryData.itemPerPage,
    betHistoryData.totalData
  );

  const handlePageChange = (page) => {
    console.log("Changing to page:", page);
    setState((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
  };

  const handleGetStatement = (startDate, endDate) => {
    console.log("From Date:", startDate, "To Date:", endDate);
    setState((prevState) => ({
      ...prevState,
      startDate,
      endDate,
    }));
  };

  const handelStatement = () => {
    setState((prevState) => ({
      ...prevState,
      toggle: 1,
      activeItem: "statement",
    }));
  };

  const handelActivity = () => {
    setState((prevState) => ({
      ...prevState,
      toggle: 2,
      activeItem: "activity",
    }));
  };

  const handelProfile = () => {
    setState((prevState) => ({
      ...prevState,
      toggle: 3,
      activeItem: "profile",
    }));
  };

  const handelBetHistory = () => {
    setState((prevState) => ({
      ...prevState,
      toggle: 4,
      activeItem: "betHistory",
    }));
  };

  const handelProfitLoss = () => {
    setState((prevState) => ({
      ...prevState,
      toggle: 5,
      activeItem: "profitAndLoss",
    }));
  };

  const handleDateStatement = () => {
    setState((prevState) => ({
      ...prevState,
      startDate: formatDate(state.backupStartDate),
      endDate: formatDate(state.backupEndDate),
    }));
  };

  const handleDateForProfitLoss = () => {
    SetProfitLossData((prevState) => ({
      ...prevState,
      startDate: formatDate(profitLossData.backupStartDate),
      endDate: formatDate(profitLossData.backupEndDate),
    }));
  };

  let componentToRender;
  if (state.toggle === 1) {
    componentToRender = (
      <AccountStatement
        props={state.statementView}
        handleGetStatement={handleGetStatement}
        handlePageChange={handlePageChange}
        currentPage={state.currentPage}
        totalPages={state.totalPages}
        startDate={state.backupStartDate}
        endDate={state.backupEndDate}
        setStartDate={(date) =>
          setState((prevState) => ({ ...prevState, backupStartDate: date }))
        }
        setEndDate={(date) =>
          setState((prevState) => ({ ...prevState, backupEndDate: date }))
        }
        startIndex={startIndex}
        endIndex={endIndex}
        totalData={state.totalData}
        setState={setState}
        dataSource={state.dataSource}
        handleDateStatement={handleDateStatement}
      />
    );
  } else if (state.toggle === 2) {
    componentToRender = <ActivityLog props={state.activityView} />;
  } else if (state.toggle === 3) {
    componentToRender = (
      <AccountProfile
        props={state.profileView}
        UserName={userName}
        createdByUser={state.profileView.createdById}
      />
    );
  } else if (state.toggle === 4) {
    componentToRender = (
      <BetHistory
        props={state.profileView}
        UserName={userName}
        data={betHistoryData}
        setData={SetBetHistoryData}
        startDate={betHistoryData.startDate}
        endDate={betHistoryData.endDate}
        setStartDate={(date) =>
          SetBetHistoryData((prevState) => ({ ...prevState, startDate: date }))
        }
        setEndDate={(date) =>
          SetBetHistoryData((prevState) => ({ ...prevState, endDate: date }))
        }
        startIndex={startIndexBetHistory}
        endIndex={endIndexBetHistory}
        totalData={betHistoryData.totalData}
        currentPage={betHistoryData.currentPage}
        totalPages={betHistoryData.totalPages}
        handlePageChange={handlePageChange}
        SetBetHistoryData={SetBetHistoryData}
      />
    );
  } else if (state.toggle === 5) {
    componentToRender = (
      <ProfitAndLoss
        props={state.profileView}
        UserName={userName}
        dataGameWise={profitLossData.dataGameWise}
        startDate={profitLossData.backupStartDate}
        endDate={profitLossData.backupEndDate}
        setStartDate={(date) =>
          SetProfitLossData((prevState) => ({
            ...prevState,
            backupStartDate: date,
          }))
        }
        setEndDate={(date) =>
          SetProfitLossData((prevState) => ({
            ...prevState,
            backupEndDate: date,
          }))
        }
        currentPage={profitLossData.currentPage}
        totalData={profitLossData.totalData}
        totalPages={profitLossData.totalPages}
        handlePageChange={handlePageChange}
        SetProfitLossData={SetProfitLossData}
        handleDateForProfitLoss={handleDateForProfitLoss}
      />
    );
  }

  console.log("createdByUser", state.profileView.createdById);
  return (
    <div className="container">
      <div className="row row-no-gutters">
        {/* First Section */}
        <div className="col-sm-4">
          <div className="card mt-3" style={{ width: "18rem" }}>
            <ul className="list-group list-group-flush">
              <li
                className="list-group-item text-white fs-6"
                style={{ backgroundColor: "#26416e" }}
              >
                My Account
              </li>
              <li
                className="list-group-item"
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    state.activeItem === "statement" ? "#d1d9f0" : "",
                }}
                onClick={handelStatement}
              >
                Account Statement
              </li>
              <li
                className="list-group-item"
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    state.activeItem === "activity" ? "#d1d9f0" : "",
                }}
                onClick={handelActivity}
              >
                Activity Log
              </li>
              <li
                className="list-group-item"
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    state.activeItem === "profile" ? "#d1d9f0" : "",
                }}
                onClick={handelProfile}
              >
                Profile
              </li>
              {state?.profileView?.roles[0]?.role === strings.user && (
                <>
                  {" "}
                  <li
                    className="list-group-item"
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        state.activeItem === "betHistory" ? "#d1d9f0" : "",
                    }}
                    onClick={handelBetHistory}
                  >
                    Bet History
                  </li>
                  <li
                    className="list-group-item"
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        state.activeItem === "profitAndLoss" ? "#d1d9f0" : "",
                    }}
                    onClick={handelProfitLoss}
                  >
                    Profit & Loss
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Second Section */}

        {componentToRender}
      </div>
    </div>
  );
};

export default AccountLandingModal;
