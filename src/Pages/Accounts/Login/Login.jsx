import React from "react";
import Authform from "../../../Components/AuthForm";
import { login } from "../../../Utils/service/apiService";


const Login = () => {
  return <Authform purpose={"login"} authFormApin={login} />;
};

export default Login;
