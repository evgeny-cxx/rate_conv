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
  noData = () => {
    return null;
  };

  submitForm = (e) => {
    e.preventDefault();
  };

  myInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value });
  };

  render() {
    let selectForm = (
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
    );
    let component, allbanks;
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
          <Belarusbank updateData={this.updateData} />
        </div>
      );
    }
    if (this.state.select === "Белагропромбанк") {
      component = (
        <div className="d-flex justify-content-center">
          <Belagroprombank updateData={this.updateData} />
        </div>
      );
    }
    if (this.state.select === "Альфабанк") {
      component = (
        <div className="d-flex justify-content-center">
          <Alfabank updateData={this.updateData} />
        </div>
      );
    }
    if (this.state.select === "Все банки") {
      component = (
        <div className="mx-auto row row-cols-2">
          <div className="row">
            <div className="col">
              <NacBank updateData={this.updateData} />
            </div>
            <div className="col">
              <Belarusbank updateData={this.noData} />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Belagroprombank updateData={this.noData} />
            </div>
            <div className="col">
              <Alfabank updateData={this.noData} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container-sm container">
        <header>
          <Header />
        </header>
        <div className="container-fluid row-cols-2 d-flex">
          <div className="flex-column col-6 col-lg-4 align-self-center">
            <div className=" mt-5">{selectForm}</div>
            <h5 className="convert mb-3 ">Конвертор валют</h5>
            <div className="mt-0 mb-5">
              <Conv currentRate={this.state.currentRate} />
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-8 mt-5 align-self-center ">
            {component}
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}
export default App;
