import React, { Component } from "react";
import "./Nav.css";

export default class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <a className="a nav-link active " href="#">
          Active
        </a>
        <a className="a nav-link " href="#">
          Link
        </a>
        <a className="a nav-link" href="#">
          Link
        </a>
        <a className="a nav-link disabled" href="#">
          Disabled
        </a>
      </nav>
    );
  }
}
