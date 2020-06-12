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
      `https://cors-anywhere.herokuapp.com/https://belapb.by/ExCardsDaily.php?ondate=${this.state.date}`
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
        // let today = new Date();
        // console.log("today", today.getDate());
        // today.setDate(today.getDate() - 1);
        // let yesterday = today.getDate();
        // console.log("yesterday", yesterday);

        let allRate = {};
        Object.keys(this.currensy).map((item, index) => {
          let arr = data[index].textContent.split("\n");
          allRate[this.currensy[item]] = [
            +arr[4],
            +arr[5],
            `../flag/${this.currensy[item]}.png`,
          ];
          return null;
        });

        console.log("allRate", allRate);
        this.setState({ curensyRate: allRate });
        this.props.updateData(this.state.curensyRate);
      })
      .catch((e) => {
        console.log(e, e.message);
        this.setState({ isLoading: false, error: e });
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
      if (error.message === "Cannot read property 'textContent' of undefined") {
        console.log("error!!");
        container = <h3>Курсы валют отсутсвуют. Попробуйте позже.</h3>;
        return container;
      } else {
        container = <h3>Error: {error.message}</h3>;
        return container;
      }
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
          <p>Белагропромбанк на</p>
          <div>{date}</div>
        </h4>
        {container}
      </div>
    );
  }
}
