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
              `../flag/${data[index].sellIso}.png`,
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
        this.props.updateData(this.state.curensyRate);
      })
      .catch((e) => {
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
          <p>Альфабанк на</p>
          <div>{date}</div>
        </h4>
        {container}
      </div>
    );
  }
}
