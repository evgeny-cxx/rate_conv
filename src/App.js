import React from "react";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Conv from "./Conv/Conv";
import Footer from "./Footer/Footer";

class App extends React.Component {
  render() {
    return (
      <div className="App container">
        <Header />
        <h1>Helloo! </h1>
        <Main />
        <Conv />
        <Footer />
      </div>
    );
  }
}
export default App;
