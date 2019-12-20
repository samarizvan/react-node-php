import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "../../styles/custom.css";

export default class DrawSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawSettings: [],
      displayoption: ""
    };
  }

  componentDidMount() {
    this.getDrawSetting();
  }

  async getDrawSetting() {
    const response = await axios.get(
      "http://localhost:81/react-php/api/drawSetting.php"
    );
    try {
      this.setState({
        drawSettings: response.data.drawSettingData
      });
      console.log(this.state.drawSettings);
    } catch (error) {
      this.setState({ error });
      console.log(error);
    }
  }

  getOptionsTable() {
    return (
      <React.Fragment>
        <div>
          {this.state.drawSettings.map(drawSetting => (
            <div key={drawSetting.id}>
              const greeting = {drawSetting.displayoption}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="inthedrawmain">
          <div className="inthedrawtitle">
            <h1>Draw options</h1>
          </div>
          <div className="table-wrap">
            <Table bordered>
              <thead className="thead-dark">
                <tr>
                  <th className="text-center">Display Option</th>
                  <th className="text-center">Nexttckt Option</th>
                  <th className="text-center">Logo Option</th>
                  <th className="text-center">Winningtckt Option</th>
                  <th className="text-center">Manualdraw Option</th>
                  <th className="text-center">Midpoint option</th>
                </tr>
              </thead>
              <tbody id="inthedrawbody">
                {this.state.drawSettings.map(drawSetting => (
                  <tr key={drawSetting.id}>
                    <td className="text-center">{drawSetting.displayoption}</td>
                    <td className="text-center">
                      {drawSetting.nexttcktoption}
                    </td>
                    <td className="text-center">{drawSetting.logooption}</td>
                    <td className="text-center">
                      {drawSetting.winningtcktoption}
                    </td>
                    <td className="text-center">
                      {drawSetting.manualdrawoption}
                    </td>
                    <td className="text-center">
                      {drawSetting.midpointoption}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="table-wrap-winner ">{this.getOptionsTable()}</div>
      </React.Fragment>
    );
  }
}
