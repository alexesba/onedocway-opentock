import React, { Component, PropTypes } from "react";
import CSSModules from "react-css-modules";
import style from "./style.scss";

class ControlButtons extends Component {

  static propTypes = {
    connected: PropTypes.bool.isRequired,
    connecting: PropTypes.bool.isRequired,
    disconnecting: PropTypes.bool.isRequired,
    disconnectLabel: PropTypes.string.isRequired,
    connectLabel: PropTypes.string.isRequired,
    onPhysicianConnect: PropTypes.func.isRequired,
    onPatientConnect: PropTypes.func.isRequired,
    onDisconnect: PropTypes.func.isRequired
  }

  static defaultProps = {
    connected: false,
    disconnectLabel: "Disconect",
    connectLabel: "Connect",
    disconnectingLabel: "Disconnecting...",
    connectingLabel: "Connecting...",
    onPhysicianConnect: () => console.log("override onPhysicianConnect Action"),
    onPatientConnect: () => console.log("override onPatientConnect Action"),
    onDisconnect: () => console.log("override onPatientDisconnect Action")
  }

  constructor(props) {
    super(props);
    this.getLabel = this.getLabel.bind(this);
    this.getAction = this.getAction.bind(this);
  }

  getAction(type) {
    const { connected, onPhysicianConnect,onPatientConnect, connecting,
      disconnecting, onDisconnect} =  this.props;
    if (connecting || disconnecting) return () => console.log("Connection in Progress");
    switch(type){
      case "physician":
        return connected ? onDisconnect : onPhysicianConnect;
      case "patient":
        return connected ? onDisconnect : onPatientConnect;
    }
  }

  getLabel(type) {
    const { connected, disconnecting, connecting, disconnectLabel,
      connectingLabel, connectLabel, loadingLabel, role } =  this.props;
    if(disconnecting) return `Disconnecting ${role}...`
    if(!connected && role != type) return `${connectLabel} as ${type}`;
    if(connected && role == type) return disconnectLabel;
    if(connecting && role == type) return connectingLabel;
  }

  renderPhysicianButton() {
    const { role, connected } = this.props;
    const shouldRender = connected && role === "physician" || !connected
    return(
      shouldRender ?
      <button onClick={ this.getAction("physician") }>
        { this.getLabel("physician") }
      </button> : null
    )
  }

  renderPatientButton() {
    const { role, connected } = this.props;
    const shouldRender = connected && role === "patient" || !connected
    return(
      shouldRender ?
      <button styleName={ connected ? 'connected' : null }onClick={ this.getAction("patient") }>
        { this.getLabel("patient") }
      </button> : null
    )
  }

  render() {
    const { connected, role} = this.props;
    return (
      <div styleName="control-buttons">
        <h3>{ connected ? `Connected as: ${this.props.role}` : null }</h3>
         { this.renderPhysicianButton() }
         { this.renderPatientButton() }
      </div>
    )
  }
}

export default CSSModules(ControlButtons, style);
