import React, { Component } from "react";
import "./Main.css";
import Banks from "./Banks/Banks";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      date: "",
      curensyRate: {},
    };
    this.getRate();
    this.currensy = ["USD", "EUR", "RUB", "UAH"];
  }

  getRate = () => {
    fetch("https://www.nbrb.by/api/exrates/rates?periodicity=0")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ isLoading: false });
        let date = new Date(data[0].Date);
        date = this.dateFormat(date);
        this.setState({ date: date });

        let allRate = {};
        Object.keys(data).map((item, index) => {
          allRate[data[index].Cur_Abbreviation] = [
            data[index].Cur_Scale,
            data[index].Cur_Name,
            data[index].Cur_OfficialRate,
            `./flag/${data[index].Cur_Abbreviation}.png`,
          ];
        });

        let result = {};
        for (let item in this.currensy) {
          console.log(this.currensy[item]);
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
        <ul className="list-unstyled">
          {Object.keys(this.state.curensyRate).map((elem, index) => (
            <li className="media-body" key={index}>
              <img
                src={this.state.curensyRate[elem][3]}
                className="mr-3"
                width="20"
                height="16"
                alt={[elem]}
              />
              {this.state.curensyRate[elem][0] + " " + [elem] + "  "}
              {"   :    " + this.state.curensyRate[elem][2].toFixed(2) + " BYN"}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="Rate d-flex justify-content-around">
        <div>
          <p>Курсы валют НБ РБ на </p>
          <p className="Date">{this.state.date}</p>
          {container}
        </div>
        <div>
          <Banks />
        </div>
      </div>
    );
  }
}
