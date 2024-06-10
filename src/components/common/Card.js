
import React from 'react'
import Authform from './AuthForm'


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
  return (
    <tbody>
    <tr>
      <th scope="row" className="">
        <button
          className="border border-1 w-75 text-center bg-success rounded-pill "
          style={{ cursor: "auto" }}
        >
        {role}
        </button>

        <p style={{ cursor: "pointer" }}>
    <b>{userName}</b>
        </p>
      </th>

      <td scope="row" className="fs-6 text-center">
        <span aria-label="Close">{creditRef}</span>
        <span className="">
          <button className="border border-0 bg-white btn">
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </span>
        <span>
          <button className="border border-0 bg-white btn">
            <i className="fa-regular fa-eye" aria-label="Close"></i>
          </button>
        </span>
      </td>

      <td scope="row" className="fs-6 text-center">
        <span aria-label="Close"> {partnership}</span>
        <span className="">
          <button className="border border-0 bg-white btn">
            <i
              className="fa-solid fa-pen-to-square"
              aria-label="Close"
            ></i>
          </button>
        </span>
        <span>
          <button className="border border-0 bg-white btn">
            <i className="fa-regular fa-eye" aria-label="Close"></i>
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
        {/* {isNaN(loadBalance - creditRef) ? 0 : loadBalance - creditRef} */}
      </td>
      <td scope="row" className="fs-6 text-center">
        <p className="border border-1 w-75 text-center bg-success rounded-pill">
        {Status}
        </p>
      </td>
      <td scope="row" className="fs-6 text-center">
        <span className="mx-1">
          <button
            className="btn border border-2 rounded"
            title="Addmoney"
          >
            <i class="fa-solid fa-circle-dollar-to-slot"></i>
          </button>
        </span>
        <span className="mx-1">
          <button
            className="btn border border-2 rounded"
            title="Setting"
            type="button"
          >
            <i className="fa-thin fas fa-gear"></i>
          </button>
        </span>
        <span className="mx-1">
          <button className="btn border border-2 rounded" title="Profile">
            <i class="fa-solid fa-user"></i>
          </button>
        </span>
        <span className="mx-1">
          <button className="btn border border-2 rounded" title="Delete">
            <i class="fa-light fas fa-trash"></i>
          </button>
        </span>
        <span className="mx-1">
          <button className="btn border border-2 rounded" title="Wallet">
            <i class="fa-regular fas fa-wallet"> </i>
          </button>
        </span>
      </td>
    </tr>
  </tbody>
  )
}

export default Card