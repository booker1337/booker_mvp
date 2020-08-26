import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import HamburgerToggle from '../Hamburger/HamburgerToggle';
import { propTypes } from "react-bootstrap/esm/Image";

export default function NavBar() {
  return (
      <header clasName="NavBar">
        <nav className="NavBar_Navigation">
            <div className="NavBar_logo"><a href="/">B O O K E R</a></div>
            <div className="spacer" />
            <div className="NavBar_Navigation-Items">
              <ul>
                <li><a href="/">OFFERS</a></li>
                <li><a href="/">ABOUT</a></li>
                <li><a href="/">FAQS</a></li>
                <li><a href="/">JOIN A BOOK CLUB</a></li>
                <li class="SignIn"><a href="/">SIGN IN</a></li>
              </ul>
            </div>
            <div>
            <HamburgerToggle click={props.HamburgerClickHandler} />
          </div>
        </nav>
      </header>
  );
}