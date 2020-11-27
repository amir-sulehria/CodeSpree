import React from "react";
import ENav from "../components/Staff/ENav";

export default function EmpLayout(props) {
  return (
    <>
      <ENav />
      {props.children}
    </>
  );
}
