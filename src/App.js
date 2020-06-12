import React from "react";
import "./App.css";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./Main/Main";
import Customs from "./Customs/Customs";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRate: {
        USD: [1, 2.3748, "Доллар США", "../flag/USD.png"],
        EUR: [1, 2.7006, "Евро", "../flag/EUR.png"],
        RUB: [100, 3.4386, "Российских рублей", "../flag/RUB.png"],
      },
    };
  }

  updateDataApp = (value) => {
    this.setState({ currentyRate: value });
    console.log("app", this.state.currentRate);
  };
  noData = () => {
    return null;
  };

  render() {
    const { currentRate } = this.state;
    return (
      <div className="container">
        <header>
          <Header />
        </header>
        <main className="page">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Main updateDataApp={this.updateDataApp} />}
            />
            <Route
              path="/Customs"
              render={(props) => <Customs currentRate={currentRate} />}
            />
          </Switch>

          {/* <Redirect to="/" /> */}
        </main>
        <footer className="container fixed-bottom">
          <Footer />
        </footer>
      </div>
    );
  }
}
export default App;
