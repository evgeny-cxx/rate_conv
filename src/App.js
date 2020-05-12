import React from "react";
import "./App.css";
import Header from "./Header/Header";
import Conv from "./Conv/Conv";
import Footer from "./Footer/Footer";
import Belarusbank from "./Banks/Belarusbank";
import Belagroprombank from "./Banks/Belagroprombank";
import NacBank from "./Banks/NacBank";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "Национальный банк",
    };
  }

  submitForm = (e) => {
    e.preventDefault();
  };

  myInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value });
  };

  render() {
    let component;
    if (this.state.select === "Национальный банк") {
      component = <NacBank />;
    }
    if (this.state.select === "Беларусбанк") {
      component = <Belarusbank />;
    }
    if (this.state.select === "БелАгропромбанк") {
      component = <Belagroprombank />;
    }

    return (
      <div className="App container">
        <Header />
        <form onSubmit={this.submitForm} name="form">
          <select
            onChange={this.myInput}
            name="select"
            className="custom-select custom-select-lg mb-3"
          >
            <option defaultValue="0">Национальный банк</option>
            <option defaultValue="1">Беларусбанк</option>
            <option defaultValue="2">БелАгропромбанк</option>
          </select>
        </form>
        <div className="d-flex justify-content-center">{component}</div>
        <Conv />
        <Footer />
      </div>
    );
  }
}
export default App;
