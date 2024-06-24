import React, { useState } from "react";
import { getUserCreate } from "../Utils/service/initiateState"
import { userCreate } from "../Utils/service/apiService"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserCreate = () => {
    const [userCreateForm, setUserCreateForm] = useState(getUserCreate)
    const navigate = useNavigate()

    const handleUserCreate = (name, value) => {
        setUserCreateForm((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    function userCreateHandler() {

        const data = {
            firstName: userCreateForm.firstName,
            lastName: userCreateForm.lastName,
            userName: userCreateForm.userName,
            phoneNumber: userCreateForm.mobileNo,
            password: userCreateForm.password,
        };

        if (userCreateForm.firstName === "" || userCreateForm.lastName === "" || userCreateForm.userName === "") {
            if (userCreateForm.userName === "") {
                toast.error("Username fields cannot be empty.");
                return;
            }
            toast.error("fields cannot be empty.");
            return;
        }
        const response = userCreate(data, true);
        console.log("res from login", response);
        if (response) {
            navigate("/welcome");

            // setShowLogin(!showLogin);
        }

    }
    return (
        <div className="main_content_iner overly_inner ">
            <div className="container-fluid p-0 mt-5">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="white_card card_height_100 mb_30">
                            <div className="white_card_header">
                                <div className="box_header m-0">
                                    <div className="main-title">
                                        <h3 className="m-0">Add New User </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="white_card_body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="common_input mb_15">
                                            <input
                                                type="text"
                                                placeholder="Username"
                                                value={userCreateForm.userName}
                                                onChange={(e) => handleUserCreate("userName", e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="common_input mb_15">
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                value={userCreateForm.firstName}
                                                onChange={(e) => handleUserCreate("firstName", e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="common_input mb_15">
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                value={userCreateForm.lastName}
                                                onChange={(e) => handleUserCreate("lastName", e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="common_input mb_15">
                                            <input
                                                type="number"
                                                placeholder="Mobile No"
                                                value={userCreateForm.mobileNo}
                                                onChange={(e) => handleUserCreate("mobileNo", e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="common_input mb_15"></div>
                                    </div>
                                    <div className="col-lg-6 ">
                                        <div className="common_input mb_15">
                                            <input
                                                type="text"
                                                placeholder="Password"
                                                value={userCreateForm.password}
                                                onChange={(e) => handleUserCreate("password", e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="common_input mb_15"></div>
                                    </div>
                                    <div class="col-12">
                                        <div class="create_report_btn mt_30">
                                            <a
                                                href="#"
                                                class="btn_1 radius_btn d-block text-center"
                                                onClick={userCreateHandler}
                                            >
                                                Add User
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </div>
    );
};
export default UserCreate;
