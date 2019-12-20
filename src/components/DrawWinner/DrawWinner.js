import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./DrawWinner.css";

export default class DrawWinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawWinners: []
    };
  }

  componentDidMount() {
    this.getDrawWinner();
    //this.winnerinterval = setInterval(() => this.getDrawWinner(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.winnerinterval);
  }

  /*async getDrawWinner() {
    const response = await axios.get(
      "http://localhost:81/react-php/api/drawwinner.php"
    );
    try {
      this.setState({
        drawWinners: response.data.drawWinnerData
      });
      console.log(this.state.drawWinners);
    } catch (error) {
      this.setState({ error });
      console.log(error);
    }
  }*/

  getDrawWinner = () => {
    axios.get(`http://localhost:81/react-php/api/drawwinner.php`).then(res => {
      try {
        const response = res.data;
        this.setState({
          drawWinners: response.drawWinnerData
        });
      } catch (error) {
        this.setState({ error });
        console.log(error);
      }
    });
  };
  handleClickEvent(e) {
    e.preventDefault();
    this.getDrawWinner();
  }
  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleClickEvent.bind(this)}>start</button>
        <div className="winnermain">
          <div className="winnertitle">
            <h1>Winner</h1>
          </div>
          <div className="table-wrap-winner ">
            <Table bordered>
              <thead className="thead-dark">
                <tr>
                  <th className="text-center thfirst">Ticket Number</th>
                  <th className="text-center thsecond">Ticket Name</th>
                  <th className="text-center ththird">Salesperson</th>
                </tr>
              </thead>
              <tbody>
                {this.state.drawWinners.map(drawWinner => (
                  <tr key={drawWinner.id}>
                    <td className="text-center">{drawWinner.ticketnumber}</td>
                    <td className="text-center">{drawWinner.ticketname}</td>
                    <td className="text-center">{drawWinner.salesperson}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
