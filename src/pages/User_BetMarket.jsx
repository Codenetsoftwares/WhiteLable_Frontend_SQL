import React, { useEffect, useState } from "react";
import SingleCard from "../components/common/singleCard";
import { getMarketWithRunnerDataInitialState } from "../Utils/service/initiateState";
import { getUserGetMarket } from "../Utils/service/apiService";
import { toast } from "react-toastify";
import { customErrorHandler } from "../Utils/helper";
import { useAppContext } from "../contextApi/context";
import { permissionObj } from "../Utils/constant/permission";
import { useParams } from "react-router-dom";

const User_BetMarket = () => {
  const { dispatch, store } = useAppContext();
  const [user_marketWithRunnerData, setUser_marketWithRunnerData] = useState(
    getMarketWithRunnerDataInitialState()
  );
  const { marketId, userName } = useParams();
  console.log("param", user_marketWithRunnerData);

  async function getView_User_BetMarket() {
    try {
      const response = await getUserGetMarket({
        marketId: marketId,
        userName: userName,
      });
      console.log("======>>>>>> response", response.data);

      setUser_marketWithRunnerData(response.data);
    } catch (error) {
      toast.error(customErrorHandler(error));
    }
  }

  useEffect(() => {
    if (store?.admin) {
      if (
        permissionObj.allAdmin.includes(store?.admin?.roles[0].role) ||
        permissionObj.allSubAdmin.includes(store?.admin?.roles[0].role)
      ) {
        getView_User_BetMarket();
      }
    }
  }, []);

  return (
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
          {/* User Name */}
          <div className="row mb-4">
            <p className="mx-2">User Name: {userName.toUpperCase()}</p>
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
                {user_marketWithRunnerData?.marketName}
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

              {/* Runners Mapping */}
              {user_marketWithRunnerData?.runners?.map((runnerData, index) => {
                return (
                  <div className="row py-1 px-0 m-0 border" key={index}>
                    {/* Runner Name and Balance */}
                    <span className="col-4 text-dark text-decoration-none text-nowrap">
                      {runnerData?.runnerName?.name}

                      <span className="mx-3 my-1">
                        {runnerData?.runnerName?.bal > 0 ? (
                          <span className="text-danger">
                            -{Math.abs(runnerData?.runnerName?.bal)}
                          </span>
                        ) : (
                          <span className="text-success">
                            {Math.abs(runnerData?.runnerName?.bal)}
                          </span>
                        )}
                      </span>
                    </span>

                    {/* Back and Lay Rates */}
                    <div
                      className="col-4"
                      style={{ backgroundColor: "lightblue" }}
                    >
                      {runnerData?.rate?.[0]?.back ?? "N/A"}
                    </div>

                    <div className="col-4" style={{ backgroundColor: "pink" }}>
                      {runnerData?.rate?.[0]?.lay ?? "N/A"}
                    </div>
                  </div>
                );
              })}
            </div>
          </SingleCard>
        </div>
      </div>
    </div>
  );
};

export default User_BetMarket;
