import React, { Component } from "react";
import "./Alfabank.css";

export default class Banks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      date: "",
      curensyRate: {},
    };
    this.getRate();
    this.currensy = ["USD", "EUR", "RUB"];
  }

  getRate = () => {
    fetch(
      // "https://cors-anywhere.herokuapp.com/" +
      "https://developerhub.alfabank.by:8273/partner/1.0.0/public/rates"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data = data.rates;

        console.table("alfa:  ", data);

        this.setState({ isLoading: false });

        let date = new Date(data[3].date);
        date = this.dateFormat(date);
        this.setState({ date: date });

        let allRate = {};
        Object.keys(data).map((item, index) => {
          if (data[index].buyIso === "BYN") {
            allRate[data[item].sellIso] = [
              data[index].buyRate,
              data[index].sellRate,
              `./flag/${data[index].sellIso}.png`,
            ];
          }
          return null;
        });
        console.log(allRate);

        let result = {};
        for (let item in this.currensy) {
          result[this.currensy[item]] = allRate[this.currensy[item]];
        }
        console.log(result);
        this.setState({ curensyRate: result });
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
          <thead>
            <tr>
              <td>Валюта</td>
              <td>Продажа</td>
              <td>Покупка</td>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.curensyRate).map((elem, index) => (
              <tr key={index}>
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
                <td>
                  <strong>{this.state.curensyRate[elem][0].toFixed(2)}</strong>{" "}
                  BYN
                </td>
                <td>
                  <strong>{this.state.curensyRate[elem][1].toFixed(2)}</strong>{" "}
                  BYN
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return (
      <div className="Rate">
        <p>Курсы валют Альфабанк на </p>
        <p className="Date">{this.state.date}</p>
        <div>{container}</div>
      </div>
    );
  }
}
