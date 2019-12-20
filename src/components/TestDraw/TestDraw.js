import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import SubNav from "../SubNav/SubNav";
import InTheDraw from "../InTheDraw/InTheDraw";
import Ticket from "../TotalTicket/TotalTicket";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";

export default class TestDraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winnerTimmer: 1,
      drawMidpoint: 0,
      outOfDraws: [],
      drawWinners: [],
      winnercount: 0,
      winningTicket: 0,
      manualDraw: 0,
      lastThirdtckt: 0,
      secondLastTckt: 0,
      totalticket: 0,
      losercount: 0
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.midPoint = this.midPoint.bind(this);
    this.manualDrawOpt = this.manualDrawOpt.bind(this);
    this.selectWinner = this.selectWinner.bind(this);
    this.selectLoser = this.selectLoser.bind(this);
  }

  componentDidMount() {
    this.getDrawSettings();
    this.getDrawMidpoint();
    this.interval = setInterval(() => this.getTotalTicket(), 1000);
    //this.midPoint();
  }

  componentDidUpdate() {
    this.midPoint();
    this.manualDrawOpt();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getDrawSettings = () => {
    fetch("http://localhost:8080/buildsetting")
      .then(res => res.json())
      //.then(res => console.log(res.data[0]))
      .then(res =>
        this.setState({
          winnerTimmer: res.data[0]["nexttcktoption"],
          winningTicket: res.data[0]["winningtcktoption"],
          manualDraw: JSON.stringify(res.data[0]["manualdrawoption"]),
          lastThirdtckt: JSON.stringify(res.data[0]["manualdrawoption"] - 1),
          secondLastTckt: JSON.stringify(res.data[0]["manualdrawoption"] - 2)
        })
      )
      .catch(err => console.log(err));
  };

  start() {
    var intervalWinner = setInterval(
      () => this.getDrawWinner(),
      this.state.winnerTimmer * 1000
    );
    this.setState({ intervalWinner: intervalWinner });
  }

  stop() {
    clearInterval(this.state.intervalWinner);
  }

  selectWinner() {
    this.singalWinner();
  }

  selectLoser() {
    this.singleLooser();
  }

  async getTotalTicket() {
    const response = await axios.get(
      "http://localhost:81/react-php/api/totalticket.php"
    );
    try {
      this.setState({
        totalticket: response.data.TotalTicket
      });
      //console.log(this.state.totalticket);
    } catch (error) {
      this.setState({ error });
      console.log(error);
    }
  }

  async getDrawMidpoint() {
    await fetch("http://localhost:8080/buildsetting")
      .then(res => res.json())
      //.then(res => console.log(res.data[0]["midpointoption"]))
      .then(res =>
        this.setState({
          drawMidpoint: JSON.stringify(res.data[0]["midpointoption"])
        })
      )
      .catch(err => console.log(err));
  }

  deleteThisGoal() {
    const getAlert = () => (
      <SweetAlert success title="Woot!" onConfirm={() => this.hideAlert()}>
        Hello world!
      </SweetAlert>
    );
    getAlert();
  }

  midPoint = () => {
    let midPointtckt = this.state.drawMidpoint;
    let totalticket = this.state.totalticket;
    //console.log(midPointtckt);
    //console.log(totalticket);
    if (midPointtckt === totalticket) {
      this.deleteThisGoal();
      this.stop();
      document.getElementById("sltwnr").style.display = "block";
    } else {
      document.getElementById("sltwnr").style.display = "none";
    }
  };

  manualDrawOpt = () => {
    let manualDrawtckt = this.state.manualDraw;
    let thirdLastDraw = this.state.lastThirdtckt;
    let secondLastDraw = this.state.secondLastTckt;
    let totalticket = this.state.totalticket;
    console.log(thirdLastDraw);
    console.log(secondLastDraw);
    if (manualDrawtckt === totalticket) {
      this.stop();
      //window.location.reload();
      document.getElementById("sltwnr").style.display = "block";
      document.getElementById("sltlsr").style.display = "block";
    } else if (thirdLastDraw === totalticket) {
      this.stop();
      document.getElementById("sltwnr").style.display = "block";
      document.getElementById("sltlsr").style.display = "block";
    } else if (secondLastDraw === totalticket) {
      this.stop();
      document.getElementById("sltwnr").style.display = "block";
      document.getElementById("sltlsr").style.display = "block";
    } else {
      document.getElementById("sltwnr").style.display = "none";
      document.getElementById("sltlsr").style.display = "none";
    }
  };

  async singalWinner() {
    const response = await axios.get(
      "http://localhost:81/react-php/api/drawwinner.php"
    );
    try {
      this.setState({
        drawWinners: response.data.drawWinnerData
      });
      console.log(this.state.winnercount);
    } catch (error) {
      this.setState({ error });
      console.log(error);
    }
  }

  async singleLooser() {
    const response = await axios.get(
      "http://localhost:81/react-php/api/outofdraw.php"
    );
    try {
      this.setState({
        outOfDraws: response.data.outOfDrawData
      });
      console.log(this.state.losercount);
    } catch (error) {
      this.setState({ error });
      console.log(error);
    }
  }

  async getDrawWinner() {
    let ticketCount = this.state.winningTicket - 1;
    //console.log(ticketCount);
    if (this.state.winnercount === 0) {
      const response = await axios.get(
        "http://localhost:81/react-php/api/drawwinner.php"
      );
      try {
        this.setState({
          drawWinners: response.data.drawWinnerData,
          winnercount: this.state.winnercount + 1
        });
        console.log(this.state.winnercount);
      } catch (error) {
        this.setState({ error });
        console.log(error);
      }
    } else {
      const response = await axios.get(
        "http://localhost:81/react-php/api/outofdraw.php"
      );
      try {
        this.setState({
          outOfDraws: response.data.outOfDrawData,
          losercount: this.state.losercount + 1
        });
        console.log(this.state.losercount);
      } catch (error) {
        this.setState({ error });
        console.log(error);
      }
    }
    if (this.state.losercount === ticketCount) {
      this.setState({
        winnercount: 0,
        losercount: 0
      });
    }
  }

  getMidPointStop() {
    return <Ticket midpointStop={this.state.stop} />;
  }
  getWinnerTable() {
    return (
      <React.Fragment>
        <Table bordered>
          <thead className="thead-dark">
            <tr>
              <th className="text-center thfirst">Ticket Number</th>
              <th className="text-center thsecond">Ticket Name</th>
              <th className="text-center ththird">Salesperson</th>
            </tr>
          </thead>
          {this.state.drawWinners.map(drawWinner => (
            <tbody key={drawWinner.id}>
              <tr>
                <td className="text-center">{drawWinner.ticketnumber}</td>
                <td className="text-center">{drawWinner.ticketname}</td>
                <td className="text-center">{drawWinner.salesperson}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </React.Fragment>
    );
  }

  getOutOfDrawTable() {
    return (
      <React.Fragment>
        <Table bordered>
          <thead className="thead-dark">
            <tr>
              <th className="text-center thfirst">Ticket Number</th>
              <th className="text-center thsecond">Ticket Name</th>
              <th className="text-center ththird">Salesperson</th>
            </tr>
          </thead>
          <tbody>
            {this.state.outOfDraws.map(outOfDraw => (
              <tr key={outOfDraw.id}>
                <td className="text-center">{outOfDraw.ticketnumber}</td>
                <td className="text-center">{outOfDraw.ticketname}</td>
                <td className="text-center">{outOfDraw.salesperson}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <SubNav />
        <div className="ctrlbtn">
          <button className="strtbtn" onClick={this.start}>
            {" "}
            Start Draw{" "}
          </button>
          <button className="stopbtn" onClick={this.stop}>
            {" "}
            Stop Draw{" "}
          </button>

          <button
            className="sltwnrbtn"
            id="sltwnr"
            value="Select Winner"
            onClick={this.selectWinner}
            style={{ display: "none" }}
          >
            {" "}
            Select Winner{" "}
          </button>
          <button
            className="sltloserbtn"
            id="sltlsr"
            value="Select Loser"
            onClick={this.selectLoser}
            style={{ display: "none" }}
          >
            {" "}
            Select Loser{" "}
          </button>
        </div>
        <div className="winnermain">
          <div className="winnertitle">
            <h1>Winner</h1>
          </div>
          <div className="table-wrap-winner ">{this.getWinnerTable()}</div>
        </div>
        <div className="outofdrawmain">
          <div className="outofdrawtitle">
            <h1>Out of Draw</h1>
          </div>
          <div className="table-wrap-outofdraw ">
            {this.getOutOfDrawTable()}
          </div>
        </div>
        <InTheDraw />
      </React.Fragment>
    );
  }
}
