import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountServices from "../../Services/AccountServices";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { Modal, Button } from "react-bootstrap";

const ViewExistingUserRole = ({ Status }) => {
  const auth = useAuth();
  const [viewUser, setViewUser] = useState([]);
  //pagination usestate
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [totalEntries, setTotalEntries] = useState(5);
  const [totalData, setTotalData] = useState(0);
  const [name, setName] = useState("");
  const [Istatus, setIStatus] = useState("");
  const [props, setProps] = useState({
    userId: "",
    userName: "",
    userRole: "",
    status:"",
  });
  const [showModalActiveInactive, setShowModalActiveInactive] = useState(false);
  const [active, setActive] = useState(true);
  const [btncolor1, setBtncolor1] = useState(false);
  const [btncolor2, setBtncolor2] = useState(false);
  const [btncolor3, setBtncolor3] = useState(false);
  const [data, setData] = useState(0);
  const [lock, setLock] = useState(true);
  const [statusSubmitted, setStatusSubmitted] = useState(false);
  const [activeStatus, setActiveStatus] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [previousState, setPreviousState] = useState({});
  const [password, setPassword] = useState("");
  console.log("first", props.userId)
  useEffect(() => {
    if (!props.userId === "") {
      AccountServices.getActiveStatus(props.userId, auth.user).then((res) => {
        setActiveStatus(res.data);
      });
    }
  }, [props.userId, auth.user]);

  const FunCloseModalActiveInactive = () => {
    setShowModalActiveInactive(false);
  };

  const handleprops = (user) => {
    setShowModalActiveInactive(true);
    setProps({
      userId: user.id,
      userName: user.userName,
      userRole: user.roles[0].role,
      status: user.Status
    });
  };
  console.log("propstesting=>>", props.userRole);

  useEffect(() => {
    AccountServices.getViewSubUserRole(
      auth.user.id,
      currentPage,
      name,
      totalEntries,
      auth.user
    ).then((res) => {
      console.log("============> data sending ", res.data);
      setViewUser(res.data);
      setTotalPages(res.data.totalPages);
      setTotalData(res.data.totalCount);
    });
  }, [totalEntries, currentPage, auth, name]);
  console.log("=========> view User", viewUser);
  let startIndex = Math.min((currentPage - 1) * totalEntries + 1);
  let endIndex = Math.min(currentPage * totalEntries, totalData);

  const handlePageChange = (page) => {
    console.log("Changing to page:", page);

    setCurrentPage(page);
    // setIsLoading(false);
  };
  console.log("=========> option Menu", totalEntries);

  const handleStatusChange = (newStatus) => {
    setIStatus(newStatus);
  };

  const handleActiveChange = () => {
    setActive(true);
    setIsClicked(true);
    setBtncolor1(true);
    setBtncolor2(false);
    setBtncolor3(false);

    setData(1);
  };

  const handleInactiveChange = () => {
    setActive(false);
    setIsClicked(true);
    setBtncolor2(true);
    setBtncolor1(false);
    setBtncolor3(false);
    setLock(true);
    setData(2);
  };

  const handleLockChange = () => {
    setLock(false);
    setIsClicked(true);
    setData(3);
    setActive(false);
    setBtncolor3(true);
    setBtncolor1(false);
    setBtncolor2(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // setStatusSubmitted(true);
    if (isClicked) {
      const data = {
        isActive: active,
        locked: lock,
        password: password,
        // previousState: previousState,
      };

      AccountServices.ActiveInactive(
        data,
        props.userId,
        auth.user,
        data.isActive,
        data.locked
      )
        .then((res) => {
          // alert(res.data.message);
          window.location.reload();
        })
        .catch((err) => {
          // console.error(err);

          alert(err.response.data.message);
          return;
        });
    } else {
      alert("Please Select any Status to continue");
      return;
    }
  };

  return (
    <div className="main_content_iner ">
      <div className="container-fluid p-0">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="white_card card_height_100 mb_30">
              <div className="white_card_header">
                <div className="box_header m-0">
                  <div className="main-title">
                    <h3 className="m-0">List of User Roles</h3>
                  </div>
                </div>
              </div>
              <div className="white_card_body">
                <div className="QA_section">
                  <div className="white_box_tittle list_header">
                    <h4></h4>
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
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                                type="text"
                                placeholder="Search content here..."
                              />
                            </div>
                            <button type="submit">
                              {" "}
                              <i class="ti-search"></i>{" "}
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="QA_table mb_30">
                    {/* table-responsive */}
                    <table className="table lms_table_active3 ">
                      <thead>
                        <tr>
                          <th scope="col">Serial Number</th>
                          <th scope="col">Name</th>
                          <th scope="col">Detail</th>
                          <th scope="col">Status</th>
                          <th scope="col">Change Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewUser.data &&
                          viewUser.data.map((user, index) => (
                            <tr key={user._id}>
                              <th scope="row">{index + 1}</th>
                              <td>{user.userName}</td>

                              <td>
                                <Link to={`/SingleExistingRoles/${user.id}`}>
                                  <button className="btn btn-sm btn-success">
                                    Go To
                                  </button>
                                </Link>
                              </td>
                              <td></td>
                              <td>
                                <span className="mx-1">
                                  <button
                                    className={`btn border border-2 rounded ${auth.user.roles[0].permission.some(
                                      (role) => role === "Status"
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
                                    title="Setting"
                                    type="button"
                                    onClick={() => {
                                      handleprops(user);
                                    }}
                                  >
                                    <i className="fa-thin fas fa-gear"></i>
                                  </button>
                                </span>
                              </td>
                            </tr>
                          ))}
                        {/* <tr>
                      <th scope="row"> <a href="#" className="question_content"> title here 1</a></th>
                      <td>Category name</td>                     
                      <td><a href="#" className="status_btn">Active</a></td>
                    </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          startIndex={startIndex}
          endIndex={endIndex}
          totalData={totalData}
        />

        {/* Modal */}

        <Modal
          show={showModalActiveInactive}
          onHide={FunCloseModalActiveInactive}
          centered
        >
          <Modal.Header closeButton>
            {/* <Modal.Title>Modal 1 Title</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-between mb-3">
              <div>
                <span style={{ fontWeight: "bold" }}>{props.userRole}</span>
                <br />
                <span>{props.userName}</span>
              </div>
              <span style={{ fontWeight: "bold" }}>{props.status}</span> 
            </div>
            <div className="modal-body d-flex justify-content-between">
              <button
                className={`btn ${btncolor1 ? "btn-success" : "btn btn-outline-success"
                  }`}
                disabled={props.status === "Active"}
                onClick={handleActiveChange}
                style={{ width: "33.33%", marginRight: "2%" }}
              >
                <i class="fas fa-check-circle mb-1" /> <br />
                <span>Active</span>
              </button>
              <button
                className={`btn ${btncolor2 ? "btn-danger" : "btn-outline-danger"
                  }`}
                onClick={handleInactiveChange}
                disabled={props.status === "Suspended"}
                style={{ width: "calc(33.33% - 6px)" }}
              >
                <i class="fas fa-ban mb-1" /> <br />
                <span>Suspended</span>
              </button>
              <button
                className={`btn ${btncolor3 ? "btn-secondary" : "btn btn-outline-secondary mx-2"
                  }`}
                onClick={handleLockChange}
                disabled={props.status === "Locked"}
                style={{ width: "calc(33.33% - 8px)" }}
              >
                <i class="fas fa-lock mb-1" /> <br />
                <span>Lock</span>
              </button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <p className="font-weight-bold">Password:</p>
            <input
              type="password"
              className="form-control w-50"
              placeholder="Type here..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button variant="primary" onClick={handleSubmit}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ViewExistingUserRole;
