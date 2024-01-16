import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import { toast } from "react-toastify";
import AccountServices from "../../Services/AccountServices";

const StatusModal = ({ statusId, username, userRole, onStatusChange }) => {
  const auth = useAuth();
  const [active, setActive] = useState(true);
  const [btncolor1, setBtncolor1] = useState(false);
  const [btncolor2, setBtncolor2] = useState(false);
  const [btncolor3, setBtncolor3] = useState(false);
  const [data, setData] = useState(0);
  const [lock, setLock] = useState(true);
  const [statusSubmitted, setStatusSubmitted] = useState(false);
  const [activeStatus, setActiveStatus] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [previousState, setPreviousState] = useState({});
  const [password, setPassword] = useState("");

  useEffect(() => {
    AccountServices.getActiveStatus(statusId, auth.user).then((res) => {
      setActiveStatus(res.data);
    });
  }, [statusId, auth.user]);

  const handleActiveChange = () => {
    setActive(true);
    setIsClicked(true);
    setBtncolor1(true);
    setBtncolor2(false);
    setBtncolor3(false);

    setData(1);
  };

  const handleInactiveChange = () => {
    setActive(false);
    setIsClicked(true);
    setBtncolor2(true);
    setBtncolor1(false);
    setBtncolor3(false);
    setLock(true);
    setData(2);
  };

  const handleLockChange = () => {
    setLock(false);
    setIsClicked(true);
    setData(3);
    setActive(false);
    setBtncolor3(true);
    setBtncolor1(false);
    setBtncolor2(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // setStatusSubmitted(true);
if(isClicked){
    const data = {
      isActive: active,
      locked: lock,
      password: password,
      // previousState: previousState,
    };

    AccountServices.ActiveInactive(
      data,
      statusId,
      auth.user,
      data.isActive,
      data.locked
    )
      .then((res) => {
        // alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        // console.error(err);

     toast.error(err.response.data.message);
        return;
      });
    }
    else{
      toast.error("Please Select any Status to continue");
      return;
    }
  };

  let status = "";

  if (activeStatus.isActive && activeStatus.locked) {
    status = "Active";
  } else if (!activeStatus.isActive && activeStatus.locked) {
    status = "Suspended";
  } else if (!activeStatus.isActive && !activeStatus.locked) {
    status = "Locked";
  }

  //  Call the onStatusChange function to pass the status back to the parent
  useEffect(() => {
    onStatusChange(status);
  }, [status, onStatusChange]);

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
                <span style={{ fontWeight: "bold" }}>{userRole}</span>
                <br />
                <span>{username}</span>
              </div>
              <span style={{ fontWeight: "bold" }}>{status}</span>
            </div>
            <div className="modal-body d-flex justify-content-between">
              <button
                className={`btn ${
                  btncolor1 ? "btn-success" : "btn btn-outline-success"
                }`}
                disabled={activeStatus.Status === "Active"}
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
                disabled={activeStatus.Status === "Suspended"}
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
                disabled={activeStatus.Status === "Locked"}
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
