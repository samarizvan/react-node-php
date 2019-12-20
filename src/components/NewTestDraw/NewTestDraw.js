import React, { Component } from "react";

export default class NewTestDraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winnercount: 0,
      losercount: 0,
      adminBar: null,
      loserBar: null
    };
    this.DrawMain = this.DrawMain.bind(this);
  }
  componentDidMount() {
    // this.getDrawWinner();
    this.winnerinterval = setInterval(() => this.DrawMain(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.winnerinterval);
  }
  DrawMain() {
    if (this.state.winnercount === 0) {
      this.setState({
        winnercount: this.state.winnercount + 1
      });
      //this.state.adminBar = <DrawWinner />;
    } else {
      this.setState({
        losercount: this.state.losercount + 1
      });
      //this.setState.loserBar = <OutOfDraw />;
      console.log(this.state.losercount);
    }
    if (this.state.losercount === 5) {
      this.setState({
        winnercount: 0,
        losercount: 0
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="winnermain">
          <div className="winnertitle">
            <h1>Winner</h1>
          </div>
          <div className="table-wrap-winner ">{this.state.adminBar}</div>
        </div>
        <div className="outofdrawmain">
          <div className="outofdrawtitle">
            <h1>Out of Draw</h1>
          </div>
          <div className="table-wrap-outofdraw ">{this.state.loserBar}</div>
        </div>
      </React.Fragment>
    );
  }
}
