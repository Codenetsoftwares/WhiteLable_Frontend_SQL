import React, { useState } from "react";
import { useAuth } from "../../Utils/Auth";
import TransactionServices from "../../Services/TransactionServices";
import { toast } from "react-toastify";

const EditCreditRefBalance = ({ userId, username, userRole }) => {
  console.log('=======> line 7',userId)
  const auth = useAuth();

  const [Amount, SetAmount] = useState(0);
  const [password, setPassword] = useState("");

  const id = auth.user.id;
  const handleAmtChange = (e) => {
    SetAmount(e.target.value);
  };
  const handleReset = () => {
    SetAmount(0);
  };

  const handelPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Amount === 0 || Amount < 0) {
      if (Amount < 0) {
        toast.error("Amount can not be negetive");
        return;
      }
      toast.error("Amount fields cannot be empty.");
      return;
    }
    const data = {
      creditRef: Number(Amount),
      password: password,
    };

    TransactionServices.EditCreditref(data, userId, auth.user)
      .then((res) => {
        // console.log(response.data);
        if (res.status === 200) {
          alert("Sucessfully Edit CreditRef");
          window.location.reload();
        }
      })
      .catch((error) => {
        alert(error.response.data.error);
        window.location.reload();
      });
  };
  return (
    <div
      className="modal fade"
      id={`EditCreditRefBalance-${userId}`}
      tabIndex="-1"
      aria-labelledby={`EditCreditRefBalance-${userId}`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
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
            <h5 className="modal-title text-white">Provide Edit Credit ref. Amount</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleReset}
            ></button>
          </div>
          <div className="modal-body">
            <div className="my-2">
              <span style={{ fontWeight: "bold" }}>{userRole}</span>
              <br />
              <span>{username}</span>
            </div>
            <form>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    Enter Amount:
                  </span>
                </div>

                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  onChange={handleAmtChange}
                  value={Amount}
                />
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Password *"
                onChange={handelPassword}
                value={password}
                required
              />
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleReset}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCreditRefBalance;
