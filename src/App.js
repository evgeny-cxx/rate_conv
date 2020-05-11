import React from "react";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Conv from "./Conv/Conv";
import Footer from "./Footer/Footer";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App container">
        <Header />
        <div className=" d-flex justify-content-around ">
          <Main />
        </div>
        <Conv />
        <Footer />
      </div>
    );
  }
}
export default App;
