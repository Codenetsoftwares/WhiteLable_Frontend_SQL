import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/Auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Pages/Accounts/Login/Login.css";
import { useAppContext } from "../contextApi/context";
import strings from "../Utils/constant/stringConstant";
const Authform = ({ purpose, authFormApin, userApi }) => {
  const auth = useAuth();
  console.log("=========>>>> authentication", auth);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { dispatch, store } = useAppContext();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAuthForm(e);
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setRole(value);
  };
  const roleOptions = {
    superAdmin: ["whiteLabel", "hyperAgent", "superAgent", "masterAgent"],
    SubAdmin: ["whiteLabel", "hyperAgent", "superAgent", "masterAgent"],
    whiteLabel: ["hyperAgent", "masterAgent", "superAgent", "user"],
    superAgent: ["hyperAgent", "masterAgent", "user"],
    hyperAgent: ["masterAgent", "user"],
    masterAgent: ["user"],
  };
  const renderRoleOptions = () => {
    if (purpose === "create") {
      const availableRoles = roleOptions[auth.user.roles[0].role] || [];
      return (
        <>
          <option selected>Open this select role</option>
          {availableRoles.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </>
      );
    }
    return null;
  };
  const handleAuthForm = (e) => {
    e.preventDefault();
    let data;

    if (username === "" || password === "") {
      if (username === "") {
        toast.error("username can not be empty");
        return;
      }
      toast.error("password fields cannot be empty.");
      return;
    }
    if (purpose === "create") {
      if (role === "") {
        toast.error("Select the role");
        return;
      }
      data = {
        userName: username,
        password: password,
        roles: [role],
      };
    } else if (purpose === "login") {
      data = {
        userName: username,
        password: password,
        roles: [role],
      };
    }
    console.log("============++++++> Data", data);
    if (role === "user") {
      userApi(data, auth.user)
        .then((res) => {
          console.log(res);
          toast.success("User Create Successful.");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      authFormApin(data, true)
        .then((res) => {
          console.log(res);
          if (purpose === "login") {
            dispatch({
              type: strings.LOG_IN,
              payload: { isLogin: true, ...res.data },
            });
            navigate("/welcome");
          } else if (purpose === "userLogin") {
            toast.success("User Login Successful.");
          } else {
            toast.success("Create Successful.");
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };
  return (
    <div className="main_content_iner ">
      <div className="container-fluid mt-6">
        <div className="col-lg-12">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="modal-content cs_modal">
                <div className="modal-header justify-content-center theme_bg_1">
                  <h5 className="modal-title text_white">
                    {purpose === "create" && "Create"}
                    {purpose === "userCreate" && "Create User"}
                    {purpose === "login" && "Log In"}
                    {purpose === "userLogin" && "User Log In"}
                  </h5>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                    {purpose === "create" && (
                      <div className="">
                        <select
                          className="form-select"
                          style={{ border: "1px solid #F1F3F5" }}
                          value={role || ""}
                          autoComplete="off"
                          onChange={handleChange}
                        >
                          {renderRoleOptions()}
                        </select>
                      </div>
                    )}
                    <a
                      className="btn_1 full_width text-center"
                      style={{ cursor: "pointer" }}
                      onClick={handleAuthForm}
                    >
                      {purpose === "create" && "Create"}
                      {purpose === "userCreate" && "Create User"}
                      {purpose === "login" && "Log In"}
                      {purpose === "userLogin" && "User Log In"}
                    </a>
                    {purpose === ("login" || "userLogin") && (
                      <div className="text-center">
                        <p></p>
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#forgot_password"
                          data-dismiss="modal"
                          className="pass_forget_btn"
                        >
                          Forget Password?
                        </a>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Authform;
