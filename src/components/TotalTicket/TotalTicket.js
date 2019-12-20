import React, { Component } from "react";
import axios from "axios";
import "./TotalTicket.css";

export default class TotalTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalticket: 0
    };
    //this.midPoint = this.midPoint.bind(this);
  }

  /*async getTotalTicket() {
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
    }
  }*/

  componentDidMount() {
    this.interval = setInterval(() => this.getTotalTicket(), 1000);
    //this.getDrawMidpoint();
    //this.midPoint();
  }

  componentDidUpdate() {
    //this.midPoint();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /*async getTotalTicket() {
    aconst response = await axios.get(
      "http://localhost:81/react-php/api/totalticket.php"
    );
    try {
      this.setState({
        totalticket: response.data.TotalTicket
      });
      console.log(this.state.totalticket);
    } catch (error) {
      this.setState({ error });
      console.log(error);
    }
  }*/

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

  /*async getDrawMidpoint() {
    await fetch("http://localhost:8080/buildsetting")
      .then(res => res.json())
      //.then(res => console.log(res.data[0]["midpointoption"]))
      .then(res =>
        this.setState({ drawMidpoint: res.data[0]["midpointoption"] })
      )
      .catch(err => console.log(err));
  }

  midPoint = () => {
    let midPointtckt = this.state.drawMidpoint;
    let totalticket = this.state.totalticket;
    //console.log(midPointtckt);

    if (midPointtckt === totalticket) {
      //alert("We are at the Mid-Point - Pick one last winner!!");
      document.getElementById("sltwnr").style.display = "block";
    } else {
      document.getElementById("sltwnr").style.display = "none";
    }
  };*/

  render() {
    return (
      <div className="totaltckt">
        <h2>Tickets Remaining : {this.state.totalticket}</h2>
      </div>
    );
  }
}
