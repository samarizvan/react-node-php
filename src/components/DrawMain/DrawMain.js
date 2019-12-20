import React, { Component } from "react";
import SubNav from "../SubNav/SubNav";
import DrawWinner from "../DrawWinner/DrawWinner";
import OutOfDraw from "../OutOfDraw/OutOfDraw";
import InTheDraw from "../InTheDraw/InTheDraw";

export default class DrawMain extends Component {
  render() {
    return (
      <React.Fragment>
        <SubNav />
        <DrawWinner />
        <OutOfDraw />
        <InTheDraw />
      </React.Fragment>
    );
  }
}
