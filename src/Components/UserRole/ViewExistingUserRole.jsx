import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountServices from "../../Services/AccountServices";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Pagination from "../Pagination";

const ViewExistingUserRole = () => {
  const auth = useAuth();
  const [viewUser, setViewUser] = useState([]);
   //pagination usestate
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState();
   const [totalEntries, setTotalEntries] = useState(5);
   const [totalData, setTotalData] = useState(0);
   const [name, setName] = useState("");

  useEffect(() => {
    AccountServices.getViewSubUserRole(auth.user.id,currentPage, name, totalEntries, auth.user ).then((res) => {
      console.log("============> data sending ",res.data)
      setViewUser(res.data);
      setTotalPages(res.data.totalPages);
      setTotalData(res.data.totalCount);
    });
  }, [totalEntries, currentPage, auth,name]);
  console.log("=========> view User", viewUser);
  let startIndex = Math.min((currentPage - 1) * totalEntries + 1);
  let endIndex = Math.min(currentPage * totalEntries, totalData);

  const handlePageChange = (page) => {
    console.log("Changing to page:", page);

    setCurrentPage(page);
    // setIsLoading(false);
  };
  console.log("=========> option Menu", totalEntries);

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
                        </tr>
                      </thead>
                      <tbody>
                        {viewUser.data &&
                          viewUser.data.map((user, index) => (
                            <tr key={user._id}>
                              <th scope="row">{index + 1}</th>
                              <td>{user.userName}</td>

                              <td>
                                <Link
                                  to={`/SingleExistingRoles/${user._id}`}
                                >
                                  <button className="btn btn-sm btn-success">Go To</button>
                                </Link>
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
      </div>
    </div>
  );
};

export default ViewExistingUserRole;
