import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const StatusModal = ({
  show,
  handleClose,
  statusId,
  name,
  userRole,
  onStatusChange,
  setUser,
}) => {
  const [active, setActive] = useState(true);
  const [btncolor1, setBtncolor1] = useState(false);
  const [btncolor2, setBtncolor2] = useState(false);
  const [btncolor3, setBtncolor3] = useState(false);
  const [lock, setLock] = useState(true);
  const [password, setPassword] = useState("");
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
        let status = "";
        if (active && lock) {
          status = "Active";
        } else if (!active && lock) {
          status = "Suspended";
        } else if (!active && !lock) {
          status = "Locked";
        }
        onStatusChange(status);
        handleClose();
      }, 1000); // Simulating a delay
    } else {
      alert("Please select any status to continue");
    }
  };

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header
        style={{
          height: "5px",
          backgroundColor: "#006699",
          color: "white",
        }}
        closeButton
      >
        <Modal.Title className="fs-6">CHANGE STATUS</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex justify-content-between mb-3">
          <div>
            <span style={{ fontWeight: "bold" }}>{userRole}</span>
            <br />
            <span>{name}</span>
          </div>
          <span style={{ fontWeight: "bold" }}>
            {active && lock
              ? "Active"
              : !active && lock
              ? "Suspended"
              : "Locked"}
          </span>
        </div>
        <div className="modal-body d-flex justify-content-between">
          <Button
            variant={btncolor1 ? "success" : "outline-success"}
            onClick={handleActiveChange}
            style={{ width: "33.33%", marginRight: "2%" }}
          >
            <i class="fas fa-check-circle mb-1" /> <br />
            <span>Active</span>
          </Button>
          <Button
            variant={btncolor2 ? "danger" : "outline-danger"}
            onClick={handleInactiveChange}
            style={{ width: "calc(33.33% - 6px)" }}
          >
            <i class="fas fa-ban mb-1" /> <br />
            <span>Suspended</span>
          </Button>
          <Button
            variant={btncolor3 ? "secondary" : "outline-secondary"}
            onClick={handleLockChange}
            style={{ width: "calc(33.33% - 8px)" }}
          >
            <i class="fas fa-lock mb-1" /> <br />
            <span>Lock</span>
          </Button>Z
        </div>
      </Modal.Body>
      <Modal.Footer>
        <input
          type="password"
          className="form-control mr-2"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "40%" }}
        />
        <Button
          variant="primary"
          onClick={handleSubmit}
          style={{ width: "50%" }}
        >
          Change
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StatusModal;
