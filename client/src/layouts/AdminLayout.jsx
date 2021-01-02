import React from "react";
import AdminNav from ".././components/Staff/AdminNav";
import Footer from "../components/Footer";

export default function AdminLayout(props) {
  return (
    <>
      <AdminNav />
      {props.children}
      {/* <Footer /> */}
    </>
  );
}
