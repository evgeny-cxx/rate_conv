import React from "react";
import "./Customs.css";

class Customs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priceUSD: 0,
      priceBY: 0,
      priceEUR: 0,
      percentUSD: 0,
      percentBY: 0,
      percentEUR: 0,
      fullPriceUSD: 0,
      fullPriceBY: 0,
      fullPriceEUR: 0,
    };
  }

  submitForm = (e) => {
    e.preventDefault();
  };

  myInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value });
  };

  customs = () => {
    const { rate } = this.props.currentRate;
    console.log("rate", rate);
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
        <div>{content}</div>
        <div>
          <h3>{this.messageError}</h3>
        </div>
      </div>
    );
  }
}

export default Customs;
