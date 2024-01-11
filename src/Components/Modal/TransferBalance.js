import React, { useState } from "react";
import { useAuth } from "../../Utils/Auth";
import { toast } from "react-toastify";
import TransactionServices from "../../Services/TransactionServices";
const TransferBalance = ({ userId, username, userRole }) => {
  const auth = useAuth();
  const [Amount, setAmount] = useState(0);
  const [Remarks, SetRemarks] = useState("");
  const [password, setPassword] = useState("");

  const handleAmtChange = (e) => {
    setAmount(e.target.value);
  };
  const handleReset = () => {
    setAmount(0);
    setPassword("");
    SetRemarks("");
  };

  const handelRemarkschange = (e) => {
    SetRemarks(e.target.value);
  };

  const handelPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e, type) => {
    e.preventDefault();
    if (Amount === 0 || Remarks === "" || password === "" || Amount < 0) {
      if (Amount < 0) {
        toast.error("Amount Cannot Be Negative");
        return;
      }
      toast.error(" Fields Cannot Be Empty.");
      return;
    }
    try {
      let data;
      if (type === "deposit") {
        data = {
          trnsfAmnt: Number(Amount),
          receiveUserId: userId,
          remarks: Remarks,
          password: password,
        };
      } else {
        data = {
          withdrawlAmt: Number(Amount),
          receiveUserId: userId,
          remarks: Remarks,
          password: password,
        };
      }

      TransactionServices.transferBalance(auth.user.id, data, auth.user)
        .then((res) => {
          if (res.status === 200) {
            alert(res.data.message);
            window.location.reload();
          }
        })
        .catch((error) => {
          alert(error.response.data.message);
          handleReset();
        });
    } catch (error) {
      console.error("Error:", error);
      window.location.reload();
    }
  };
  return (
    <div
      className="modal fade"
      id={`transferbalance-${userId}`}
      tabIndex="-1"
      aria-labelledby={`transferbalance-${userId}`}
      aria-hidden="true"
      role="dialog"
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
            <h5 className="modal-title text-white">Amount</h5>
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
                <span className="input-group-text">
                  Enter Amount:
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  onChange={handleAmtChange}
                  value={Amount}
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Remarks *"
                  onChange={handelRemarkschange}
                  value={Remarks}
                  required
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
          {Amount > 0 && (
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  handleSubmit(e, "withdraw");
                }}
              >
                Withdraw
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={(e) => {
                  handleSubmit(e, "deposit");
                }}
              >
                Deposit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TransferBalance;
