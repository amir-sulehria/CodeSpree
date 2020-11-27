import React from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

export default function GeneralLayout(props) {
  return (
    <>
      <Navigation />
      {props.children}
      {/* <Footer /> */}
    </>
  );
}
