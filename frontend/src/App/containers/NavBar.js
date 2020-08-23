import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function NavBar() {
  return (
    <div className="container">
        <Navbar fluid collapseOnSelect>
            <Navbar.Header>
            <Navbar.Brand>
                <Link to="/">Booker</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <Nav pullRight>
                <LinkContainer to="/signup">
                <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                <NavItem>Login</NavItem>
                </LinkContainer>
            </Nav>
            </Navbar.Collapse>
        </Navbar>

      </div>
  );
}