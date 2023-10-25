import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav
      className="navbar is-success"
      role="navigation"
      aria-label="main navigation"
    >
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          <Link to="/all" className="navbar-item">
            All
          </Link>
          <Link to="/cart" className="navbar-item">
            Cart
          </Link>
        </div>

        {/* <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">Log in</a>
            </div>
          </div>
        </div> */}
      </div>
    </nav>
  );
}

export default NavBar;
