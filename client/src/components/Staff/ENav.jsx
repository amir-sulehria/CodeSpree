import React from "react";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

const Navigation = () => {
  const history = useHistory();
  return (
    <Navbar style={{ fontSize: "1.5em" }} expand="lg" bg="dark" variant="dark">
      <Navbar.Brand
        href="/dashboard"
        style={{ fontSize: "1.5em", fontWeight: "bold", color: "white" }}
      >
        CodeSpree
      </Navbar.Brand>
    </Navbar>
  );
};

export default Navigation;
