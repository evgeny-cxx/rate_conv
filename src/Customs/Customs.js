import React from "react";
import "./Customs.css";

class Customs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sale: null,
    };
  }

  submitForm = (e) => {
    e.preventDefault();
  };

  myInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value });
  };

  customs = () => {
    const { rate } = this.props.currentRate;
  };
  render() {
    // const { rate } = this.props.currentRate;
    return (
      <div>
        <form onSubmit={this.submitForm} name="form">
          <div>
            <input
              onChange={this.myInput}
              type="text"
              name="sale"
              placeholder="Введите цену"
            />
          </div>
        </form>
        {/* <div>{this.props.currentRate}</div> */}
      </div>
    );
  }
}

export default Customs;
