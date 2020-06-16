import React, { Component } from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink
              exact
              activeClassName="active"
              to="/"
              className="nav-item nav-link "
            >
              Главная
            </NavLink>
            <NavLink
              exact
              activeClassName="active"
              to="/Customs"
              className="nav-item nav-link "
            >
              Растаможка
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}
