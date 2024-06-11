import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contextApi/context";
import { moveToTrash_api } from "../../Utils/service/apiService";

const Card = ({
    role,
    userId,
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
console.log('========>>>>>>> line 19',userId)
    const { dispatch, store } = useAppContext();
    const [Istatus, setIStatus] = useState("");
    const [userid, setUserId] = useState("");
    const [userID, setUserID] = useState("");
    const [userhierarchy, setHierarchy] = useState("");
    const navigate = useNavigate();
console.log('=====>>> line 26',store)

    async function handleDelete() {
        console.log('======>>>> onclick the id',userId)
        const userConfirmed = window.confirm(
            "Balance should be 0 to move the Admin User to trash"
          );
        const response = await moveToTrash_api({requestId:userId});
        if (userConfirmed){
            console.log("Im here in line 94");
            if(response.status === 201){

                alert("Agent Deleted approval sent!");
                // window.location.reload();
            }
        }
       

    }
    return (
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
                        <span
                            data-bs-toggle="modal"
                            data-bs-target={`#EditCreditRefBalance-${userId}`}
                            aria-label="Close"
                        >
                            {creditRef}
                        </span>
                    ) : (
                        <span
                            data-bs-toggle="modal"
                            data-bs-target={`#EditCreditRefBalance-${userId}`}
                            aria-label="Close"
                        >
                            0
                        </span>
                    )}
                    <span className="">
                        <button
                            className={`border border-0 bg-white btn ${["Suspended"].includes(store?.admin?.Status)
                                ? "disabled" : store?.admin?.roles[0].permission.some(
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
                            data-bs-toggle="modal"
                            data-bs-target={`#EditCreditRefBalance-${userId}`}
                            aria-label="Close"
                        >
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </span>
                    <span>
                        <button
                            className={`border border-0 bg-white btn ${store?.admin?.roles[0].permission.some(
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
                            <i
                                class="fa-regular fa-eye"
                                data-bs-toggle="modal"
                                data-bs-target={`#CreditRefBalanceLog-${userId}`}
                                aria-label="Close"
                            ></i>
                        </button>
                    </span>
                </td>

                <td scope="row" className="fs-6 text-center">
                    {partnershipLength > 0 ? (
                        <span
                            data-bs-toggle="modal"
                            data-bs-target={`#EditPartnerShipBalance-${userId}`}
                            aria-label="Close"
                        >
                            {partnership}
                        </span>
                    ) : (
                        <span
                            data-bs-toggle="modal"
                            data-bs-target={`#EditCreditRefBalance-${userId}`}
                            aria-label="Close"
                        >
                            0
                        </span>
                    )}
                    <span className="">
                        <button
                            className={`border border-0 bg-white btn ${["Suspended"].includes(store?.admin?.Status)
                                ? "disabled" : store?.admin?.roles[0].permission.some(
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
                                data-bs-toggle="modal"
                                data-bs-target={`#EditPartnerShipBalance-${userId}`}
                                aria-label="Close"
                            ></i>
                        </button>
                    </span>
                    <span>
                        <button
                            className={`border border-0 bg-white btn ${store?.admin?.roles[0].permission.some(
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
                            <i
                                className="fa-regular fa-eye"
                                data-bs-toggle="modal"
                                data-bs-target={`#PartnerShipLog-${userId}`}
                                aria-label="Close"
                            ></i>
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
                    {isNaN(loadBalance - creditRef) ? 0 : (loadBalance - creditRef)}
                </td>
                <td scope="row" className="fs-6 text-center">
                    <p className="border border-1 w-75 text-center bg-success rounded-pill">
                        {Status}
                    </p>
                </td>
                <td scope="row" className="fs-6 text-center">
                    <span className="mx-1">
                        <button
                            data-bs-toggle="modal"
                            data-bs-target={`#transferbalance-${userId}`}
                            className={`btn border border-2 rounded ${["Suspended"].includes(store?.admin?.Status)
                                ? "disabled" : store?.admin?.roles[0].permission.some(
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
                            className={`btn border border-2 rounded ${["Suspended"].includes(store?.admin?.Status)
                                ? "disabled" : store?.admin?.roles[0].permission.some((role) => role === "Status")
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
                            data-bs-toggle="modal"
                            data-bs-target={`#activeInactive-${userId}`}
                        // onClick={handlestatus}
                        >
                            <i className="fa-thin fas fa-gear"></i>
                        </button>
                    </span>
                    <span className="mx-1">
                        <button
                            className={`btn border border-2 rounded ${store?.admin?.roles[0].permission.some(
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
                            className={`btn border border-2 rounded ${["Suspended"].includes(store?.admin?.Status)
                                ? "disabled" : store?.admin?.roles[0].permission.some(
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
    );
};

export default Card;
