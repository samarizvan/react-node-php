import React, { Component } from "react";
import TotalTicket from "../TotalTicket/TotalTicket";
import Clock from "../Clock/Clock";
import "./SubNav.css";

export default class SubNav extends Component {
  render() {
    return (
      <div className="subcontent_nav">
        <Clock />
        <TotalTicket />
      </div>
    );
  }
}
