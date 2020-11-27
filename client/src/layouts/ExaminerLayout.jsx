import React from "react";
import ExaminerNav from ".././components/Staff/ExaminerNav";

export default function AdminLayout(props) {
  return (
    <>
      <ExaminerNav />
      {props.children}
    </>
  );
}
