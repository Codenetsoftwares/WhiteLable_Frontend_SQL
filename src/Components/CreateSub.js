import React, { useState } from "react";
import { useAuth } from "../Utils/Auth";
import AccountServices from "../Services/AccountServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
const CreateSub = () => {
  const auth = useAuth();
  // const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const roles = [
    "TransferBalance",
    "Status",
    "CreditRef-Edit",
    "Partnership-Edit",
    "CreditRef-View",
    "Partnership-View",
    "User-Profile-View",
    "Profile-View",
    "Create-Admin",
    "Create-User",
    "AccountStatement",
    "ActivityLog",
    "Delete-Admin",
    "Restore-Admin",
    "Move-To-Trash",
    "Trash-View",
  ];
  const [permissions, setPermissions] = useState(
    roles.reduce((acc, role) => {
      acc[role] = false;
      return acc;
    }, {})
  );
  const handleCheckboxChange = (permission) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(permission)
        ? prevCheckedItems.filter((item) => item !== permission)
        : [...prevCheckedItems, permission]
    );
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [permission]: !prevPermissions[permission],
    }));
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleAddSubAgentClick = (e) => {
    // Check if username and password are not blank
    if (!username || !password) {
      toast.error("Username And Password With Permissions Are Required");
      return;
    }

    // Check if permission array has at least one item
    if (checkedItems.length === 0) {
      toast.error("At Least One Permission Is Required");
      return;
    }
    e.preventDefault();
    const data = {
      userName: username,
      password: password,
      permission: checkedItems,
    };
    console.log(data);
    AccountServices.SubCreate(data, auth.user)
      .then((response) => {
        console.log("============>>>>RES", response.data);
        alert("Sub-Admin created successfully");
        // auth.login();
        //     navigate("/welcome");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed! Invalid Data");
      });
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div
              className="card-header text-white p-1"
              style={{ backgroundColor: "#26416e", textAlign: "center" }}
            >
              <b className="mb-0">CREATE USER ROLE</b>
            </div>

           

            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className="form-label"
                    style={{ fontWeight: "bold" }}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    placeholder="Enter Username"
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="form-label"
                    style={{ fontWeight: "bold" }}
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="mb-3">
                  <div className="card bg-dark text-white">
                    <h5
                      className="card bg-dark text-white"
                      style={{ textAlign: "center" }}
                    >
                      PERMISSIONS :
                    </h5>

                    <div className="card-body">
                      {Object.keys(permissions).map((permission) => (
                        <div
                          key={permission}
                          className="form-check form-check-inline"
                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={permission}
                            checked={checkedItems.includes(permission)}
                            onChange={() => handleCheckboxChange(permission)}
                          />
                          <label
                            htmlFor={permission}
                            className="form-check-label"
                          >
                            {permission}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* <div class="col-12">
                  <div class="create_report_btn mt_30">
                    <a
                      href="#"
                      class="btn_1 radius_btn d-block text-center"
                      onClick={handleAddSubAgentClick}
                    >
                      Add User Role
                    </a>
                  </div>
                </div> */}

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleAddSubAgentClick}
                  >
                    Add User Role
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <>
    //   <div className="d-flex justify-content-center container mt-5 pt-5">
    //     <div class="row ">
    //       <div class="col-12">
    //         <div class="white_card card_height_100 mb_30">
    //           <div class="white_card_header">
    //             <div class="box_header m-0">
    //               <div class="main-title">
    //                 <h3 class="m-0">Add New User Role</h3>
    //               </div>
    //             </div>
    //           </div>
    //           <div class="white_card_body">
    //             <div class="row">
    //               <div class="col-lg-6">
    //                 <div class="common_input mb_15">
    //                   <input
    //                     type="text"
    //                     className="form-control"
    //                     id="username"
    //                     value={username}
    //                     placeholder="Enter Username"
    //                     onChange={handleUsernameChange}
    //                   />
    //                 </div>
    //               </div>
    //               <div class="col-lg-6">
    //                 <div class="common_input mb_15">
    //                   <input
    //                     type="text"
    //                     className="form-control"
    //                     id="password"
    //                     value={password}
    //                     placeholder="Enter Password"
    //                     onChange={handlePasswordChange}
    //                   />
    //                 </div>
    //               </div>
    //               <div className="mb-3">
    //                 <div className="card text-dark">
    //                   <h5
    //                     className="card  text-dark"
    //                     style={{ textAlign: "center" }}
    //                   >
    //                     PERMISSIONS
    //                   </h5>
    //                   <div className="card-body ">
    //                     {Object.keys(permissions).map((permission) => (
    //                       <div
    //                         key={permission}
    //                         className="form-check form-check-inline"
    //                       >
    //                         <input
    //                           type="checkbox"
    //                           className="form-check-input"
    //                           id={permission}
    //                           checked={checkedItems.includes(permission)}
    //                           onChange={() => handleCheckboxChange(permission)}
    //                         />
    //                         <label
    //                           htmlFor={permission}
    //                           className="form-check-label"
    //                         >
    //                           {permission}
    //                         </label>
    //                       </div>
    //                     ))}
    //                   </div>
    //                 </div>
    //               </div>
    //               <div class="col-12">
    //                 <div class="create_report_btn mt_30">
    //                   <a
    //                     href="#"
    //                     class="btn_1 radius_btn d-block text-center"
    //                     onClick={handleAddSubAgentClick}
    //                   >
    //                     Add User Role
    //                   </a>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};
export default CreateSub;
