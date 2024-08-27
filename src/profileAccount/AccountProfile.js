import React, { useState } from "react";
import EditIcon from "../Assets/EditIcon.png";

import { Modal, Button } from "react-bootstrap";
import ResetModal from "./ResetModal";
import { useAppContext } from "../contextApi/context";


const AccountProfile = ({ props, UserName, createdByUser }) => {
  const { store } = useAppContext();
  console.log("store----->", store)
  const [passtoggle, setPassToggle] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [isHovered, setIsHovered] = useState(false);
  const [showPasChange, setShowPasChange] = useState(false);

  const handleShowPasChange = () => setShowPasChange(true);
  const handleClosePasChange = () => setShowPasChange(false);


  const handleshowPasChange = () => setShowPasChange(true);
  console.log("Im here in the Line no.10 of profile", UserName);
  // const auth = useAuth();

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
          {createdByUser && store?.admin?.id === createdByUser &&
            <li class="list-group-item p-3">
              <b style={{ color: "#1c3763" }}>Password : </b>
              <b>********</b>{" "}
              <img
                src={EditIcon}
                style={{ width: isHovered ? "25px" : "20px" }}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
                alt="Edit Icon"
                title="Change Password"
                onClick={handleShowPasChange}
              />
            </li>}
        </ul>
      </div>
      {console.log("idadmin", store.admin.id === createdByUser)}

      {createdByUser && store?.admin?.id === createdByUser &&
      <ResetModal show={showPasChange} handleClose={handleClosePasChange} userName={UserName} />}
      {/* card end */}
      {/* Modal Change Password */}

    </div>
  );
};

export default AccountProfile;
