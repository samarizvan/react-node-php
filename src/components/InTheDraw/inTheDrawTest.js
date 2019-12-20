import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import $ from "jquery";
import axios from "axios";
import "../../styles/custom.css";
import "./InTheDraw.css";

export default class InTheDrawTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inDraws: [],
      drawids: [],
      displayTimmer: 1
    };
  }

  componentDidMount() {
    this.getDrawSettings();
    //this.inthedrawinterval = setInterval(() => this.getInTheDraw(), 5000);
    //this.getInTheDraw();
  }

  componentWillUnmount() {
    clearInterval(this.inthedrawinterval);
  }

  componentDidUpdate() {
    //this.getInDraw();
    this.getInTheDraw();
    this.ScrollUp();
  }
  getDrawSettings = () => {
    fetch("http://localhost:8080/buildsetting")
      .then(res => res.json())
      //.then(res => console.log(res.data[0]["displayoption"]))
      .then(res =>
        this.setState({ displayTimmer: res.data[0]["displayoption"] })
      )
      .catch(err => console.log(err));
  };

  /*getInTheDraw = () => {
    fetch("http://localhost:8080/inDraw")
      .then(res => res.json())
      //.then(res => console.log(res.indrawdata))
      .then(res => this.setState({ inDraws: res.indrawdata }))
      .catch(err => console.log(err));
  };*/

  async getInTheDraw() {
    const response = await axios.get(
      "http://localhost:81/react-php/api/inthedraw.php"
    );
    try {
      this.setState({
        inDraws: response.data.inTheDrawData
      });
      //console.log(this.state.contacts);
    } catch (error) {
      this.setState({ error });
      console.log(error);
    }
  }

  ScrollUp() {
    let displayInterval = this.state.displayTimmer;
    $.fn.infiniteScrollUp = function() {
      var self = this,
        kids = self.children();
      kids.slice(6).hide();
      setTimeout(() => {
        kids
          .filter(":hidden")
          .eq(0)
          .fadeIn();
        kids.eq(0).fadeOut(function() {
          $(this).appendTo(self);
          kids = self.children();
        });
      }, displayInterval * 1000);
      return this;
    };
    $(function() {
      $("#inthedrawbody").infiniteScrollUp();
    });
  }

  getInDrawTable() {
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
          <tbody id="inthedrawbody">
            {this.state.inDraws.map(inDraw => (
              <tr key={inDraw.id}>
                <td className="text-center">{inDraw.ticketnumber}</td>
                <td className="text-center">{inDraw.ticketname}</td>
                <td className="text-center">{inDraw.salesperson}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="inthedrawmain">
        <div className="inthedrawtitle">
          <h1>In the Draw</h1>
        </div>
        <div className="table-wrap">{this.getInDrawTable()}</div>
      </div>
    );
  }
}
