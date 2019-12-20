import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import SponsorsLogo from "../SponsorsLogo/SponsorsLogo";
import $ from "jquery";
import axios from "axios";
import SubNav from "../SubNav/SubNav";
import "../../styles/custom.css";

export default class DisplayDraw extends Component {
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
  }

  componentDidUpdate() {
    this.getInTheDraw();
    this.ScrollUp();
  }
  getDrawSettings = () => {
    fetch("http://localhost:8080/buildsetting")
      .then(res => res.json())
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
      kids.slice(20).hide();
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
      return this;
    };
    $(function() {
      $("#inthedrawbody").infiniteScrollUp();
    });
  }

  render() {
    return (
      <React.Fragment>
        <SubNav />
        <div className="inthedrawmain" style={{ paddingTop: "20px" }}>
          <div className="inthedrawtitle">
            <h1>In the Draw</h1>
          </div>
          <div className="displaytbl table-wrap">
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
        <SponsorsLogo />
      </React.Fragment>
    );
  }
}
