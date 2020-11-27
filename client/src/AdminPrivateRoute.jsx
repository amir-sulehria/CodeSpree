import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode";

export default function AdminPrivateRoute(props) {
  const access_token = Cookie.get("token");
  let role;
  if (access_token) {
    const obj = jwt_decode(access_token);
    role = obj.role;
  }
  console.log(access_token);
  console.log(role);
  return (
    <Route
      path={props.path}
      render={(data) =>
        access_token && role === "admin" ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: "/cs-staff" }}></Redirect>
        )
      }
    ></Route>
  );
}
