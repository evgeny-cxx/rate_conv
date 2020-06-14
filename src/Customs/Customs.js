import React from "react";
import "./Customs.css";

class Customs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      priceUSD: 0,
      priceBYN: 0,
      priceEUR: 0,
      percentUSD: 0,
      percentBYN: 0,
      percentEUR: 0,
      fullPriceUSD: 0,
      fullPriceBYN: 0,
      fullPriceEUR: 0,
    };
    this.messageError = "";
  }

  submitForm = (e) => {
    e.preventDefault();
  };

  myInput = (e) => {
    const value = +e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
    console.log({ name: value });

    if (Number.isNaN(value)) {
      this.setState({
        priceUSD: 0,
      });
      this.messageError = "Incorrect input value!";
    } else {
      this.customs(value);
      this.messageError = "";
    }
  };

  customs = (value) => {
    this.setState((state) => {
      const rate = this.props.currentRate;
      // let price = this.state;
      let priceBYN = 0,
        priceEUR = 0,
        percentUSD = 0,
        percentBYN = 0,
        percentEUR = 0,
        fullPriceUSD = 0,
        fullPriceBYN = 0,
        fullPriceEUR = 0;
      const EURtoUSD = rate.EUR[1] / rate.USD[1];
      priceEUR = +(value / EURtoUSD).toFixed(2);
      priceBYN = +(value * rate.USD[1]).toFixed(2);

      if (priceEUR > 22) {
        let excess = (priceEUR - 22) * 0.15 + 5;

        percentUSD = +(excess * EURtoUSD).toFixed(2);
        percentEUR = +excess.toFixed(2);
        percentBYN = +(excess * rate.EUR[1]).toFixed(2);
        fullPriceUSD = (percentUSD + value).toFixed(2);
        fullPriceEUR = (percentEUR + priceEUR).toFixed(2);
        fullPriceBYN = (percentBYN + priceBYN).toFixed(2);
      } else {
        fullPriceUSD = value;
        fullPriceEUR = priceEUR;
        fullPriceBYN = priceBYN;
      }
      // console.log("cust", price);
      return {
        priceBYN,
        priceEUR,
        percentUSD,
        percentBYN,
        percentEUR,
        fullPriceUSD,
        fullPriceBYN,
        fullPriceEUR,
      };
    });
  };

  render() {
    let price = this.state;

    let content = (
      <table className="table table-sm">
        <thead>
          <tr>
            <td> </td>
            <td>USD</td>
            <td>EUR</td>
            <td>BYN</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Цена </th>
            <td>
              {
                <input
                  className="input"
                  onChange={this.myInput}
                  type="number"
                  step="any"
                  autoComplete="off"
                  name="priceUSD"
                  id="priceUSD"
                  value={price.priceUSD}
                />
              }
            </td>
            <td>{price.priceEUR}</td>
            <td>{price.priceBYN}</td>
          </tr>
          <tr>
            <th scope="row">% + 5 EUR </th>
            <td>{price.percentUSD}</td>
            <td>{price.percentEUR}</td>
            <td>{price.percentBYN}</td>
          </tr>
          <tr>
            <th scope="row">Итого:</th>
            <td>{price.fullPriceUSD}</td>
            <td>{price.fullPriceEUR}</td>
            <td>{price.fullPriceBYN}</td>
          </tr>
        </tbody>
      </table>
    );
    return (
      <div className="mt-0 font">
        {/* <div>{input}</div> */}
        <div>{content}</div>
        <div>
          <h3>{this.messageError}</h3>
        </div>
      </div>
    );
  }
}

export default Customs;
