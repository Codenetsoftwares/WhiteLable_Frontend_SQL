import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { getAuthForm } from "../../Utils/service/initiateState";
import { LoginSchema } from "../../Utils/schema";
import { useAppContext } from "../../contextApi/context";
import strings from "../../Utils/constant/stringConstant";

const Authform = ({ purpose, authFormApi }) => {
  const [authForm] = useState(getAuthForm);
  const { dispatch, store } = useAppContext();
  
  const navigate = useNavigate();

  const roleOptions = {
    superAdmin: ["WhiteLabel", "HyperAgent", "SuperAgent", "MasterAgent"],
    SubAdmin: ["WhiteLabel", "HyperAgent", "SuperAgent", "MasterAgent"],
    WhiteLabel: ["HyperAgent", "MasterAgent", "SuperAgent", "user"],
    SuperAgent: ["HyperAgent", "MasterAgent", "user"],
    HyperAgent: ["MasterAgent", "user"],
    MasterAgent: ["user"],
  };
  const renderRoleOptions = () => {
    if (purpose === "create") {
      const availableRoles = roleOptions[store?.admin?.roles[0]?.role] || [];
      // const availableRoles = [];

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

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      ...authForm,
      roles: authForm.roles || [], // Ensure role is an array
    },
    validationSchema: LoginSchema,
    onSubmit: (values, action) => {
      console.log("values++===============>", values);
      authFormHandler(values);
      resetForm();
    },
    enableReinitialize: true,
  });

  async function authFormHandler(values) {
    console.log(values);
    dispatch({
      type: strings.isLoading,
      payload: true,
    });
    const response = await authFormApi(values, true);
    console.log("res from login", response);
    if (purpose === "login" && response) {
      dispatch({
        type: strings.LOG_IN,
        payload: { isLogin: true, ...response.data },
      });
      navigate("/welcome");

      // setShowLogin(!showLogin);
    }
    dispatch({
      type: strings.isLoading,
      payload: false,
    });
  }

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    const updatedRoles = [...values.roles];
    if (updatedRoles.includes(selectedRole)) {
      const index = updatedRoles.indexOf(selectedRole);
      updatedRoles.splice(index, 1);
    } else {
      updatedRoles.push(selectedRole);
    }
    setFieldValue("roles", updatedRoles);
  };

  return (
    <div className="main_content_iner ">
      <div className="container-fluid" style={{marginTop:"15rem"}}>
        <div className="col-lg-12">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="modal-content cs_modal">
                <div className="modal-header justify-content-center theme_bg_1">
                  <h5 className="modal-title text_white">
                    {purpose === "create" && "Create"}
                    {purpose === "login" && "Log In"}
                  </h5>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="">
                      <input
                        type="text"
                        className="form-control "
                        placeholder="enter userName"
                        name="userName"
                        // style={{ border: '1px solid black' }}
                        value={values.userName}
                        onChange={handleChange}
                      />
                      <span>
                        {errors.userName && touched.userName ? (
                          <p>{errors.userName}</p>
                        ) : null}
                      </span>
                    </div>
                    <div className="">
                      <input
                        type="password"
                        className="form-control "
                        placeholder="enter password"
                        name="password"
                        // style={{ border: '1px solid black' }}
                        value={values.password}
                        onChange={handleChange}
                      />
                      <span>
                        {errors.password && touched.password ? (
                          <p>{errors.password}</p>
                        ) : null}
                      </span>
                    </div>
                    {purpose === "create" && (
                      <div className="">
                        <select
                          className="form-select"
                          name="role"
                          value={values.roles||""} 
                          onChange={handleRoleChange}
                          onBlur={handleBlur}
                        >
                          {renderRoleOptions()}
                        </select>
                        
                      </div>
                    )}
                    <a
                      className="btn_1 full_width text-center"
                      style={{ cursor: "pointer" }}
                      onClick={handleSubmit}
                    >
                      {purpose === "create" && "Create"}
                      {purpose === "login" && "Log In"}
                    </a>
                    {purpose === "login" && (
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