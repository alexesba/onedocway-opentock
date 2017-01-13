import React, { Component } from "react";
import CSSModules from "react-css-modules";
import style from "./style.scss";
import { OpenTokContainer } from "../OpenTok";

class App extends Component {

  render() {
    return (
      <OpenTokContainer/>
    );
  }

};

export default CSSModules(App, style);
