import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contextApi/context";
import CustomTransactionModal from "../../modal/customTransactionModal";

const Card = ({
  role,
  adminId,
  userName,
  statusId,
  creditRef,
  balance,
  loadBalance,
  refProfitLoss,
  partnership,
  Status,
  creditRefLength,
  partnershipLength,
}) => {
  const { dispatch, store } = useAppContext();
  const [Istatus, setIStatus] = useState("");
  const [userid, setUserId] = useState("");
  //   const [adminId, setAdminId] = useState("");
  const [userhierarchy, setHierarchy] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [differentiate, setDifferentiate] = useState("");
  const navigate = useNavigate();
  console.log("userId", adminId);
  console.log("name&role", userName, role);

  console.log("store", store);

  const handelOpenTransactionModal = (
    boolParam,
    differentiateParam,
    adminIdParam
  ) => {
    setModalShow(boolParam);
    setDifferentiate(differentiateParam);
  };

  return (
    <React.Fragment>
      <tbody>
        <tr>
          <th scope="row" className="">
            <button
              className="border border-1 w-75 text-center bg-success rounded-pill "
              // data-bs-toggle="modal"
              // data-bs-target={`#hierarchyview-${userId}`}
              style={{ cursor: "auto" }}
            >
              {role}
            </button>

            <p
              onClick={(e) => {
                // takeMeTohierarchy(userName);
              }}
              style={{ cursor: "pointer" }}
            >
              <b>{userName}</b>
            </p>
          </th>

          <td scope="row" className="fs-6 text-center">
            {creditRefLength > 0 ? (
              //Need to hit Txn Modal
              <span>{creditRef}</span>
            ) : (
              //Need to hit Txn Modal
              <span>0</span>
            )}
            <span className="">
              <button
                className={`border border-0 bg-white btn ${
                  ["Suspended"].includes(store?.admin?.Status)
                    ? "disabled"
                    : store?.admin?.roles[0].permission.some(
                        (role) => role === "CreditRef-Edit"
                      )
                    ? ""
                    : [
                        "superAdmin",
                        "WhiteLabel",
                        "HyperAgent",
                        "SuperAgent",
                        "MasterAgent",
                      ].includes(store?.admin?.roles[0].role)
                    ? ""
                    : "disabled"
                }`}
                aria-label="Close"
              >
                <i
                  className="fa-solid fa-pen-to-square"
                  onClick={() =>
                    handelOpenTransactionModal(true, "creditRefProvider")
                  }
                ></i>
              </button>
            </span>
            <span>
              <button
                className={`border border-0 bg-white btn ${
                  store?.admin?.roles[0].permission.some(
                    (role) => role === "CreditRef-View"
                  )
                    ? ""
                    : [
                        "superAdmin",
                        "WhiteLabel",
                        "HyperAgent",
                        "SuperAgent",
                        "MasterAgent",
                      ].includes(store?.admin?.roles[0].role)
                    ? ""
                    : "disabled"
                }`}
              >
                <i class="fa-regular fa-eye" aria-label="Close"></i>
              </button>
            </span>
          </td>

          <td scope="row" className="fs-6 text-center">
            {partnershipLength > 0 ? (
              <span
              //Need to hit Txn Modal
              >
                {partnership}
              </span>
            ) : (
              <span
              //Need to hit Txn Modal
              >
                0
              </span>
            )}
            <span className="">
              <button
                className={`border border-0 bg-white btn ${
                  ["Suspended"].includes(store?.admin?.Status)
                    ? "disabled"
                    : store?.admin?.roles[0].permission.some(
                        (role) => role === "Partnership-Edit"
                      )
                    ? ""
                    : [
                        "superAdmin",
                        "WhiteLabel",
                        "HyperAgent",
                        "SuperAgent",
                        "MasterAgent",
                      ].includes(store?.admin?.roles[0].role)
                    ? ""
                    : "disabled"
                }`}
              >
                <i
                  className="fa-solid fa-pen-to-square"
                  aria-label="Close"
                  onClick={() =>
                    handelOpenTransactionModal(true, "partnershipProvider")
                  }
                ></i>
              </button>
            </span>
            <span>
              <button
                className={`border border-0 bg-white btn ${
                  store?.admin?.roles[0].permission.some(
                    (role) => role === "Partnership-View"
                  )
                    ? ""
                    : [
                        "superAdmin",
                        "WhiteLabel",
                        "HyperAgent",
                        "SuperAgent",
                        "MasterAgent",
                      ].includes(store?.admin?.roles[0].role)
                    ? ""
                    : "disabled"
                }`}
              >
                <i className="fa-regular fa-eye" data-bs-toggle="modal"></i>
              </button>
            </span>
          </td>

          <td scope="row" className="fs-6 text-center">
            {loadBalance}
          </td>
          <td scope="row" className="fs-6 text-center text-danger">
            0
          </td>
          <td scope="row" className="fs-6 text-center">
            {balance}
          </td>
          <td scope="row" className="fs-6 text-center text-danger">
            {isNaN(loadBalance - creditRef) ? 0 : loadBalance - creditRef}
          </td>
          <td scope="row" className="fs-6 text-center">
            <p className="border border-1 w-75 text-center bg-success rounded-pill">
              {Status}
            </p>
          </td>
          <td scope="row" className="fs-6 text-center">
            <span className="mx-1">
              <button
                className={`btn border border-2 rounded ${
                  ["Suspended"].includes(store?.admin?.Status)
                    ? "disabled"
                    : store?.admin?.roles[0].permission.some(
                        (role) => role === "TransferBalance"
                      )
                    ? ""
                    : [
                        "superAdmin",
                        "WhiteLabel",
                        "HyperAgent",
                        "SuperAgent",
                        "MasterAgent",
                      ].includes(store?.admin?.roles[0].role)
                    ? ""
                    : "disabled"
                }`}
                title="Addmoney"
              >
                <i
                  class="fa-solid fa-circle-dollar-to-slot"
                  onClick={() =>
                    handelOpenTransactionModal(true, "walletAmountProvider")
                  }
                ></i>
              </button>
            </span>
            <span className="mx-1">
              <button
                className={`btn border border-2 rounded ${
                  ["Suspended"].includes(store?.admin?.Status)
                    ? "disabled"
                    : store?.admin?.roles[0].permission.some(
                        (role) => role === "Status"
                      )
                    ? ""
                    : [
                        "superAdmin",
                        "WhiteLabel",
                        "HyperAgent",
                        "SuperAgent",
                        "MasterAgent",
                      ].includes(store?.admin?.roles[0].role)
                    ? ""
                    : "disabled"
                }`}
                title="Setting"
                type="button"

                // onClick={handlestatus}
              >
                <i className="fa-thin fas fa-gear"></i>
              </button>
            </span>
            <span className="mx-1">
              <button
                className={`btn border border-2 rounded ${
                  store?.admin?.roles[0].permission.some(
                    (role) => role === "Profile-View"
                  )
                    ? ""
                    : [
                        "superAdmin",
                        "WhiteLabel",
                        "HyperAgent",
                        "SuperAgent",
                        "MasterAgent",
                      ].includes(store?.admin?.roles[0].role)
                    ? ""
                    : "disabled"
                }`}
                title="Profile"
                onClick={() => {
                  // takeMeToAccount(userName);
                }}
              >
                <i class="fa-solid fa-user"></i>
              </button>
            </span>
            <span className="mx-1">
              <button
                className={`btn border border-2 rounded ${
                  ["Suspended"].includes(store?.admin?.Status)
                    ? "disabled"
                    : store?.admin?.roles[0].permission.some(
                        (role) => role === "Delete-Admin"
                      )
                    ? ""
                    : [
                        "superAdmin",
                        "WhiteLabel",
                        "HyperAgent",
                        "SuperAgent",
                        "MasterAgent",
                      ].includes(store?.admin?.roles[0].role)
                    ? ""
                    : "disabled"
                }`}
                title="Delete"
                onClick={(e) => {
                  // handeldelete(userId);
                }}
              >
                <i class="fa-light fas fa-trash"></i>
              </button>
            </span>
            <span className="mx-1">
              <button className="btn border border-2 rounded" title="Wallet">
                <i class="fa-regular fas fa-wallet"></i>
              </button>
            </span>
          </td>
        </tr>
      </tbody>
      <CustomTransactionModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        message="Hi this is msg"
        differentiate={differentiate}
        adminId={adminId}
        adminName={userName}
        role={role}
      />
    </React.Fragment>
  );
};

export default Card;
