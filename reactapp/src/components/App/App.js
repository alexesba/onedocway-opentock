import React, { Component } from "react";
import CSSModules from "react-css-modules";
import style from "./style.scss";
import { OpenTockContainer } from "../OpenTock";

class App extends Component {

  render() {
    return (
      <OpenTockContainer/>
    );
  }

};

export default CSSModules(App, style);
