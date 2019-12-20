import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import $ from "jquery";
import axios from "axios";
import "../../styles/custom.css";
import "./InTheDraw.css";

export default class InTheDraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      displayTimmer: 1
    };
  }

  componentDidMount() {
    this.getDrawSettings();
    this.ScrollUp();
    //this.getInTheDraw();
    //this.inthedrawinterval = setInterval(() => this.getInTheDraw(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.inthedrawinterval);
    clearTimeout(this.ScrollUp());
  }

  componentDidUpdate() {
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

  async getInTheDraw() {
    const response = await axios.get("http://localhost:8080/inthedraw");
    try {
      this.setState({
        contacts: response.data.inTheDrawData
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
      //kids.slice(5).hide();
      setTimeout(() => {
        kids
          .filter(":hidden")
          .eq(0)
          .fadeIn();
        kids.eq(0).fadeIn(function() {
          $(this).appendTo(self);
          kids = self.children();
        });
      }, displayInterval * 1000);
      //clearInterval(scrollInterval);
      return this;
    };
    $(function() {
      $("#inthedrawbody").infiniteScrollUp();
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="inthedrawmain">
          <div className="inthedrawtitle">
            <h1>In the Draw</h1>
          </div>
          <div className="table-wrap">
            <Table bordered>
              <thead className="thead-dark">
                <tr>
                  <th className="text-center thfirst">Ticket Number</th>
                  <th className="text-center thsecond">Ticket Name</th>
                  <th className="text-center ththird">Salesperson</th>
                </tr>
              </thead>
              <tbody id="inthedrawbody">
                {this.state.contacts.map(contact => (
                  <tr key={contact.id}>
                    <td className="text-center">{contact.ticketnumber}</td>
                    <td className="text-center">{contact.ticketname}</td>
                    <td className="text-center">{contact.salesperson}</td>
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
