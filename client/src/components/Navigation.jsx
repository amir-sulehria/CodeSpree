import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar
      style={{ fontSize: "1.5em" }}
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand
        href="/"
        style={{ fontSize: "1.5em", fontWeight: "bold", color: "white" }}
      >
        CodeSpree
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link style={{ paddingRight: "1em" }} as={Link} to="/login">
            Login
          </Nav.Link>
          <Nav.Link as={Link} to="/register">
            Register
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
