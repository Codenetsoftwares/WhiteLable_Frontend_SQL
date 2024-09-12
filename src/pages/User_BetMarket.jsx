import React from "react";
import SingleCard from "../components/common/singleCard";

const User_BetMarket = () => {
  return (
    // <div className="container-fluid m-auto">
    //   <h4 className="mt-3">Username:amit</h4>
    //   <div className="row p-1 m-0" style={{ backgroundColor: "white" }}>
    //     <div className="col-12 p-1 mt-2" style={{ backgroundColor: "#a1aed4" }}>
    //       testing
    //     </div>
    //     <div className="row py-1 px-0 m-0 ">
    //       <div className="col-4"></div>
    //       <div
    //         className="col-4 rounded-top-3"
    //         style={{ backgroundColor: "lightblue" }}
    //       >
    //         Back
    //       </div>
    //       <div
    //         className="col-4 rounded-top-3"
    //         style={{ backgroundColor: "pink" }}
    //       >
    //         Lay
    //       </div>
    //     </div>
    //     {/* {user_marketWithRunnerData &&
    //     user_marketWithRunnerData.runners.map((runnerData, index) => { */}

    //     <div className="row py-1 px-0 m-0 border">
    //       <span className={`col-4 text-dark text-decoration-none text-nowrap`}>
    //         {/* {runnerData.runnerName.name}{" "} */}A
    //       </span>

    //       <div className="col-4" style={{ backgroundColor: "lightblue" }}>
    //         {/* {runnerData.rate[0].back} */}1.2
    //       </div>

    //       <div className="col-4" style={{ backgroundColor: "pink" }}>
    //         {/* {runnerData.rate[0].lay} */}1.5
    //       </div>
    //     </div>

    //     {/* })} */}
    //   </div>
    // </div>
    <div className="container my-5">
      <div className="card shadow-sm">
        <div
          className="card-header"
          style={{
            backgroundColor: "#7D7D7D",
            color: "#FFFFFF",
          }}
        >
          <h3 className="mb-0 fw-bold fs-5">User Bet Market</h3>
        </div>
        <div className="card-body">
          {/* Search and Entries Selection */}
          <div className="row mb-4">
            <p className="mx-2">User Name: Amit</p>
          </div>

          {/* Table */}
          <SingleCard
            className=" mb-5 "
            style={{
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 1)",
            }}
          >
            <div className="row p-1 m-0" style={{ backgroundColor: "white" }}>
              <div
                className="col-12 p-1 mt-2"
                style={{ backgroundColor: "#a1aed4" }}
              >
                testing
              </div>
              <div className="row py-1 px-0 m-0 ">
                <div className="col-4"></div>
                <div
                  className="col-4 rounded-top-3"
                  style={{ backgroundColor: "lightblue" }}
                >
                  Back
                </div>
                <div
                  className="col-4 rounded-top-3"
                  style={{ backgroundColor: "pink" }}
                >
                  Lay
                </div>
              </div>
              {/* {user_marketWithRunnerData &&
        user_marketWithRunnerData.runners.map((runnerData, index) => { */}

              <div className="row py-1 px-0 m-0 border">
                <span
                  className={`col-4 text-dark text-decoration-none text-nowrap`}
                >
                  {/* {runnerData.runnerName.name}{" "} */}A
                </span>

                <div className="col-4" style={{ backgroundColor: "lightblue" }}>
                  {/* {runnerData.rate[0].back} */}1.2
                </div>

                <div className="col-4" style={{ backgroundColor: "pink" }}>
                  {/* {runnerData.rate[0].lay} */}1.5
                </div>
              </div>

              {/* })} */}
            </div>
          </SingleCard>
        </div>
      </div>
    </div>
  );
};

export default User_BetMarket;
