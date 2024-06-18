import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contextApi/context";
import CustomTransactionModal from "../../modal/customTransactionModal";
import ViewPartnershipAndCreditRefModal from "../../modal/viewPartnershipAndCreditRefModal";
import {
  getHierarchy,
  getPartnershipLog,
} from "../../Utils/service/apiService";
import StatusModal from "../../modal/StatusModal";
import { moveToTrash_api } from "../../Utils/service/apiService";

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
  callingParent,
  setRefresh,
}) => {
  console.log("userrole ======>>>> ", role, userName);
  // const [userid, setUserId] = useState("");
  // const [userID, setUserID] = useState("");
  // const [userhierarchy, setHierarchy] = useState("");
  const navigate = useNavigate();
  const { dispatch, store } = useAppContext();
  // const [Istatus, setIStatus] = useState('');
  //   const [adminId, setAdminId] = useState("");
  const [transactionModalShow, setTransactionModalShow] = useState(false);
  const [viewModalShow, setViewModalShow] = useState(false);
  const [differentiate, setDifferentiate] = useState("");
  console.log("userId", adminId);
  console.log("name&role", userName, role);

  console.log("store", store);

  const handelOpenTransactionModal = (boolParam, differentiateParam) => {
    setTransactionModalShow(boolParam);
    setDifferentiate(differentiateParam);
  };

  async function handleDelete() {
    console.log("======>>>> onclick the id", adminId);
    const userConfirmed = window.confirm(
      "Balance should be 0 to move the Admin User to trash"
    );
    const response = await moveToTrash_api({ requestId: adminId });
    if (userConfirmed) {
      console.log("Im here in line 94");
      if (response.status === 201) {
        alert("Agent Deleted approval sent!");
        // window.location.reload();
      }
    }
  }

  const handelOpenViewModal = (boolParam, differentiateParam) => {
    setViewModalShow(boolParam);
    setDifferentiate(differentiateParam);
  };
  let action = "";
  async function takeMeToHierarchy(userName) {
    if (callingParent === "HierarchyPageView") {
      action = "store";
    } else {
      action = "clearAll";
    }

    const response = await getHierarchy({
      adminName: userName,
      action: action,
    });
    if (response.successCode) {
      console.log(response);
      navigate(`/hierarchyView/${userName}`);
    }
  }

  const handleStatus = () => {
    // Any additional logic for handling status button click
  };

  const isAdminOrPartnerView =
    store?.admin?.roles[0].permission.some(
      (role) => role === "Partnership-View"
    ) ||
    [
      "superAdmin",
      "WhiteLabel",
      "HyperAgent",
      "SuperAgent",
      "MasterAgent",
    ].includes(store?.admin?.roles[0].role);

  const takeMeToAccount = (userName) => {
    navigate(`/account-landing/${userName}`);
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
              onClick={() => {
                takeMeToHierarchy(userName);
              }}
              style={{ cursor: "pointer" }}
            >
              <b>{userName}</b>
            </p>
          </th>

          <td scope="row" className="fs-6 text-center">
            {creditRefLength > 0 ? (
              //Need to hit Txn Modal
              <span
                onClick={() =>
                  handelOpenTransactionModal(true, "creditRefProvider")
                }
              >
                {creditRef}
              </span>
            ) : (
              //Need to hit Txn Modal
              <span
                onClick={() =>
                  handelOpenTransactionModal(true, "creditRefProvider")
                }
              >
                0
              </span>
            )}
            {callingParent === "Wallet" ? (
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
                  onClick={() =>
                    handelOpenTransactionModal(true, "creditRefProvider")
                  }
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </span>
            ) : null}

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
                onClick={() => handelOpenViewModal(true, "creditRefViewer")}
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

            {callingParent === "Wallet" ? (
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
            ) : null}

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
                onClick={() => handelOpenViewModal(true, "partnershipViewer")}
              >
                <i className="fa-regular fa-eye"></i>
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
            <span
              className="mx-1"
              onClick={() =>
                handelOpenTransactionModal(true, "walletAmountProvider")
              }
            >
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
                <i class="fa-solid fa-circle-dollar-to-slot"></i>
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
                // data-bs-toggle="modal"
                // data-bs-target={`#activeInactive-${adminId}`}
                // onClick={handleStatus}
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
                  takeMeToAccount(userName);
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
                  handleDelete();
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
        show={transactionModalShow}
        onHide={() => setTransactionModalShow(false)}
        message="Hi this is msg"
        differentiate={differentiate}
        adminId={adminId}
        adminName={userName}
        role={role}
        setRefresh={setRefresh}
      />
      <ViewPartnershipAndCreditRefModal
        show={viewModalShow}
        onHide={() => setViewModalShow(false)}
        message="Hi this is msg"
        differentiate={differentiate}
        adminId={adminId}
        adminName={userName}
        role={role}
      />
      <StatusModal
        statusId={statusId}
        name={userName}
        userRole={role}
        key={`activeInactive`}
      />
    </React.Fragment>
  );
};

export default Card;
