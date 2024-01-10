import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountServices from "../../Services/AccountServices";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const ViewExistingUserRole = () => {
  const auth = useAuth();
  const [viewUser, setViewUser] = useState([]);

  useEffect(() => {
    AccountServices.getViewSubUserRole(auth.user.id, auth.user).then((res) => {
      setViewUser(res.data);
    });
  }, [auth]);
  console.log("=========> view User", viewUser);
  return (
    <div className="main_content_iner ">
      <div className="container-fluid p-0">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="white_card card_height_100 mb_30">
              <div className="white_card_header">
                <div className="box_header m-0">
                  <div className="main-title">
                    <h3 className="m-0">Data table 1</h3>
                  </div>
                </div>
              </div>
              <div className="white_card_body">
                <div className="QA_section">
                  <div className="white_box_tittle list_header">
                    <h4>shorting Arrow</h4>
                    <div className="box_right d-flex lms_block">
                      <div className="serach_field_2">
                        <div className="search_inner">
                          <form active="#">
                            <div className="search_field">
                              <input
                                type="text"
                                placeholder="Search content here..."
                              />
                            </div>
                            <button type="submit">
                              {" "}
                              <i className="ti-search" />{" "}
                            </button>
                          </form>
                        </div>
                      </div>
                      <div className="add_button ms-2">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#addcategory"
                          className="btn_1"
                        >
                          Add New
                        </a>
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
      </div>
    </div>
  );
};

export default ViewExistingUserRole;
