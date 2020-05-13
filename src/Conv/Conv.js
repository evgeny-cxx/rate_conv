import React, { Component } from "react";

export default class Conv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      USD: null,
      EUR: null,
      RUB: null,
      BYN: null,
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
    this.setState({ [e.target.name]: +e.target.value });
    console.log({ [e.target.name]: e.target.value });
    const rate = this.state.curensyRate;
    const EURtoUSD = rate.EUR[1] / rate.USD[1];
    const RUB1 = rate.RUB[1] / 100;
    const RUBtoUSD = rate.USD[1] / RUB1;
    const RUBtoEUR = rate.EUR[1] / RUB1;
    const value = +e.target.value;
    const name = e.target.name;

    // switch (name) {
    //   case "BYN":
    //     this.setState({
    //       USD: value / rate.USD[1],
    //       EUR: value / rate.EUR[1],
    //       RUB: value / RUB1,
    //     });
    //     break;

    //   case "USD":
    //     this.setState({
    //       BYN: value * rate.USD[1],
    //       RUB: value * RUBtoUSD,
    //       EUR: value / EURtoUSD,
    //     });
    //     break;

    //   case "EUR":
    //     this.setState({
    //       BYN: value * rate.EUR[1],
    //       RUB: value * RUBtoUSD,
    //       USD: value * EURtoUSD,
    //     });
    //     break;

    //   case "RUB":
    //     this.setState({
    //       BYN: value * RUB1,
    //       USD: value / RUBtoUSD,
    //       EUR: value / RUBtoEUR,
    //     });
    //     break;
    // }

    Object.keys(rate).map((item, index) => {
      console.log(rate[item][1], index);
      if (item === null) {
        this.setState({
          BYN: value * RUB1,
          USD: value / RUBtoUSD,
          EUR: value / RUBtoEUR,
        });
      }
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm} name="form">
          <div className="form-group">
            <label htmlFor="formGroupInput1">BYN</label>
            <input
              onChange={this.myInput}
              type="number"
              name="BYN"
              id="formGroupInput1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupInput2">EUR</label>
            <input
              onChange={this.myInput}
              type="number"
              name="EUR"
              id="formGroupInput2"
            />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupInput3">RUB</label>
            <input
              onChange={this.myInput}
              type="number"
              name="RUB"
              id="formGroupInput3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupInput4">USD</label>
            <input
              onChange={this.myInput}
              type="number"
              name="USD"
              id="formGroupInput3"
            />
          </div>
        </form>
      </div>
    );
  }
}
