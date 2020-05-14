import React from "react";
import "./App.css";
import Header from "./Header/Header";
import Conv from "./Conv/Conv";
import Footer from "./Footer/Footer";
import Belarusbank from "./Banks/Belarusbank";
import Belagroprombank from "./Banks/Belagroprombank";
import NacBank from "./Banks/NacBank";
import Alfabank from "./Banks/Alfabank";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "Национальный банк",
      currentRate: {},
    };
  }

  updateData = (value) => {
    this.setState({ currentRate: value });
    console.log("app", this.state.currentRate);
  };

  render() {
    let component;
    if (this.state.select === "Национальный банк") {
      component = (
        <div className="d-flex justify-content-center">
          <NacBank updateData={this.updateData} />
        </div>
      );
    }
    if (this.state.select === "Беларусбанк") {
      component = (
        <div className="d-flex justify-content-center">
          {" "}
          <Belarusbank />
        </div>
      );
    }
    if (this.state.select === "Белагропромбанк") {
      component = (
        <div className="d-flex justify-content-center">
          <Belagroprombank />
        </div>
      );
    }
    if (this.state.select === "Альфабанк") {
      component = (
        <div className="d-flex justify-content-center">
          <Alfabank />
        </div>
      );
    }
    if (this.state.select === "Все банки") {
      component = (
        <div className="d-flex justify-content-between">
          <div>
            <NacBank />
            <Belarusbank />
          </div>
          <div>
            <Belagroprombank />
            <Alfabank />
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <Header />

        <form onSubmit={this.submitForm} name="form">
          <select
            onChange={this.myInput}
            name="select"
            className="custom-select custom-select-lg mb-3"
          >
            <option defaultValue="0">Национальный банк</option>
            <option defaultValue="1">Беларусбанк</option>
            <option defaultValue="2">Белагропромбанк</option>
            <option defaultValue="3">Альфабанк</option>
            <option defaultValue="4">Все банки</option>
          </select>
        </form>
        <div className="d-flex justify-content-around">
          {component}
          <div className="d-flex justify-content-center">
            <Conv currentRate={this.state.currentRate} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;
