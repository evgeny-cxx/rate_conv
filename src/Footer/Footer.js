import React, { Component } from "react";
import Nav from "../Nav/Nav";
import "./Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
        <p>Footer</p>
        <Nav />
      </footer>
    );
  }
}
