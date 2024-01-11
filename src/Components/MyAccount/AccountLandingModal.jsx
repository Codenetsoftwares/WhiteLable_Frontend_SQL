import React, { useState, useEffect } from "react";
import AccountStatement from "./AccountStatement";
import { Link } from "react-router-dom";
import ActivityLog from "./ActivityLog";
import AccountProfile from "./AccountProfile";
import { useAuth } from "../../Utils/Auth";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import MyAccountServices from "../../Services/MyAccountServices";

const AccountLandingModal = () => {
  let componentToRender;
  const { userId } = useParams();
  const auth = useAuth();

  const [statementView, setstatementView] = useState([]);
  const [activityView, setActivityView] = useState([]);
  const [profileView, setProfileView] = useState([]);
  const [toggle, settoggle] = useState(1);
  const [activeItem, setActiveItem] = useState("statement");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const [endDate, setEndDate] = useState(new Date());
  const [totalData, setTotalData] = useState(0);
  const Id = userId.userId;

  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 7);

  const [startDate, setStartDate] = useState(defaultStartDate);
  useEffect(() => {
    MyAccountServices.getAccountStatement(
      userId,
      currentPage,
      startDate,
      endDate,
      auth.user
    )
      .then((res) => {
        setstatementView(res.data.allData);
        setTotalPages(res.data.totalPages);
        setTotalData(res.data.totalItems);
      })
      .catch((err) => {});
  }, [userId, currentPage, startDate, endDate, auth]);
  console.log("Line number 42=======>", startDate, endDate);
  useEffect(() => {
    MyAccountServices.getActivityLog(userId, auth.user)
      .then((res) => setActivityView(res.data))
      .catch((err) => {});
  }, [userId, auth]);

  useEffect(() => {
    MyAccountServices.getProfile(userId, auth.user)
      .then((res) => setProfileView(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, [userId, auth]);
  let startIndex = Math.min((currentPage - 1) * 5 + 1);
  let endIndex = Math.min(currentPage * 5, totalData);
  const handlePageChange = (page) => {
    console.log("Changing to page:", page);

    setCurrentPage(page);
  };

  // const handleGetStatement = (startDate, endDate) => {
  //   setStartDate(startDate);
  //   console.log("From Date:", startDate);
  //   setEndDate(endDate);
  //   console.log("To Date:", endDate);
  // };

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
        // handleGetStatement={handleGetStatement}
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
      <AccountProfile props={profileView} UserName={userId} />
    );
  }

  return (
    <div className="container">
      <div className="row row-no-gutters">
        {/* First Section */}
        <div className="col-sm-4">
          {/* <div className="white_card_body">
            <Link to="#">
              <div
                className="alert text-white bg-danger w-75 mt-3"
                role="alert"
                style={{ cursor: "pointer" }}
                onClick={handelStatement}
              >
                <div className="alert-text">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="loader--facebook colord_bg_3">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <div className="col mt-4 text-black">
                      <h6 className="text-dark">
                        <b>Account Statement</b>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="#">
              <div
                className="alert text-white bg-warning w-75"
                role="alert"
                style={{ cursor: "pointer" }}
                onClick={handelActivity}
              >
                <div className="alert-text">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="loader--facebook colord_bg_4">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <div className="col mt-4">
                      <h6 className="text-dark">
                        <b>Activity Log</b>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="#">
              <div
                className="alert text-white bg-success w-75"
                role="alert"
                style={{ cursor: "pointer" }}
                onClick={handelProfile}
              >
                <div className="alert-text">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="loader--facebook colord_bg_2">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                    <div className="col mt-4">
                      <h6 className="text-dark">
                        <b>Profile</b>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div> */}

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
