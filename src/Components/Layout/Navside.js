import React, { useState, useEffect  } from "react";
import { Link } from "react-router-dom";

const Navside = () => {
  const [isUser, setIsUser] = useState(true);
  const [isRequest, setIsRequest] = useState(true);
  const [userRole, setUserRole] = useState(true);
  const handleUserToggle = () => {
    setIsUser(!isUser);
  };

  const handleRequestToggle = () => {
    setIsRequest(!isRequest);
  };

  const handleUserRoleToggle = () => {
    setUserRole(!userRole);
  };

  return (
    <nav className="sidebar">
      <div className="logo d-flex justify-content-between">
        <a className="large_logo" href="#">
          <img src="../img/logo.png" alt="" />
        </a>
        <a className="small_logo" href="#">
          <img src="../img/mini_logo.png" alt="" />
        </a>
        <div className="sidebar_close_icon d-lg-none">
          <i className="ti-close"></i>
        </div>
      </div>
      <ul id="sidebar_menu" class="metismenu">
        {isUser ? (
          <li className="" onClick={handleUserToggle}>
            <a className="has-arrow" href="#" aria-expanded="false">
              <div className="nav_icon_small">
                <img src="../img/menu-icon/dashboard.svg" alt="" />
              </div>
              <div className="nav_title">
                <span>User Management </span>
              </div>
            </a>
          </li>
        ) : (
          <li className="" onClick={handleUserToggle}>
            <a className="has-arrow" href="#" aria-expanded="false">
              <div className="nav_icon_small">
                <img src="../img/menu-icon/dashboard.svg" alt="" />
              </div>
              <div className="nav_title">
                <span>User Management </span>
              </div>
            </a>
            <ul>
              <li>
                <Link to="/Create">Create</Link>
              </li>

              <li>
                <Link to="/maintransaction">wallet</Link>
              </li>
              <li>
                <a href="#">Light Sidebar</a>
              </li>
            </ul>
          </li>
        )}

        {isRequest ? (
          <li className="" onClick={handleRequestToggle}>
            <a className="has-arrow" href="#" aria-expanded="false">
              <div className="nav_icon_small">
                <img src="../img/menu-icon/dashboard.svg" alt="" />
              </div>
              <div className="nav_title">
                <span>Request </span>
              </div>
            </a>
          </li>
        ) : (
          <li className="" onClick={handleRequestToggle}>
            <a className="has-arrow" href="#" aria-expanded="false">
              <div>
                <img src="../img/menu-icon/dashboard.svg" alt="" />
              </div>
              <div>
                <span>Request </span>
              </div>
            </a>
            <ul>
              <li>
                <Link to="/agentDelete">Agent Delete</Link>
              </li>
            </ul>
          </li>
        )}
     

        {userRole ? (
          <li className="" onClick={handleUserRoleToggle}>
            <a className="has-arrow" href="#" aria-expanded="false">
              <div className="nav_icon_small">
                <img src="../img/menu-icon/dashboard.svg" alt="" />
              </div>
              <div className="nav_title">
                <span>User Role</span>
              </div>
            </a>
          </li>
        ) : (
          <li className="" onClick={handleUserRoleToggle}>
            <a className="has-arrow" href="#" aria-expanded="false">
              <div>
                <img src="../img/menu-icon/dashboard.svg" alt="" />
              </div>
              <div>
                <span>User Role</span>
              </div>
            </a>
            <ul className="d-flex flex-column ml-0">
              <li>
                <Link to="/AddUserRole">
                  <span>
                    {" "}
                    <i class="fa-solid fa-circle"></i>Create New
                  </span>
                </Link>
              </li>

              <li>
                <Link to="/ExistingRoles">
                  <span>
                    <i class="fa-solid fa-circle"></i>View Existing
                  </span>
                </Link>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navside;
