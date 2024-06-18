import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import ActivityLog from "./ActivityLog";

import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import AccountStatement from "./AccountStatement";
import AccountProfile from "./AccountProfile";
import { useAppContext } from "../contextApi/context";
import {
  getActivityLog_api,
  getAllTransactionView,
  getUserProfileView,
} from "../Utils/service/apiService";

const AccountLandingModal = () => {
  let componentToRender;
  const { userName } = useParams();
  //   const auth = useAuth();
  const { store, dispatch } = useAppContext();
  console.log("====>>>> store line 17", store);
  const [statementView, setstatementView] = useState([]);
  const [activityView, setActivityView] = useState([]);// this api is yet to receive from backend
  const [profileView, setProfileView] = useState([]);
  const [toggle, settoggle] = useState(1);
  const [activeItem, setActiveItem] = useState("statement");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const [endDate, setEndDate] = useState(new Date());
  const [totalData, setTotalData] = useState(0);

  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 7);

  const [startDate, setStartDate] = useState(defaultStartDate);

  useEffect(() => {
    getAll_userProfileStatement();
  }, [userName]);

  async function getAll_userProfileStatement() {
    const response = await getUserProfileView({ userName: userName });
    console.log("=======>>> response for user-profile-view", response);
    setProfileView(response.data);
  }

  useEffect(() => {
    getAll_transactionView();
    getActivityLog();
  }, [userName, currentPage, startDate, endDate]);

  async function getAll_transactionView() {
    const response = await getAllTransactionView({
      userName: userName,
      pageNumber: currentPage,
      fromDate: startDate,
      toDate: endDate,
    });
    console.log("response for transaction view line 67", response);
    setstatementView(response.data);
    setTotalPages(response.data.totalPages);
    setTotalData(response.data.totalItems);
  }
  console.log("Line number 42=======>", startDate, endDate);
  // useEffect(() => {
  //   MyAccountServices.getActivityLog(userId, auth.user)
  //     .then((res) => setActivityView(res.data))
  //     .catch((err) => {});
  // }, [userId, auth]);
  async function getActivityLog(){
const response = await getActivityLog_api({userName: userName,})
setActivityView(response.data)
  }
  let startIndex = Math.min((currentPage - 1) * 5 + 1);
  let endIndex = Math.min(currentPage * 5, totalData);
  const handlePageChange = (page) => {
    console.log("Changing to page:", page);

    setCurrentPage(page);
  };

  const handleGetStatement = (startDate, endDate) => {
    setStartDate(startDate);
    console.log("From Date:", startDate);
    setEndDate(endDate);
    console.log("To Date:", endDate);
  };

  const handelStatement = () => {
    settoggle(1);
    setActiveItem("statement");
  };
  const handelActivity = () => {
    settoggle(2);
    setActiveItem("activity");
  };
  const handelProfile = () => {
    settoggle(3);
    setActiveItem("profile");
  };

  if (toggle === 1) {
    componentToRender = (
      <AccountStatement
        props={statementView}
        handleGetStatement={handleGetStatement}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startIndex={startIndex}
        endIndex={endIndex}
        totalData={totalData}
      />
    );
  } else if (toggle === 2) {
    componentToRender = <ActivityLog props={activityView} />;
  } else if (toggle === 3) {
    componentToRender = (
      <AccountProfile
        props={profileView}
        // UserName={userId}
      />
    );
  }

  return (
    <div className="container">
      <div className="row row-no-gutters">
        {/* First Section */}
        <div className="col-sm-4">
          <div class="card mt-3" style={{ width: "18rem" }}>
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item text-white fs-6"
                style={{ backgroundColor: "#26416e" }}
              >
                My Account
              </li>
              <li
                className={`list-group-item`}
                style={{
                  cursor: "pointer",
                  backgroundColor: activeItem === "statement" ? "#d1d9f0" : "",
                }}
                onClick={handelStatement}
              >
                Account Statement
              </li>
              <li
                className={`list-group-item `}
                style={{
                  cursor: "pointer",
                  backgroundColor: activeItem === "activity" ? "#d1d9f0" : "",
                }}
                onClick={handelActivity}
              >
                Activity Log
              </li>
              <li
                className={`list-group-item`}
                style={{
                  cursor: "pointer",
                  backgroundColor: activeItem === "profile" ? "#d1d9f0" : "",
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
