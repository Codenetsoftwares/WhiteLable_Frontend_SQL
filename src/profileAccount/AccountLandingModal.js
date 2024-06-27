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
  getUserProfileView,
} from "../Utils/service/apiService";
import { accountStatementInitialState } from "../Utils/service/initiateState";

const AccountLandingModal = () => {
  const { userName } = useParams();
  console.log('======>>> username',userName )
  const [state, setState] = useState(accountStatementInitialState());

  
  const formatDate = (dateString) => {
    // Parse the date string to create a Date object
    const date = new Date(dateString);
  
    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
  
    // Format the date as "YYYY-MM-DD"
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    getAll_userProfileStatement();
  }, [userName]);


  

  useEffect(() => {
    getAll_transactionView();
    getActivityLog();
  }, [userName, state.currentPage, state.startDate, state.endDate]);

  async function getAll_userProfileStatement() {
    const response = await getUserProfileView({ userName });
    console.log("=======>>> response for user-profile-view", response);
    setState((prevState) => ({
      ...prevState,
      profileView: response.data,
    }));
  }
  console.log("first===>",state.startDate)
console.log("tom===>",formatDate(state.startDate))

  async function getAll_transactionView() {
    const response = await getAllTransactionView({
      userName,
      pageNumber: state.currentPage,
      fromDate: formatDate(state.startDate),
      toDate: formatDate(state.endDate),
    });
    console.log("response for transaction view line 67", response);
    setState((prevState) => ({
      ...prevState,
      statementView: response.data,
      totalPages: response.pagination.totalPages,
      totalData: response.pagination.totalItems,
    }));
  }

  async function getActivityLog() {
    const response = await getActivityLog_api({ userName });
    setState((prevState) => ({
      ...prevState,
      activityView: response.data,
    }));
  }

  const startIndex = Math.min((state.currentPage - 1) * 5 + 1);
  const endIndex = Math.min(state.currentPage * 5, state.totalData);

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

  let componentToRender;
  if (state.toggle === 1) {
    componentToRender = (
      <AccountStatement
        props={state.statementView}
        handleGetStatement={handleGetStatement}
        handlePageChange={handlePageChange}
        currentPage={state.currentPage}
        totalPages={state.totalPages}
        startDate={state.startDate}
        endDate={state.endDate}
        setStartDate={(date) =>
          setState((prevState) => ({ ...prevState, startDate: date }))
        }
        setEndDate={(date) =>
          setState((prevState) => ({ ...prevState, endDate: date }))
        }
        startIndex={startIndex}
        endIndex={endIndex}
        totalData={state.totalData}
      />
    );
  } else if (state.toggle === 2) {
    componentToRender = <ActivityLog props={state.activityView} />;
  } else if (state.toggle === 3) {
    componentToRender = <AccountProfile props={state.profileView} UserName={userName} />;
  }

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
