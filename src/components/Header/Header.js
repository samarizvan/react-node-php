import React, { Component } from "react";
import "./Header.css";
import Logo from "./logo.png";

class Header extends Component {
  render() {
    return (
      <div className="headermain">
        <nav className="navbar navbar-dark bg-dark">
          <img className="navbar-brand" alt="amtalogo" src={Logo} />
          <div className="headertitle">
            <h1>Draw Down Dinner</h1>
          </div>
        </nav>
      </div>
    );
  }
}
export default Header;
