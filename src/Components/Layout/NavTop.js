import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { useAuth } from "../../Utils/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavTop = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [forcestoreauth, setForceStoreauth] = useState(null);

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to log out of this site?"
    );
    if (confirmed) {
      auth.logout();
      toast.success("Logout successfully");
      navigate("/");
    }
  };

  return (
    <section className="main_content dashboard_part large_header_bg">
      <div className="container-fluid g-0">
        <div className="row">
          <div className="col-lg-12 p-0 ">
            <div className="header_iner d-flex justify-content-between align-items-center">
              <div className="sidebar_icon d-lg-none">
                <i className="ti-menu"></i>
              </div>
              <div className="line_icon open_miniSide d-none d-lg-block">
                <img src="../img/line_img.png" alt="" />
              </div>
              {/* <div className="serach_field-area d-flex align-items-center">
                <div className="search_inner">
                  <form action="#">
                    <div className="search_field">
                      <input type="text" placeholder="Search" />
                    </div>
                    <button type="submit">
                      {" "}
                      <img src="../img/icon/icon_search.svg" alt="" />{" "}
                    </button>
                  </form>
                </div>
              </div> */}
              <div className="header_right d-flex justify-content-between align-items-center">
                <div className="profile_info">
                  <img src="../img/client_img.png" alt="#" />
                  <div className="profile_info_iner">
                    <div className="profile_author_name">
                      <p>{auth.user.roles[0].role} </p>
                      <h5>{auth.user.userName}</h5>
                    </div>
                    <div className="profile_info_details">
                      {/* <a href="#">My Profile </a> */}
                      {/* <a href="#">Settings</a> */}
                      <a style={{ cursor: "pointer" }} onClick={handleLogout}>
                        <b className="text-danger">Logout</b>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Layout />
    </section>
  );
};

export default NavTop;
