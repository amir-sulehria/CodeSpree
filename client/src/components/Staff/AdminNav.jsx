import React from "react";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

const Navigation = () => {
  const history = useHistory();
  return (
    <Navbar
      style={{ fontSize: "1.5em" }}
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand
        href="/dashboard"
        style={{ fontSize: "1.5em", fontWeight: "bold", color: "white" }}
      >
        CodeSpree
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link style={{ paddingRight: "1em" }} as={Link} to="/admin/users">
            Users
          </Nav.Link>
          <Nav.Link style={{ paddingRight: "1em" }} as={Link} to="/admin/staff">
            Examiners
          </Nav.Link>
          <Nav.Link style={{ paddingRight: "1em" }} as={Link} to="/admin/test">
            Tests
          </Nav.Link>
          <Nav.Link style={{ paddingRight: "1em" }} as={Link} to="/tasks">
            Tasks
          </Nav.Link>
          <Nav.Link
            style={{ paddingRight: "1em" }}
            onClick={() => {
              axios.get("http://localhost:4000/api/users/signout");
              Cookie.remove("token");
              history.push("/");
            }}
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
