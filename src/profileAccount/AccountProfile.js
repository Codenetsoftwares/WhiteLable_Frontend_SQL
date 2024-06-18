import React, { useState } from "react";
// import EditIcon from "../../Assets/EditIcon.png";
// import MyAccountServices from "../../Services/MyAccountServices";
// import { useAuth } from "../../Utils/Auth";
import { Modal, Button } from "react-bootstrap";

const AccountProfile = ({ props, UserName }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [passtoggle, setPassToggle] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [showPasChange, setShowPasChange] = useState(false);

  const handleClosePasChange = () => {
    setShowPasChange(false);
    setNewPassword("");
    setConfirmPassword("");
    setOldPassword("");
  };
  const handleshowPasChange = () => setShowPasChange(true);
  console.log("Im here in the Line no.10 of profile", UserName);
//   const auth = useAuth();

//   const funChangePassword = () => {
//     console.log("funChangePassword clicked line 14");
//     if (newPassword && confirmPassword && oldPassword === "") {
//       alert("Fields Cann't be Empty");
//       return;
//     }
//     if (newPassword === confirmPassword) {
//       const data = {
//         userName: UserName,
//         oldPassword: oldPassword,
//         password: newPassword,
//       };
//       MyAccountServices.changePassword(data, auth.user)
//         .then((res) => {
//           alert("Password Changed Successfully");
//           window.location.reload();
//           // setPassToggle(false);
//         })

//         .catch((err) => {
//           alert(err.response.data.message);
//         });
//     } else {
//       alert("Password and confirm Password should be Same");
//     }
//   };

  const funShowPasswordChangeOption = () => {
    setPassToggle(false);
  };

  return (
    <div className="col-sm-8 mt-3">
      {/* card */}
      <div class="card w-100 rounded">
        <div
          class="card-heade text-white p-1"
          style={{ backgroundColor: "#26416e" }}
        >
          <b>&nbsp;&nbsp;Account Details</b>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item p-3">
            <b style={{ color: "#1c3763" }}>Name : </b> <b>{props.userName}</b>
          </li>
          <li class="list-group-item p-3">
            <b style={{ color: "#1c3763" }}>Currency : </b>{" "}
            <b>No Data From Serverside</b>
          </li>
          <li class="list-group-item p-3">
            <b style={{ color: "#1c3763" }}>Exposure Limit : </b>{" "}
            <b>No Data From Serverside</b>
          </li>
          <li class="list-group-item p-3">
            <b style={{ color: "#1c3763" }}>Mobile Number : </b>
            <b>No Data From Serverside</b>
          </li>

          <li class="list-group-item p-3">
            <b style={{ color: "#1c3763" }}>Password : </b>
            <b>********</b>{" "}
            <img
            //   src={EditIcon}
              style={{ width: isHovered ? "25px" : "20px" }}
              onMouseOver={() => setIsHovered(true)}
              onMouseOut={() => setIsHovered(false)}
              alt="Edit Icon"
              title="Change Password"
              onClick={handleshowPasChange}
            />
          </li>
        </ul>
      </div>
      {/* card end */}
      {/* Modal Change Password */}
      <Modal show={showPasChange} onHide={handleClosePasChange} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text w-100" id="basic-addon1">
                  Old Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="Type here...."
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text w-100" id="basic-addon1">
                  {" "}
                  New Pasword&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </div>
              <input
                type="password"
                class="form-control"
                placeholder="Type here...."
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text w-100" id="basic-addon1">
                  Confirm Password
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="Type here...."
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePasChange}>
            Back
          </Button>
          <Button variant="primary" 
        //   onClick={funChangePassword}
          >
            Change
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccountProfile;
