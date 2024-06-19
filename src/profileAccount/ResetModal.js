import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { resetAdminPassword_api } from '../Utils/service/apiService';

const ResetModal = ({ show, handleClose , userName }) => {
  
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function resetPassword() {
    console.log("resetPassword clicked");
    if (passwords.newPassword === "" || passwords.confirmPassword === "" || passwords.oldPassword === "") {
      alert("Fields can't be empty");
      return;
    }
    if (passwords.newPassword === passwords.confirmPassword) {
      const data = {
        userName: userName,
        oldPassword: passwords.oldPassword,
        password: passwords.newPassword,
      };
    
      const response = await resetAdminPassword_api(data);
      console.log(response);
    } else {
      alert("New Password and Confirm Password do not match");
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text w-100" id="basic-addon1">
                Old Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Type here...."
              aria-label="Old Password"
              aria-describedby="basic-addon1"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handleChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text w-100" id="basic-addon1">
                New Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Type here...."
              aria-label="New Password"
              aria-describedby="basic-addon1"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text w-100" id="basic-addon1">
                Confirm Password
              </span>
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="Type here...."
              aria-label="Confirm Password"
              aria-describedby="basic-addon1"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Back
        </Button>
        <Button variant="primary" onClick={resetPassword}>
          Change
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResetModal;
