import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./OutOfDraw.css";

export default class OutOfDraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outOfDraws: []
    };
  }

  componentDidMount() {
    this.getoutOfDraw();
    //this.loserinterval = setInterval(() => this.getoutOfDraw(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.loserinterval);
  }

  async getoutOfDraw() {
    const response = await axios.get(
      "http://localhost:81/react-php/api/outofdraw.php"
    );
    try {
      this.setState({
        outOfDraws: response.data.outOfDrawData
      });
      console.log(this.state.outOfDraws);
    } catch (error) {
      this.setState({ error });
      console.log(error);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="outofdrawmain">
          <div className="outofdrawtitle">
            <h1>Out of Draw</h1>
          </div>
          <div className="table-wrap-outofdraw ">
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}
