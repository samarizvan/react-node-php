import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./admin.css";
import axios from "axios";

export default class buildDraw extends Component {
  constructor() {
    super();
    this.state = {
      persons: [],
      totalticket: 0,
      midPoint: 0
    };
    this.handleDisplayOption = this.handleDisplayOption.bind(this);
    this.handleNexttcktOption = this.handleNexttcktOption.bind(this);
    this.handleLogoOption = this.handleLogoOption.bind(this);
    this.handleWinningtcktOption = this.handleWinningtcktOption.bind(this);
    this.handleManualdrawOption = this.handleManualdrawOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDisplayOption(e) {
    this.setState({ displayoption: e.target.value });
  }
  handleNexttcktOption(e) {
    this.setState({ nexttcktoption: e.target.value });
  }
  handleLogoOption(e) {
    this.setState({ logooption: e.target.value });
  }
  handleWinningtcktOption(e) {
    this.setState({ winningtcktoption: e.target.value });
  }
  handleManualdrawOption(e) {
    this.setState({ manualdrawoption: e.target.value });
  }

  componentDidMount() {
    this.getTotalTicket();
    //this.midPoint();
  }

  async getTotalTicket() {
    await fetch("http://localhost:8080/totalTicket")
      .then(res => res.json())
      //.then(res => console.log(res.data[0]["total"]))
      .then(res => this.setState({ totalticket: res.data[0]["total"] }))
      .catch(err => console.log(err));
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      displayoption: this.state.displayoption,
      nexttcktoption: this.state.nexttcktoption,
      logooption: this.state.logooption,
      winningtcktoption: this.state.winningtcktoption,
      manualdrawoption: this.state.manualdrawoption,
      midpointoption: Math.round(this.state.totalticket / 2)
    };

    axios.post("http://localhost:8080/insertdraw", data).then(res => {
      const persons = res.data;
      console.log(persons);
      this.setState({ persons });
    });

    /*fetch("http://localhost:8080/insertdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data) // data can be `string` or {object}!
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));*/
  }

  render() {
    return (
      <div className="builddraw" onSubmit={this.handleSubmit}>
        <form onSubmit={this.handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label htmlFor="displayoption" column sm={2}>
              Display Option:
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                id="displayoption"
                name="displayoption"
                type="number"
                onChange={this.handleDisplayOption}
                placeholder="1"
                required
              />
            </Col>
            <div className="buildtooltip">
              info
              <span className="tooltiptext">
                How fast(in seconds) do you want the tickets remaining in the
                draw to scroll?
              </span>
            </div>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label htmlFor="nexttcktoption" column sm={2}>
              Draw Next Ticket Option:
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                id="nexttcktoption"
                name="nexttcktoption"
                type="number"
                onChange={this.handleNexttcktOption}
                placeholder="5"
                required
              />
            </Col>
            <div className="buildtooltip">
              info
              <span className="tooltiptext">
                How often(in seconds) do you want to draw a ticket? Includes
                both winners and losers?
              </span>
            </div>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label htmlFor="logooption" column sm={2}>
              Logo Option:
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                id="logooption"
                name="logooption"
                type="number"
                onChange={this.handleLogoOption}
                placeholder="5"
                required
              />
            </Col>
            <div className="buildtooltip">
              info
              <span className="tooltiptext">
                How often(in seconds) do you want the Logos to change?
              </span>
            </div>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label htmlFor="winningtcktoption" column sm={2}>
              Winning Ticket Option:
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                id="winningtcktoption"
                name="winningtcktoption"
                type="number"
                onChange={this.handleWinningtcktOption}
                placeholder="6"
                required
              />
            </Col>
            <div className="buildtooltip">
              info
              <span className="tooltiptext">
                How often do you want to select a winning ticket for winners?
                (Example: Entering 5 would select a winning ticket 1 out of
                every 5 tickets)
              </span>
            </div>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label htmlFor="manualdrawoption" column sm={2}>
              Manual Draw Option::
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                id="manualdrawoption"
                name="manualdrawoption"
                type="number"
                onChange={this.handleManualdrawOption}
                placeholder="4"
                required
              />
            </Col>
            <div className="buildtooltip">
              info
              <span className="tooltiptext">
                Manually select winners and losers ticket when this numbers of
                ticket remain?
              </span>
            </div>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label htmlFor="midpointoption" column sm={2}>
              Mid Point:
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                id="midpointoption"
                name="midpointoption"
                type="number"
                value={Math.round(this.state.totalticket / 2)}
                placeholder=""
                required
              />
            </Col>
            <div className="buildtooltip">
              info
              <span className="tooltiptext">
                Stop the draw for a break when this number of tickets remain in
                the draw.
              </span>
            </div>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label htmlFor="totaltickets" column sm={2}>
              Total Ticket:
            </Form.Label>
            <Col sm={2}>
              <Form.Control
                id="totaltickets"
                name="totaltickets"
                type="number"
                value={this.state.totalticket}
                placeholder=""
                required
              />
            </Col>
            <div className="buildtooltip">
              info
              <span className="tooltiptext">Total tickets in the draw.</span>
            </div>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Submit</Button>
            </Col>
          </Form.Group>
        </form>
      </div>
    );
  }
}
