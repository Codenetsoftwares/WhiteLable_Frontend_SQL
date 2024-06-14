import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Prompt } from "react-router";
import { Modal, Button } from "react-bootstrap";

import { useAppContext } from "../contextApi/context";
import { getHierarchy } from "../Utils/service/apiService";
import Card from "./common/Card";

const HierarchyPageView = () => {
  const { userName } = useParams();
  const { store } = useAppContext();
  const [hierarchydata, sethierarchyData] = useState([]);
  const [pathdata, setPathData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  const [totalData, setTotalData] = useState(0);
  const [totalEntries, setTotalEntries] = useState(5);

  // console.log('========>Hierechy',totalPages)
  const takeMeToAccount = (userName) => {
    navigate(`/account-landing/${userName}`);
  };

  const navigate = useNavigate();
  let action = "store";
  let data = { page: currentPage, searchName: name };

  async function ClearPath() {
    const action = "clearAll";
    const data = {
      adminName: userName,
      action: action,
    };

    const response = await getHierarchy(data);
    if (response.successCode) {
      console.log(response);
      navigate(`/wallet`);
    }
  }

  const fetchData = async () => {
    const res = await getHierarchy({
      adminName: userName,
      action: action,
    });
    if (res) {
      console.log("Response=>> HIERECHY", res.data);
      sethierarchyData(res.data.userDetails.createdUsers);
      setPathData(res.data.path);
      setTotalPages(res.data.totalPages);
      setIsLoading(true);
      setTotalData(res.data.totalItems);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userName, action, currentPage, name, totalEntries]);

  let startIndex = Math.min((currentPage - 1) * totalEntries + 1);
  let endIndex = Math.min(currentPage * totalEntries, totalData);

  // useEffect(() => {
  //   AccountServices.getHierarchy(userId, auth.user)
  //     .then((res) => {
  //       sethierarchyData(res.data.userDetails.createdUsers);
  //       setPathData(res.data.path);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [userId, auth]);

  console.log("hierarchy data=>>>", hierarchydata);
  console.log("Path data=>>>", pathdata);

  const handlePageChange = (page) => {
    console.log("Changing to page:", page);

    setCurrentPage(page);
    setIsLoading(false);
  };

  return (
    <div class="main_content_iner overly_inner ">
      <div class="container-fluid p-0 ">
        <div class="row">
          <div class="col-12">
            <div class="page_title_box d-flex flex-wrap align-items-center justify-content-between">
              <div class="page_title_left d-flex align-items-center">
                <h3 class="f_s_25 f_w_700 dark_text mr_30">
                  Hierarchy Dashboard
                </h3>
                <ol class="breadcrumb page_bradcam mb-0">
                  <li class="breadcrumb-item">
                    <a href="#" onClick={ClearPath}>
                      {store.admin.adminName}
                    </a>
                  </li>
                  <li class="active">
                    {" "}
                    {pathdata.map((data) => (
                      <Link
                        to={{
                          pathname: `/hierarchyView/${data}`,
                        }}
                      >
                        <a style={{ cursor: "pointer" }}>&nbsp;/&nbsp;{data}</a>
                      </Link>
                    ))}
                  </li>
                </ol>
              </div>
              <div class="page_title_right">
                <div class="page_date_button d-flex align-items-center">
                  <img src="img/icon/calender_icon.svg" alt="" />
                  {Date()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="white_card card_height_100 mb_30 pt-4">
              <div class="white_card_body">
                <div class="QA_section">
                  <div class="white_box_tittle list_header">
                    <h4>User List </h4>
                    <div class="box_right d-flex lms_block gap-5">
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
                      <div class="serach_field_2">
                        <div class="search_inner">
                          <form Active="#">
                            <div class="search_field">
                              <input
                                value={name}
                                type="text"
                                placeholder="Search content here..."
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                              />
                            </div>
                            <button type="submit">
                              {" "}
                              <i class="ti-search"></i>{" "}
                            </button>
                          </form>
                        </div>
                      </div>
                      <div class="add_button ms-2">
                        {/* <a
                          href="#"
                          data-toggle="modal"
                          data-target="#addcategory"
                          class="btn_1"
                        >
                          search
                        </a> */}
                      </div>
                    </div>
                  </div>

                  <div class="QA_table mb_30">
                    <table class="table lms_table_active table-bordered">
                      <thead>
                        <tr className="text-bolder fs-6 text-center">
                          <th scope="col">Username</th>
                          <th scope="col">Credit ref</th>
                          <th scope="col">Partnership</th>
                          <th scope="col">Balance</th>
                          <th scope="col">Exposure</th>
                          <th scope="col">Avail. Bal.</th>
                          <th scope="col">Ref. P/L</th>
                          <th scope="col">Status</th>
                          <th>Actions</th>

                          {/* <th scope="col">Action</th> */}
                        </tr>
                      </thead>
                      {hierarchydata.map((data, i) => {
                        // const creditRefLength = data.creditRef.length;
                        // const partnershipLength = data.partnership.length;
                        console.log("data", data);
                        return (
                          <Card
                            userName={data.userName}
                            role={data.roles[0].role}
                            key={data.id}
                            // creditRef={data.creditRef[creditRefLength - 1]?.value}
                            balance={data.balance}
                            loadBalance={data.loadBalance}
                            refProfitLoss={data.refProfitLoss}
                            adminId={data.adminId}
                            // partnership={
                            //     data.partnership[partnershipLength - 1]?.value
                            // }
                            Status={data.Status}
                            // creditRefLength={creditRefLength}
                            // partnershipLength={partnershipLength}
                            callingParent="HierarchyPageView"
                          />
                        );
                      })}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HierarchyPageView;
