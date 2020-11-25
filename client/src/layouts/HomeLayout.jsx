import React from "react";
import Footer from "../components/Footer";
import HomeNav from "../components/HomeNav";
import "./common.css";

export default function HomeLayout(props) {
  return (
    <>
      <HomeNav />
      {props.children}
      {/* <Footer /> */}
    </>
  );
}
