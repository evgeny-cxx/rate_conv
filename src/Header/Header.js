import React, { Component } from "react";
import "./Header.css";
import Nav from "../Nav/Nav";

export default class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <div className="banner">Header</div>
        <Nav />
      </header>
    );
  }
}
