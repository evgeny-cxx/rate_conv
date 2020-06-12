import React from "react";
import "./App.css";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./Main/Main";
import Customs from "./Customs/Customs";

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentRate: {},
  //   };
  // }

  // updateData = (value) => {
  //   this.setState({ currentRate: value });
  //   console.log("app", this.state.currentRate);
  // };
  // noData = () => {
  //   return null;
  // };

  render() {
    return (
      <div className="container">
        <header>
          <Header />
        </header>
        <main className="page">
          <Switch>
            <Route path="/Customs" component={Customs} />
            <Route exact path="/" component={Main} />

            {/* <Redirect to="/" /> */}
          </Switch>
        </main>
        <footer className="container fixed-bottom">
          <Footer />
        </footer>
      </div>
    );
  }
}
export default App;
