import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import About from "./About";
import Logout from "./Logout";
import Learning from "./Leanring";

const NavBar = () => {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <h4>Welcome</h4>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ms-5">
                <NavLink
                  className={(isActive) =>
                    "nav-link" + (!isActive ? "" : " active")
                  }
                  aria-current="page"
                  to="/learn"
                >
                  Start Learning
                </NavLink>
              </li>
              <li className="nav-item ms-5">
                <NavLink className={(isActive) =>
                    "nav-link" + (!isActive ? "" : " active")
                  } to="/about">
                  About
                </NavLink>
              </li>
            </ul>
            <Logout></Logout>
          </div>
        </div>
      </nav>
      <Switch>
        <Route exact path="/learn">
          <Learning></Learning>
        </Route>
        <Route exact path="/about">
          <About></About>
        </Route>
      </Switch>
    </>
  );
};

export default NavBar;
