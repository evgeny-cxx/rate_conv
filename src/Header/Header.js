import React, { Component } from "react";
import "./Header.css";
import Nav from "../Nav/Nav";

export default class Header extends Component {
  render() {
    let title = this.props.title;
    let nav = this.props.nav;
    return (
      <header className="App-header">
        <Nav title={title} nav={nav} />
      </header>
    );
  }
}
