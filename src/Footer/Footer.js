import React, { Component } from "react";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    let title = this.props.title;
    let contacts = this.props.contacts;
    return (
      <footer className="Footer App section" style={{ background: "#2d3246" }}>
        <div className="navbar-brand brand">{title}</div>
        <ul className="row d-flex justify-content-between">
          {contacts.map((elem) => (
            <li className="p-2 flex-fill bd-highlight" key={elem}>
              {elem}
            </li>
          ))}
        </ul>
      </footer>
    );
  }
}
