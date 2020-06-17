import React, { Component } from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";

export default class Nav extends Component {
  render() {
    let title = this.props.title;
    let nav = this.props.nav;
    return (
      <nav className="conteiner navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">
          {title}
        </a>
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
          <div className="nav nav-pills flex-column flex-sm-row">
            {Object.keys(nav).map((elem) => (
              <NavLink
                exact
                activeClassName=" active"
                to={nav[elem]}
                className="nav-item nav-link navbar-text"
                key={elem}
              >
                {elem}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    );
  }
}
