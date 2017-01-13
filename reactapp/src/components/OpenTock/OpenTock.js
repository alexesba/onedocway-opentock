import React, { Component, PropTypes } from "react";
import CSSModules from "react-css-modules";
import style from "./style.scss";

class OpenTock extends Component {

  constructor(props) {
    super(props);
    this.onLoadScript = this.onLoadScript.bind(this);
  }

  static propTypes = {
    openTockUrl: PropTypes.string.isRequired,
    onConfigureTokens: PropTypes.func.isRequired
  }

  static defaultProps = {
    openTockUrl: "https://static.opentok.com/v2/js/opentok.js",
    loading: true
  }

  onLoadScript(script) {
    this.props.onConfigureTokens(script)
  }

  componentDidMount() {
    const { openTockUrl } = this.props;
    const script = document.createElement("script");
    script.src = openTockUrl;
    script.onload = (url) => this.onLoadScript(url);
    document.body.appendChild(script);
  }

  render() {
    if (this.props.loading) return <div>Initializing OpenTok calls...</div>;
    return (
      <li>
        <div id="publisherContainer" styleName="publisher-container"></div>
        <div id="subscriberContainer" styleName="subscriber-container"></div>
      </li>
    );
  }
}

export default CSSModules(OpenTock, style);
