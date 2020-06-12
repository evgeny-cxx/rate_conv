import React, { Component } from "react";
import "./Banks.css";

export default class Banks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      date: "",
      curensyRate: {},
      data: {},
      error: null,
    };

    this.currensy = ["USD", "EUR", "RUB"];
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.readerRate();
  }
  readerRate = () => {
    fetch(
      "https://cors-anywhere.herokuapp.com/" +
        "https://belarusbank.by/api/kurs_cards"
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          data = data[0];
          this.setState({
            isLoading: false,
          });

          console.table("blrbank:  ", data);

          let date = new Date(data.kurs_date_time);
          date = this.dateFormat(date);
          this.setState({ date: date });

          let allRate = {};
          Object.keys(this.currensy).map((item) => {
            let sale = `data.${this.currensy[item]}CARD_out`;
            let purchase = `data.${this.currensy[item]}CARD_in`;

            const noEval = (str) => {
              return /data/g.test(str) && str.indexOf("CARD") === 8
                ? true
                : false;
            };

            console.log("func", noEval(purchase));

            if (noEval(purchase)) {
              allRate[this.currensy[item]] = [
                // eslint-disable-next-line
                +eval(purchase), // eslint-disable-next-line
                +eval(sale),
                `../flag/${this.currensy[item]}.png`,
              ];
            }
            return null;
          });
          console.log(allRate);
          this.setState({ curensyRate: allRate });
          this.props.updateData(this.state.curensyRate);
        },
        (error) => {
          this.setState({
            error: error.message,
            isLoading: false,
          });
        }
      );
  };

  dateFormat = (date) => {
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let dateTimeFormat = new Intl.DateTimeFormat("ru-RU", options);
    return dateTimeFormat.format(date);
  };

  render() {
    let container;
    const { curensyRate, isLoading, date, error } = this.state;

    if (isLoading) {
      container = (
        <div>
          <div
            className="spinner-border text-secondary load"
            style={{ width: "6rem", height: "6rem" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
          Loading...
        </div>
      );
      return container;
    }
    if (error) {
      container = <h3>Error: {error.message}</h3>;
      return container;
    }

    container = (
      <table className="table table-sm">
        <thead>
          <tr>
            <td>Валюта</td>
            <td>Продажа</td>
            <td>Покупка</td>
          </tr>
        </thead>
        <tbody>
          {Object.keys(curensyRate).map((elem) => (
            <tr key={elem}>
              <td className="media-body">
                <img
                  src={curensyRate[elem][2]}
                  className="mr-3"
                  width="20"
                  height="16"
                  alt={[elem]}
                />
                {[elem]} :
              </td>
              <td>
                <strong>{curensyRate[elem][0].toFixed(2)}</strong> BYN
              </td>
              <td>
                <strong>{curensyRate[elem][1].toFixed(2)}</strong> BYN
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );

    return (
      <div className="mt-0 font">
        <h4 className="text-center">
          <p className="mb-0">Курсы валют</p>
          <p>Беларусбанк на</p>
          <div>{date}</div>
        </h4>
        {container}
      </div>
    );
  }
}
