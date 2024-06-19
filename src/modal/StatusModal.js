import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { activeInactiveInitialState } from "../Utils/service/initiateState";

const StatusModal = ({
  show,
  handleClose,
  statusId,
  name,
  userRole,
  onStatusChange,
  setUser,
}) => {
  const [state, setState] = useState(activeInactiveInitialState());

  const handleActiveChange = () => {
    setState((prevState) => ({
      ...prevState,
      active: true,
      isClicked: true,
      btncolor1: true,
      btncolor2: false,
      btncolor3: false,
    }));
  };

  const handleInactiveChange = () => {
    setState((prevState) => ({
      ...prevState,
      active: false,
      isClicked: true,
      btncolor2: true,
      btncolor1: false,
      btncolor3: false,
      lock: true,
    }));
  };

  const handleLockChange = () => {
    setState((prevState) => ({
      ...prevState,
      lock: false,
      isClicked: true,
      btncolor3: true,
      btncolor1: false,
      btncolor2: false,
    }));
  };

  const handleSubmit = () => {
    if (state.isClicked) {
      setTimeout(() => {
        let status = "";
        if (state.active && state.lock) {
          status = "Active";
        } else if (!state.active && state.lock) {
          status = "Suspended";
        } else if (!state.active && !state.lock) {
          status = "Locked";
        }
        onStatusChange(status);
        handleClose();
      }, 1000);
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
            {state.active && state.lock
              ? "Active"
              : !state.active && state.lock
              ? "Suspended"
              : "Locked"}
          </span>
        </div>
        <div className="modal-body d-flex justify-content-between">
          <Button
            variant={state.btncolor1 ? "success" : "outline-success"}
            onClick={handleActiveChange}
            style={{ width: "33.33%", marginRight: "2%" }}
          >
            <i className="fas fa-check-circle mb-1" /> <br />
            <span>Active</span>
          </Button>
          <Button
            variant={state.btncolor2 ? "danger" : "outline-danger"}
            onClick={handleInactiveChange}
            style={{ width: "calc(33.33% - 6px)" }}
          >
            <i className="fas fa-ban mb-1" /> <br />
            <span>Suspended</span>
          </Button>
          <Button
            variant={state.btncolor3 ? "secondary" : "outline-secondary"}
            onClick={handleLockChange}
            style={{ width: "calc(33.33% - 8px)" }}
          >
            <i className="fas fa-lock mb-1" /> <br />
            <span>Lock</span>
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <input
          type="password"
          className="form-control mr-2"
          placeholder="Enter Password"
          value={state.password}
          onChange={(e) =>
            setState((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
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
