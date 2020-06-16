import React, { Component } from "react";
import "./Footer.css";

let title = "Курсы валют";
let contacts = ["Copyright by cxx_BY", "+375298174777", "evgeny.cxx@gmail.com"];

export default class Footer extends Component {
  render() {
    return (
      <footer className="Footer App section" style={{ background: "#2d3246" }}>
        <p>{title}</p>
        {/* <p className="d-flex bd-highlight"> Copyright by cxx_BY</p> */}
        <ul className="row d-flex">
          {contacts.map((elem, index) => (
            <li className="p-2 flex-fill bd-highlight" key={index}>
              {elem}
            </li>
          ))}
        </ul>
      </footer>
    );
  }
}
