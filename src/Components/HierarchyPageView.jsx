import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../Utils/Auth";
import AccountServices from "../Services/AccountServices";
import { useNavigate } from "react-router-dom";
import { Prompt } from "react-router";
import { Modal, Button } from "react-bootstrap";
import Pagination from "./Pagination";
import ShimmerEffect from "./ShimmerEffect";

const HierarchyPageView = () => {
  const { userId } = useParams();
  const auth = useAuth();
  const [hierarchydata, sethierarchyData] = useState([]);
  const [modalPartnership, setModalPartnership] = useState([]);
  const [modalcreditref, setModalcreditref] = useState([]);
  const [pathdata, setPathData] = useState([]);
  const [showModalCreditRef, setShowModalCreditRef] = useState(false);
  const [showModalPartnership, setShowModalPartnership] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [totalData, setTotalData] = useState(0);
  const [totalEntries, setTotalEntries] = useState(5);
  console.log("line 22", auth);

  // console.log('========>Hierechy',totalPages)
  const takeMeToAccount = (userName) => {
    navigate(`/account-landing/${userName}`);
  };
  const handleCloseModalCreditRef = () => {
    setShowModalCreditRef(false);
  };
  const handleCloseModalPartnership = () => setShowModalPartnership(false);

  const handleShowModalCreditRef = (creditref) => {
    setShowModalCreditRef(true);
    setModalcreditref(creditref);
  };
  console.log("modalcreditref=>>", modalcreditref);

  const handleShowModalPartnership = (partnership) => {
    setShowModalPartnership(true);
    setModalPartnership(partnership);
  };
  console.log("modalpartnership=>>", modalPartnership);

  // const [pathname, setPathname] = useState([]);
  const navigate = useNavigate();
  // const garbage = [];
  let action = "store";
  // let currentPage = "store";

  let data = { page: currentPage, searchName: name };

  const ClearPath = () => {
    action = "clearAll";
    AccountServices.getHierarchy(userId, action, auth.user, data )

      .then((res) => {
        if (res.status === 200) {
          navigate(`/maintransaction`);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(auth);
      try {
        const res = await AccountServices.getHierarchy(
          userId,
          action,
          auth.user,
          data,
          totalEntries

        );
        console.log("Response=>> HIERECHY", res.data);
        sethierarchyData(res.data.data.userDetails.createdUsers);
        setPathData(res.data.data.path);
        setTotalPages(res.data.data.totalPages);

        setIsLoading(true)

        setTotalData(res.data.data.totalItems);

      } catch (error) {
        console.error("Error fetching hierarchy data:", error);
        // Need to add additional error handling logic here, such as setting an error state.
      }
    };
    fetchData();
  }, [userId, action, currentPage, name, auth.user, totalEntries]);
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
  // console.log("Path data=>>>", pathdata);

  const handlePageChange = (page) => {
    console.log("Changing to page:", page);

    setCurrentPage(page);
    setIsLoading(false)

  };
  console.log("Path Data=>>>>", pathdata);
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
                      {auth.user.userName}
                    </a>
                  </li>
                  <li class="active">
                    {" "}
                    {pathdata.map((data) => (
                      <Link
                        to={{
                          pathname: `/hierarchypageview/${data}`,
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
                      <tbody>
                        {isLoading ? (hierarchydata && hierarchydata.length > 0 ? (
                          hierarchydata.map((user, index) => (
                            <tr key={index} className="text-center">
                              <th scope="row" className="">
                                <Link
                                  to={{
                                    pathname: `/hierarchypageview/${user.userName}`,
                                  }}
                                >
                                  <button
                                    className="border border-1 w-75 text-center bg-success rounded-pill "
                                    // data-bs-toggle="modal"
                                    // data-bs-target={`#hierarchyview-${userId}`}
                                    style={{ cursor: "auto" }}
                                  >
                                    {user.roles[0].role}
                                  </button>

                                  <p
                                  // onClick={() => {
                                  //   savePathName(user.userName);
                                  // }}
                                  >
                                    <b title="Click to show next hierarchy">
                                      {user.userName}
                                    </b>
                                  </p>
                                </Link>
                              </th>

                              <td>
                                <span className="align-middle">
                                  {user.creditRef.length > 0 ? (
                                    <span
                                      onClick={() =>
                                        handleShowModalCreditRef(user.creditRef)
                                      }
                                    >
                                      {
                                        user.creditRef[
                                          user.creditRef.length - 1
                                        ].value
                                      }
                                    </span>
                                  ) : (
                                    <span
                                      onClick={() =>
                                        handleShowModalCreditRef(user.creditRef)
                                      }
                                    >
                                      0
                                    </span>
                                  )}
                                  &nbsp;{" "}
                                  <i
                                    class="fa-regular fa-eye"
                                    onClick={() =>
                                      handleShowModalCreditRef(user.creditRef)
                                    }
                                  ></i>
                                </span>
                              </td>
                              <td>
                                <span className="align-middle">
                                  {" "}
                                  {user.partnership.length > 0 ? (
                                    <span
                                      onClick={() =>
                                        handleShowModalPartnership(
                                          user.partnership
                                        )
                                      }
                                    >
                                      {
                                        user.partnership[
                                          user.partnership.length - 1
                                        ].value
                                      }
                                    </span>
                                  ) : (
                                    <span
                                      onClick={() =>
                                        handleShowModalPartnership(
                                          user.partnership
                                        )
                                      }
                                    >
                                      0
                                    </span>
                                  )}
                                  &nbsp;{" "}
                                  <i
                                    class="fa-regular fa-eye"
                                    onClick={() =>
                                      handleShowModalPartnership(
                                        user.partnership
                                      )
                                    }
                                  ></i>
                                </span>
                              </td>
                              <td>{user.loadBalance}</td>
                              <td>0</td>
                              <td>{user.balance}</td>
                              <td>{user.loadBalance - user.creditRef}</td>
                              <td className="text-danger">
                                <p className="border border-1 w-75 text-center bg-success rounded-pill">
                                  {user.status}
                                </p>
                              </td>
                              <td>
                                <span className="mx-1">
                                  <button
                                    className={`btn border border-2 rounded ${auth.user.roles[0].permission.some(
                                      (role) => role === "Partnership-Edit"
                                    )
                                      ? ""
                                      : [
                                        "superAdmin",
                                        "WhiteLabel",
                                        "HyperAgent",
                                        "SuperAgent",
                                        "MasterAgent",
                                      ].includes(auth.user.roles[0].role)
                                        ? ""
                                        : "disabled"
                                      }`}
                                    title="Profile"
                                    onClick={() => {
                                      takeMeToAccount(user.userName);
                                    }}
                                  >
                                    <i class="fa-solid fa-user"></i>
                                  </button>
                                </span>
                                <span className="mx-1">
                                  <button
                                    className="btn border border-2 rounded"
                                    title="Wallet"
                                  >
                                    <i class="fa-regular fas fa-wallet"></i>
                                  </button>
                                </span>
                              </td>

                              {/* Uncomment the following lines for action buttons */}
                              {/* <td>
                <div className="action_btns d-flex">
                  <a href="#" className="action_btn mr_10">
                    <i className="far fa-edit"></i>
                  </a>
                  <a href="#" className="action_btn">
                    <i className="fas fa-trash"></i>
                  </a>
                </div>
              </td> */}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="9">
                              <div
                                class="alert text-dark bg-light"
                                role="alert"
                              >
                                <div class="alert-text d-flex justify-content-center">
                                  <b> &#128680; No Data Found !! </b>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )) : (<ShimmerEffect />)}
                        {/* <td>
                            <div class="action_btns d-flex">
                              <a href="#" class="action_btn mr_10">
                                {" "}
                                <i class="far fa-edit"></i>{" "}
                              </a>
                              <a href="#" class="action_btn">
                                {" "}
                                <i class="fas fa-trash"></i>{" "}
                              </a>
                            </div>
                          </td> */}
                      </tbody>
                    </table>
                  </div>
                  {/* Pagination Start*/}
                  {/* <div class="col-lg-12">
                    <div class="white_box mb_30">
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
                    </div>
                  </div> */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}

                    startIndex={startIndex}
                    endIndex={endIndex}
                    totalData={totalData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Partnership View */}
      <Modal
        show={showModalCreditRef}
        onHide={handleCloseModalCreditRef}
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal 1 Title</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          {modalcreditref.length > 0 ? (
            <table className="table lms_table_active3 table-bordered table-sm">
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Date</th>
                  <th>PartnerShip Amount</th>
                </tr>
              </thead>
              <tbody>
                {modalcreditref.map((data, i) => {
                  const originalDate = new Date(data?.date);
                  const options = {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  };

                  const formattedDate = originalDate.toLocaleDateString(
                    "en-US",
                    options
                  );
                  return (
                    <tr key={data._id}>
                      <td>{i + 1}</td>

                      <td>{formattedDate}</td>
                      <td>{data.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h3 className="text-center">No Data Found</h3>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalCreditRef}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModalCreditRef}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Credit Ref View */}
      <Modal
        show={showModalPartnership}
        onHide={handleCloseModalPartnership}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {modalPartnership.length > 0 ? (
            <table className="table lms_table_active3 table-bordered table-sm">
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Date</th>
                  <th>PartnerShip Amount</th>
                </tr>
              </thead>
              <tbody>
                {modalPartnership.map((data, i) => {
                  const originalDate = new Date(data?.date);
                  const options = {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  };

                  const formattedDate = originalDate.toLocaleDateString(
                    "en-US",
                    options
                  );
                  return (
                    <tr key={data._id}>
                      <td>{i + 1}</td>

                      <td>{formattedDate}</td>
                      <td>{data.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h3 className="text-center">No Data Found</h3>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalPartnership}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModalPartnership}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HierarchyPageView;
