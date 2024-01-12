import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Utils/Auth";
import AccountServices from "../../Services/AccountServices";
import { toast } from "react-toastify";
// import { Modal, Button } from "react-bootstrap";
// import Pagination from "../Pagination";

const SingleExistingUserRoleView = () => {
  const [singleHierarchydata, setSinglehierarchyData] = useState([]);
  const [permission, setPermission] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [displayEdit, setDisplayEdit] = useState(true);

  const Navigate = useNavigate();
  const auth = useAuth();
  const { id } = useParams();
  const [showModalPartnership, setShowModalPartnership] = useState(false);

  useEffect(() => {
    AccountServices.getSingleViewSubUserRole(id, auth.user).then((res) => {
      setSinglehierarchyData(res.data);
      setPermission(res.data.roles[0].permission);
    });
  }, [id, auth]);

  const setData = () => {
    setCheckedItems(permission);
  };
  const handleShowModalPartnership = (partnership) => {
    setShowModalPartnership(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkedItems.length === 0) {
      toast.error("Please Select At Least One Permission To Renew.");
      return;
    }
     // Check if permissions are not updated
  if (JSON.stringify(checkedItems) === JSON.stringify(permission)) {
    toast.error("Permissions Are Not Updated.");
    return;
  }
    const data = {
      permission: checkedItems,
    };
    AccountServices.RenewPermission(id, auth.user, data)
      .then((res) => {
        toast.success(res.data);
        Navigate("/ExistingRoles");
      })
      .catch((error) => {
       console.log('==========>SINGL EXISTING',error)
      });
    console.log(checkedItems);
  };

  const handleChange = () => {
    console.log("first");
    setDisplayEdit(false);
    setData();
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setCheckedItems((prevCheckedItems) => [...prevCheckedItems, value]);
    } else {
      setCheckedItems((prevCheckedItems) =>
        prevCheckedItems.filter((item) => item !== value)
      );
    }
  };
  const handleCloseModalPartnership = () => setShowModalPartnership(false);

  console.log("==========>SingleData", singleHierarchydata);
  return (
    <>
      {displayEdit ? (
        <div className="main_content_iner ">
          <div className="container-fluid p-0">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="white_card card_height_100 mb_30">
                  <div className="white_card_header">
                    <div className="box_header m-0">
                      <div className="main-title">
                        <h3 className="m-0">PERMISSION DETAILS</h3>
                      </div>
                    </div>
                  </div>
                  <div className="white_card_body">
                    <div className="QA_section">
                      <div className="white_box_tittle list_header">
                        <h4>Username: {singleHierarchydata?.userName}</h4>
                      </div>
                      <div className="QA_table mb_30">
                        <table className="table lms_table_active3 ">
                          <thead>
                            <tr>
                              <th scope="col">PERMISSIONS ACCESSED</th>
                            </tr>
                          </thead>
                          <tbody>
                            {permission &&
                              permission.map((user, index) => (
                                <tr key={user._id}>
                                  <th>{user}</th>
                                </tr>
                              ))}
                          </tbody>
                          <button
                            className="btn btn-info"
                            onClick={handleChange}
                          >
                            Renew permission
                          </button>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <Modal
        show={showModalPartnership}
        onHide={handleCloseModalPartnership}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalPartnership}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModalPartnership}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal> */}
        </div>
      ) : (
        <div>
          <form>
            <div className="card" style={{ backgroundColor: "" }}>
              <div
                className="card-header d-flex justify-content-between align-items-center"
                // style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
              >
                <h1
                  className="h4 card-title mb-0"
                  style={{ fontWeight: "bold", margin: "auto" }}
                >
                  Renew The Permissions
                </h1>
                <div className="white_box_tittle list_header text-end" style={{ display: "flex", flexDirection: "column" }}>
                  <span>Username: {singleHierarchydata?.userName}</span>
                  {/* <br /> */}
                  <span>Role:{singleHierarchydata?.roles[0].role}</span>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-1 input-group-lg">
                  <label>
                    <input
                      type="checkbox"
                      value="TransferBalance"
                      checked={checkedItems.includes("TransferBalance")}
                      onChange={handleCheckboxChange}
                    />
                    <span className="my-1">TransferBalance</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Status"
                      checked={checkedItems.includes("Status")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Status</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="CreditRef-Edit"
                      checked={checkedItems.includes("CreditRef-Edit")}
                      onChange={handleCheckboxChange}
                    />
                    <span>CreditRef-Edit</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Bank-View"
                      checked={checkedItems.includes("Bank-View")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Bank View</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Partnership-Edit"
                      checked={checkedItems.includes("Partnership-Edit")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Partnership-Edit</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="CreditRef-View"
                      checked={checkedItems.includes("CreditRef-View")}
                      onChange={handleCheckboxChange}
                    />
                    <span>CreditRef-View</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Partnership-View"
                      checked={checkedItems.includes("Partnership-View")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Partnership-View</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="User-Profile-View"
                      checked={checkedItems.includes("User-Profile-View")}
                      onChange={handleCheckboxChange}
                    />
                    <span>User-Profile-View</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Profile-View"
                      checked={checkedItems.includes("Profile-View")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Profile-View</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="View-Admin-Data"
                      checked={checkedItems.includes("View-Admin-Data")}
                      onChange={handleCheckboxChange}
                    />
                    <span>View-Admin-Data</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Create-Admin"
                      checked={checkedItems.includes("Create-Admin")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Create-Admin</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="AccountStatement"
                      checked={checkedItems.includes("AccountStatement")}
                      onChange={handleCheckboxChange}
                    />
                    <span>IAccountStatement</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Create-User"
                      checked={checkedItems.includes("Create-User")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Create User</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="ActivityLog"
                      checked={checkedItems.includes("ActivityLog")}
                      onChange={handleCheckboxChange}
                    />
                    <span>ActivityLog</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Delete-Admin"
                      checked={checkedItems.includes("Delete-Admin")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Delete-Admin</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Restore-Admin"
                      checked={checkedItems.includes("Restore-Admin")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Restore-Admin</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Move-To-Trash"
                      checked={checkedItems.includes("Move-To-Trash")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Move-To-Trash</span>
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="Trash-View"
                      checked={checkedItems.includes("Trash-View")}
                      onChange={handleCheckboxChange}
                    />
                    <span>Trash-View</span>
                  </label>
                </div>
              </div>
              <div className="card-footer">
                <div className="col-12 text-end">
                  <button
                    onClick={handleSubmit}
                    className="btn btn-primary mb-0"
                  >
                    Save
                  </button>
                </div>
                <div></div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SingleExistingUserRoleView;
