import React from "react";
import axios from "axios";

class importData extends React.Component {
  constructor() {
    super();
    this.state = {
      csvfile: null,
      displays: []
    };
    this.updateData = this.updateData.bind(this);
  }

  handleChange = event => {
    this.setState({
      csvfile: event.target.files[0],
      loaded: 0
    });
  };

  importCSV = () => {
    const data = new FormData();
    data.append("file", this.state.csvfile);
    axios
      .post("http://localhost:8080/upload", data, {
        // receive two parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status
        console.log(res.statusText);
      });
  };

  updateData(result) {
    var data = result.data;
    console.log(data);
    this.setState({
      displays: result.data
    });
  }

  render() {
    console.log(this.state.csvfile);
    return (
      <React.Fragment>
        <div className="App">
          <h2>Import CSV File!</h2>
          <input
            className="csv-input"
            type="file"
            ref={input => {
              this.filesInput = input;
            }}
            name="file"
            placeholder={null}
            onChange={this.handleChange}
          />
          <p />
          <button onClick={this.importCSV}> Upload now!</button>
        </div>
      </React.Fragment>
    );
  }
}

export default importData;
