import React, { Component } from "react";
import "./Main.css";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRate: {},
      date: "",
      curensyRate: {},
    };
    this.getRate();
    this.currensy = ["USD", "EUR", "RUB", "UAH"];
    // this.showRate();
  }

  getRate = () => {
    fetch("https://www.nbrb.by/api/exrates/rates?periodicity=0")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let date = data[0].Date.substr(0, 10);
        this.setState({ date: date });
        let allRate = {};
        Object.keys(data).map((item, index) => {
          allRate[data[index].Cur_Abbreviation] = data[index].Cur_OfficialRate;
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

  render() {
    return (
      <div className="heigth">
        <h2>Курсы валют на </h2>
        <p>{this.state.date}</p>
        <ul className="justify-content-left">
          {Object.keys(this.state.curensyRate).map((elem, index) => (
            <li className="nav-item" key={index}>
              {elem + " : " + this.state.curensyRate[elem].toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
