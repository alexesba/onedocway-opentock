import React, { Component, PropTypes } from "react";
import CSSModules from "react-css-modules";
import style from "./style.scss";

class OpenTok extends Component {

  constructor(props) {
    super(props);
    this.onLoadScript = this.onLoadScript.bind(this);
  }

  static propTypes = {
    openTokUrl: PropTypes.string.isRequired,
    onConfigureTokens: PropTypes.func.isRequired
  }

  static defaultProps = {
    openTokUrl: "https://static.opentok.com/v2/js/opentok.js",
    loading: true
  }

  onLoadScript(script) {
    this.props.onConfigureTokens(script)
  }

  componentDidMount() {
    const { openTokUrl } = this.props;
    const script = document.createElement("script");
    script.src = openTokUrl;
    script.onload = (url) => this.onLoadScript(url);
    document.body.appendChild(script);
  }

  render() {
    if (this.props.loading) return <div>Initializing OpenTok calls...</div>;
    return (
      <div>
        <div styleName="chat-container">
          <div id="publisherContainer" styleName="publisher-container"></div>
          <div id="subscriberContainer" styleName="subscriber-container"></div>
        </div>
        <div>
          <button>Connect</button>
        </div>
      </div>
    );
  }
}

export default CSSModules(OpenTok, style);
