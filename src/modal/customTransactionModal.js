import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateCreditRef } from "../Utils/service/apiService";

const CustomTransactionModal = (props) => {
  const [formData, setformData] = useState({
    amount: 0,
    password: "",
  });
  console.log("from modal=>>>>", props?.differentiate);
  console.log("from modal adminId=>>>>", props?.adminId);
  console.log("from modal adminName=>>>>", props?.adminName);
  console.log("from modal adminName=>>>>", props?.role);
  // Setting Modal Title
  let modalTitle = "";
  if (props.differentiate === "creditRefProvider") {
    modalTitle = "Provide Edit Credit ref. Amount";
  } else if (props.differentiate === "partnershipProvider") {
    modalTitle = "Provide Edit PartnerShip Amount";
  } else if (props.differentiate === "walletAmountProvider") {
    modalTitle = "Provide Transfer Amount";
  } else if (props.differentiate === "addCashProvider") {
    modalTitle = "Add Cash";
  }

  async function handelSave() {
    console.log("formData", formData);
    const data = {
      creditRef: formData.amount,
      password: formData.password,
    };
    const response = await updateCreditRef({
      id: props?.adminId,
      data: data,
    },true);
    if (response) {
      props.onHide();
      console.log(response);
    }
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{
          height: "5px",
          backgroundColor: "#006699",
          color: "white",
        }}
      >
        <Modal.Title className="fs-6">{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="my-2">
          <span style={{ fontWeight: "bold", color: "#6ae635" }}>
            {props?.role}
          </span>
          <br />
          <span>{props?.adminName}</span>
        </div>
        <form>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Enter Amount</span>
            </div>
            <input
              type="number"
              className="form-control"
              placeholder="Amount *"
              onChange={(e) =>
                setformData({
                  ...formData,
                  amount: Number(e.target.value),
                })
              }
            />
          </div>
          <input
            type="password"
            className="form-control"
            placeholder="Password *"
            onChange={(e) =>
              setformData({
                ...formData,
                password: e.target.value,
              })
            }
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props?.onHide} variant="secondary">
          Close
        </Button>
        <Button onClick={handelSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomTransactionModal;
