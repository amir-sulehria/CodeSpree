import React from "react";
import AdminNav from ".././components/Staff/AdminNav";

export default function AdminLayout(props) {
  return (
    <>
      <AdminNav />
      {props.children}
    </>
  );
}
