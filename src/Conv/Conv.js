import React, { Component } from "react";

export default class Conv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BYN: 0,
      USD: 0,
      EUR: 0,
      RUB: 0,
    };

    this.messageError = "";
  }

  myInput = (e) => {
    e.preventDefault();
    const value = +e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
    console.log({ name: value });

    if (Number.isNaN(value)) {
      this.setState({
        USD: 0,
        EUR: 0,
        RUB: 0,
        BYN: 0,
      });
      this.messageError = "Incorrect input value!";
    } else {
      this.calculate(name, value);
      this.messageError = "";
    }
  };

  calculate = (name, value) => {
    const rate = this.props.currentRate;
    const EURtoUSD = rate.EUR[1] / rate.USD[1];
    const RUB1 = rate.RUB[1] / 100;
    const RUBtoUSD = rate.USD[1] / RUB1;
    const RUBtoEUR = rate.EUR[1] / RUB1;

    switch (name) {
      case "BYN":
        this.setState({
          USD: (value / rate.USD[1]).toFixed(2),
          EUR: (value / rate.EUR[1]).toFixed(2),
          RUB: (value / RUB1).toFixed(2),
        });
        break;

      case "USD":
        this.setState({
          BYN: (value * rate.USD[1]).toFixed(2),
          RUB: (value * RUBtoUSD).toFixed(2),
          EUR: (value / EURtoUSD).toFixed(2),
        });
        break;

      case "EUR":
        this.setState({
          BYN: (value * rate.EUR[1]).toFixed(2),
          RUB: (value * RUBtoUSD).toFixed(2),
          USD: (value * EURtoUSD).toFixed(2),
        });
        break;

      case "RUB":
        this.setState({
          BYN: (value * RUB1).toFixed(2),
          USD: (value / RUBtoUSD).toFixed(2),
          EUR: (value / RUBtoEUR).toFixed(2),
        });
        break;

      // no default
    }
  };

  render() {
    let rate = this.state;
    let content = (
      <form>
        {Object.keys(rate).map((item) => (
          <div className="form-group row" key={item}>
            <label
              className="col-sm-2 col-form-label col-form-label-lg"
              htmlFor={item}
            >
              {item}
            </label>
            <div className="col col-lg-10">
              <input
                className="form-control form-control-lg"
                onChange={this.myInput}
                type="text"
                autoComplete="off"
                name={item}
                id={item}
                value={this.state[item]}
              />
            </div>
          </div>
        ))}
      </form>
    );
    return (
      <div>
        <h5 className="convert-lebel">Конвертор валют</h5>
        <div>{content}</div>
        <div>
          <h3>{this.messageError}</h3>
        </div>
      </div>
    );
  }
}
