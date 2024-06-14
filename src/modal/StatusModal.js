/* eslint-disable jsx-a11y/heading-has-content */
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const StatusModal = ({ show, handleClose, statusId, name, userRole, onStatusChange, setUser }) => {
    console.log('name',name)
  const [active, setActive] = useState(true);
  const [btncolor1, setBtncolor1] = useState(false);
  const [btncolor2, setBtncolor2] = useState(false);
  const [btncolor3, setBtncolor3] = useState(false);
  const [lock, setLock] = useState(true);
  const [password, setPassword] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const handleActiveChange = () => {
    setActive(true);
    setIsClicked(true);
    setBtncolor1(true);
    setBtncolor2(false);
    setBtncolor3(false);
  };

  const handleInactiveChange = () => {
    setActive(false);
    setIsClicked(true);
    setBtncolor2(true);
    setBtncolor1(false);
    setBtncolor3(false);
    setLock(true);
  };

  const handleLockChange = () => {
    setLock(false);
    setIsClicked(true);
    setBtncolor3(true);
    setBtncolor1(false);
    setBtncolor2(false);
  };

  const handleSubmit = () => {
    if (isClicked) {
      // Simulating API call or any async operation
      setTimeout(() => {
        // Example of handling the status change locally
        let status = '';
        if (active && lock) {
          status = 'Active';
        } else if (!active && lock) {
          status = 'Suspended';
        } else if (!active && !lock) {
          status = 'Locked';
        }
        onStatusChange(status);
        handleClose();
      }, 1000); // Simulating a delay
    } else {
      alert('Please select any status to continue');
    }
  };

  return (
    <div
    className="modal fade"
    tabIndex="-1"
    role="dialog"
    id={`activeInactive-${statusId}`}
    aria-labelledby={`activeInactive-${statusId}`}
    style={{ display: "none" }}
  >
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div
          className="modal-header"
          style={{
            height: "10px",
            backgroundColor: "#006699",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <h5
            className="modal-title"
            id="exampleModalLabel"
            style={{ fontWeight: "bold", color: "white" }}
          >
            CHANGE STATUS
          </h5>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <div className="d-flex justify-content-between mb-3">
            <div>
              <span style={{ fontWeight: "bold" }}>userRole</span>
              <br />
              <span>name</span>
            </div>
            <span style={{ fontWeight: "bold" }}>status</span>
          </div>
          <div className="modal-body d-flex justify-content-between">
            <button
              className={`btn ${
                btncolor1 ? "btn-success" : "btn btn-outline-success"
              }`}
            //   disabled={activeStatus.Status === "Active"}
              onClick={handleActiveChange}
              style={{ width: "33.33%", marginRight: "2%" }}
            >
              <i class="fas fa-check-circle mb-1" /> <br />
              <span>Active</span>
            </button>
            <button
              className={`btn ${
                btncolor2 ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={handleInactiveChange}
            //   disabled={activeStatus.Status === "Suspended"}
              style={{ width: "calc(33.33% - 6px)" }}
            >
              <i class="fas fa-ban mb-1" /> <br />
              <span>Suspended</span>
            </button>
            <button
              className={`btn ${
                btncolor3 ? "btn-secondary" : "btn btn-outline-secondary mx-2"
              }`}
              onClick={handleLockChange}
            //   disabled={activeStatus.Status === "Locked"}
              style={{ width: "calc(33.33% - 8px)" }}
            >
              <i class="fas fa-lock mb-1" /> <br />
              <span>Lock</span>
            </button>
          </div>
        </div>
        <div className="modal-footer">
          <input
            type="password"
            className="form-control mr-2"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "40%" }}
          />
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
            style={{ width: "50%" }}
          >
            Change
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default StatusModal;
