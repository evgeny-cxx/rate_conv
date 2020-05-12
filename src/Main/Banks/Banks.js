import React, { Component } from "react";
import "./Banks.css";

export default class Banks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      date: "",
      curensyRate: {},
    };
    // this.getRate();
    this.getRateAgro();
    this.currensy = ["USD", "EUR", "RUB"];
  }

  getRateAgro = () => {
    fetch(
      "https://cors-anywhere.herokuapp.com/" +
        "https://belapb.by/ExCardsDaily.php"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // data = data[0];
        console.table("blrbank:  ", data);
        // this.setState({ isLoading: false });

        // let date = new Date(data.kurs_date_time);
        // date = this.dateFormat(date);
        // this.setState({ date: date });

        // let allRate = {};
        // Object.keys(this.currensy).map((item, index) => {
        //   let sale = `data.${this.currensy[item]}CARD_out`;
        //   let purchase = `data.${this.currensy[item]}CARD_in`;
        //   allRate[this.currensy[item]] = [
        //     +eval(purchase),
        //     +eval(sale),
        //     `./flag/${this.currensy[item]}.png`,
        //   ];
        // });
        // console.log(allRate);
        // this.setState({ curensyRate: allRate });
      });
  };

  getRateBlr = () => {
    fetch(
      "https://cors-anywhere.herokuapp.com/" +
        "https://belarusbank.by/api/kurs_cards"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data = data[0];
        console.table("blrbank:  ", data);
        this.setState({ isLoading: false });

        let date = new Date(data.kurs_date_time);
        date = this.dateFormat(date);
        this.setState({ date: date });

        let allRate = {};
        Object.keys(this.currensy).map((item, index) => {
          let sale = `data.${this.currensy[item]}CARD_out`;
          let purchase = `data.${this.currensy[item]}CARD_in`;
          allRate[this.currensy[item]] = [
            +eval(purchase),
            +eval(sale),
            `./flag/${this.currensy[item]}.png`,
          ];
        });
        console.log(allRate);
        this.setState({ curensyRate: allRate });
      });
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
    if (this.state.isLoading) {
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
    } else {
      container = (
        <table className="list-unstyled">
          <tr>
            <td>Валюта</td>
            <td>Продажа</td>
            <td>Покупка</td>
          </tr>

          {Object.keys(this.state.curensyRate).map((elem, index) => (
            <tr>
              <td className="media-body" key={index}>
                <img
                  src={this.state.curensyRate[elem][2]}
                  className="mr-3"
                  width="20"
                  height="16"
                  alt={[elem]}
                />
                {[elem]} :
              </td>
              <td>{this.state.curensyRate[elem][0].toFixed(2)} BYN.</td>
              <td>{this.state.curensyRate[elem][1].toFixed(2)} BYN.</td>
            </tr>
          ))}
        </table>
      );
    }
    return (
      <div className="Rate">
        <p>Курсы валют Беларусбанк на </p>
        <p className="Date">{this.state.date}</p>
        <div>{container}</div>
      </div>
    );
  }
}
