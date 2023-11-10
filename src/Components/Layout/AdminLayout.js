import React from "react";
import NavTop from "./NavTop";
import Navside from "./Navside";
import Layout from "./Layout";
import Footer from "./Footer";

const AdminLayout = () => {
  return (
    <div>
      <section>
        <NavTop />
        <Navside />
        <Footer />
        <Layout />
      </section>
    </div>
  );
};

export default AdminLayout;
