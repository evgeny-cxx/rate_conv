import React, { Component } from "react";
import "./Belagroprombank.css";

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
      "https://cors-anywhere.herokuapp.com/https://belapb.by/ExCardsDaily.php"
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        let parser = new DOMParser(),
          xmlDoc = parser.parseFromString(data, "text/xml");
        data = xmlDoc.getElementsByTagName("Currency");
        console.log("agro:  ", data);
        this.setState({ isLoading: false });

        let date = new Date(
          xmlDoc.getElementsByTagName("DailyExCards")[0].attributes[0].value
        );
        date = this.dateFormat(date);
        console.log("Date  ", date);
        this.setState({ date: date });

        let allRate = {};
        Object.keys(this.currensy).map((item, index) => {
          let arr = data[index].textContent.split("\n");
          allRate[this.currensy[item]] = [
            +arr[4],
            +arr[5],
            `./flag/${this.currensy[item]}.png`,
          ];
          return null;
        });

        console.log("allRate", allRate);
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
                BYN.{" "}
              </td>
              <td>
                <strong>{this.state.curensyRate[elem][1].toFixed(2)}</strong>{" "}
                BYN.{" "}
              </td>
            </tr>
          ))}
        </table>
      );
    }
    return (
      <div className="Rate">
        <p>Курсы валют Белагропромбанк на </p>
        <p className="Date">{this.state.date}</p>
        <div>{container}</div>
      </div>
    );
  }
}
