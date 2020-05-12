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
    this.getRate();
    this.currensy = ["USD", "EUR", "RUB", "UAH"];
  }

  getRate = () => {
    const xhr = new XMLHttpRequest();
    const url = "https://belarusbank.by/api/kurs_cards";

    xhr.open("GET", url);
    // xhr.onreadystatechange = someHandler;
    xhr.send();
    console.log(xhr);

    // fetch(
    //   "https://cors-anywhere.herokuapp.com/" +
    //     "https://belarusbank.by/api/kurs_cards"
    // )
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     data = eval(data);
    //     data = JSON.stringify(data, null, 2);

    //     console.table("blrbank:  " + data);
    //     console.table("blrbank:  " + data[(0, 89)]);
    //     this.setState({ isLoading: false });
    // let date = new Date(data[0].Date);
    // date = this.dateFormat(date);
    // this.setState({ date: date });

    // let allRate = {};
    // Object.keys(data).map((item, index) => {
    //   allRate[data[index].Cur_Abbreviation] = [
    //     data[index].Cur_Scale,
    //     data[index].Cur_Name,
    //     data[index].Cur_OfficialRate,
    //     `./flag/${data[index].Cur_Abbreviation}.png`,
    //   ];
    // });

    // let result = {};
    // for (let item in this.currensy) {
    //   console.log(this.currensy[item]);
    //   result[this.currensy[item]] = allRate[this.currensy[item]];
    // }
    // console.log(result);
    // this.setState({ curensyRate: result });
    // });
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
      <div className="Rate">
        <p>Курсы валют Беларусбанк на </p>
        <p className="Date">{this.state.date}</p>
        <div>{container}</div>
      </div>
    );
  }
}
