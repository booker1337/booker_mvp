import React from "react";
import "./Navbar.css";

import HamburgerToggle from '../Hamburger/HamburgerToggle';

export default function NavBar() {
  return (
      <header className="NavBar">
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
            <div className="NavBar_toggle-button">
              <HamburgerToggle click={this.props.HamburgerToggleClickHandler} />
          </div>
        </nav>
      </header>
  );
}