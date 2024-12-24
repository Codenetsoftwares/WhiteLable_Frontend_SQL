import React from "react";
import NavTop from "./NavTop";
import Navside from "./Navside";
import DemoNavside from "./DemoNavside";

const AdminLayout = () => {
  return (
    <div>
      {/* <section> */}
      <NavTop purpose="login" />
      <Navside />
      {/* <DemoNavside/> */}
      {/* <Layout /> */}
      {/* <Footer /> */}
      {/* </section> */}
    </div>
  );
};

export default AdminLayout;
