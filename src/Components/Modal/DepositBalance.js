import React, { useState } from "react";
import { useAuth } from "../../Utils/Auth";
import TransactionServices from "../../Services/TransactionServices";
import { toast } from "react-toastify";

const DepositBalance = () => {
  const auth = useAuth();
  const [Amount, SetAmount] = useState(0);
  const id = auth.user.id;
  const handelamtchange = (e) => {
    SetAmount(e.target.value);
  };
  const handleReset = () => {
    SetAmount(0);
  };
  const handelsubmit = (e) => {
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
      depositeAmount: Number(Amount),
    };

    console.log("data", data);
    TransactionServices.depositAmount(data, id, auth.user)
      .then((res) => {
        if (res.status === 200) {
        toast.success(res.data.message);
          window.location.reload();
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
        // alert.error("e.message");
      });
  };
  return (
    <div
      className="modal fade"
      id="depositBalance"
      role="dialog"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
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
              id="depositBalanceModal"
              style={{ fontWeight: "bold", color: "white" }}
            >
              Deposit
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleReset}
            ></button>
          </div>
          <div
            classNameName="modal-body"
            style={{
              width: "200px",
              height: "100px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <form>
              <div classNameName="input-group mb-3">
                <div classNameName="input-group-prepend">
                  <span classNameName="input-group-text">
                    <small style={{ fontWeight: "bold", marginLeft: "5px"  }}>
                      Transaction By: {auth.user.userName}{" "}
                    </small>
                  </span>
                </div>
                <label
                  htmlFor="amount"
                  style={{ fontWeight: "bold", marginLeft: "5px" }}
                >
                  Add Cash:
                </label>

                <input
                  type="number"
                  classNameName="form-control"
                  placeholder="Amount"
                  onChange={handelamtchange}
                  style={{ width: "100%",  marginLeft: "180px" }}
                    value={Amount}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handelsubmit}
            >
              Deposit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositBalance;
