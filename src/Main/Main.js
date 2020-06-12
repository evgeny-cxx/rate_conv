import React from "react";
import "./Main.css";
import Belarusbank from "../Banks/Belarusbank";
import Belagroprombank from "../Banks/Belagroprombank";
import NacBank from "../Banks/NacBank";
import Alfabank from "../Banks/Alfabank";
import Conv from "../Conv/Conv";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "Национальный банк",
      currentRate: {},
    };
  }

  updateData = (value) => {
    this.setState({ currentRate: value });
    this.props.updateDataApp(this.state.curentRate);
    console.log("main", this.state.currentRate);
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
    let component;
    if (this.state.select === "Национальный банк") {
      component = <NacBank updateData={this.updateData} />;
    }
    if (this.state.select === "Беларусбанк") {
      component = <Belarusbank updateData={this.updateData} />;
    }
    if (this.state.select === "Белагропромбанк") {
      component = <Belagroprombank updateData={this.updateData} />;
    }
    if (this.state.select === "Альфабанк") {
      component = <Alfabank updateData={this.updateData} />;
    }
    if (this.state.select === "Все банки") {
      component = (
        <div>
          <div className="row">
            <div className="mx-auto col-sm-6">
              <NacBank updateData={this.updateData} />
            </div>
            <div className="mx-auto col-sm-6">
              <Belarusbank updateData={this.noData} />
            </div>
          </div>

          <div className="row">
            <div className="mx-auto col-sm-6">
              <Belagroprombank updateData={this.noData} />
            </div>
            <div className="mx-auto col-sm-6">
              <Alfabank updateData={this.noData} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="row d-flex justify-content-around">
          <div className="d-flex align-self-center ">{component}</div>
          <div className="align-self-center">
            <div className=" mt-5">{selectForm}</div>
            <div>
              <Conv currentRate={this.state.currentRate} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Main;
