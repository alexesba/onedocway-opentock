import React, { Component, PropTypes } from "react";
import CSSModules from "react-css-modules";
import style from "./style.scss";

import { ControlButtonsContainer } from "../ControlButtons";

class OpenTok extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    openTokUrl: PropTypes.string.isRequired,
    onSetUsername: PropTypes.func.isRequired
  }

  static defaultProps = {
    openTokUrl: "https://static.opentok.com/v2/js/opentok.js",
    onSetUsername: (username) => console.log("Override set username Action"),
    loading: true
  }

  componentDidMount() {
    const { openTokUrl } = this.props;
    const script = document.createElement("script");
    script.src = openTokUrl;
    document.body.appendChild(script);
  }

  render() {
    return (
      <div>
        <div styleName="chat-container">
          <div id="publisherContainer" styleName="publisher-container"></div>
          <div id="subscriberContainer" styleName="subscriber-container"></div>
        </div>
        <div>
          <ControlButtonsContainer/>
        </div>
      </div>
    );
  }
}

export default CSSModules(OpenTok, style);
