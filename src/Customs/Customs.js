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
    this.customs(value);
  };

  customs = (value) => {
    this.setState((state) => {
      const rate = this.props.currentRate;
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
    let input = (
      <form>
        <div className="form" key="priceUSD">
          <label className="col-form-label" htmlFor="priceUSD"></label>
          <div className="slider-wrapper">
            <input
              className="form-control-range"
              onChange={this.myInput}
              type="range"
              min="1"
              max="300"
              name="priceUSD"
              step="0.01"
              value={price.priceUSD}
            />
          </div>
        </div>
      </form>
    );
    let content = (
      <table className="table customs-text">
        <thead>
          <tr>
            <td> </td>
            <td>USD</td>
            <td>EUR</td>
            <td>BYN</td>
          </tr>
        </thead>
        <tbody>
          <tr className="table-success">
            <th scope="row">Цена: </th>
            <td>{price.priceUSD}</td>
            <td>{price.priceEUR}</td>
            <td>{price.priceBYN}</td>
          </tr>
          <tr>
            <th scope="row">%+5 EUR: </th>
            <td>{price.percentUSD}</td>
            <td>{price.percentEUR}</td>
            <td>{price.percentBYN}</td>
          </tr>
          <tr className="table-primary">
            <th scope="row">Итого: </th>
            <td>{price.fullPriceUSD}</td>
            <td>{price.fullPriceEUR}</td>
            <td>{price.fullPriceBYN}</td>
          </tr>
        </tbody>
      </table>
    );
    return (
      <>
        <div className="row col-sm-6">
          <div>{input}</div>
          <div>
            <div className="info" style={{ width: "30rem" }}>
              <div>
                <strong>
                  Выбрав банк и цену посылки с помощью ползунка справа , можно
                  увидеть расчет таможенного платежа при превышении лимита в 22
                  евро и итоговую стоимость посылки по курсу данного банка.
                </strong>
                {content}
              </div>
              <div>
                * Данные из калькулятора носят справочный характер. Более точную
                информацию вы можете получить в таможенной службе РБ.
              </div>
              <p>
                Расчет происходит на основании{" "}
                <a href="http://www.customs.gov.by/uploads/gtk/files/document/fizicheskim-litsam/MPO.pdf">
                  методички
                </a>{" "}
                на официальном сайте белорусской таможни.
              </p>
              <p>
                С 1 января 2020 года изменились правила получения посылок в
                Евразийском экономическом союзе. Соответственно, нововведения
                начали действовать и в Беларуси. Стоимость пошлины - 15% от
                превышения (минимум 2 евро за килограмм) начала действовать с
                января.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Customs;
