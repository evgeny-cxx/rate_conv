import React, { Component } from "react";

export default class Conv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curensyRate: {
        USD: [2.42, 2.47, "./flag/USD.png"],
        EUR: [2.615, 2.67, "./flag/EUR.png"],
        RUB: [3.24, 3.35, "./flag/RUB.png"],
      },
    };
  }

  submitForm = (e) => {
    e.preventDefault();
  };

  myInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value });
  };

  convertor = () => {};

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm} name="form">
          <div className="form-group">
            <label for="formGroupInput1">USD</label>
            <input
              onChange={this.myInput}
              type="number"
              name="number"
              id="formGroupInput1"
            />
          </div>
          <div className="form-group">
            <label for="formGroupInput2">EUR</label>
            <input
              onChange={this.myInput}
              type="number"
              name="number"
              id="formGroupInput2"
            />
          </div>
          <div className="form-group">
            <label for="formGroupInput3">RUB</label>
            <input
              onChange={this.myInput}
              type="number"
              name="number"
              id="formGroupInput3"
            />
          </div>
        </form>
      </div>
    );
  }
}
