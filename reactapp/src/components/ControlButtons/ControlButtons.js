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
    onPhysicianDisconnect: PropTypes.func.isRequired,
    onPatientConnect: PropTypes.func.isRequired,
    onPatientDisconnect: PropTypes.func.isRequired
  }

  static defaultProps = {
    connected: false,
    disconnectLabel: "Disconect",
    connectLabel: "Connect",
    disconnectingLabel: "Disconnecting...",
    connectingLabel: "Connecting...",
    onPhysicianConnect: () => console.log("override onPhysicianConnect Action"),
    onPhysicianDisconnect: () => console.log("override onPhysicianDisconnect Action"),
    onPatientConnect: () => console.log("override onPatientConnect Action"),
    onPatientDisconnect: () => console.log("override onPatientDisconnect Action")
  }

  constructor(props) {
    super(props);
    this.getLabel = this.getLabel.bind(this);
    this.getAction = this.getAction.bind(this);
  }

  getAction(type) {
    const { status, onPhysicianDisconnect, onPhysicianConnect, connecting,
      disconnecting, onPatientConnect, onPatientDisconnect, role} =  this.props;
    switch(type){
      case "physician":
        return status ? onPhysicianDisconnect : onPhysicianConnect;
      case "patient":
        return status ? onPatientDisconnect : onPatientConnect;
    }
  }

  getLabel(type) {
    const { connected, disconnecting, connecting, disconnectLabel,
      connectingLabel, connectLabel, loadingLabel, role } =  this.props;
    if(!connected && role != type) return `${connectLabel} as ${type}`;
    if(connected && role == type) return connectLabel;
    if(connecting && role == type) return connectingLabel;
  }

  render() {
    return (
      <div styleName="control-buttons">
        <button onClick={ this.getAction("physician") }>
          { this.getLabel("physician") }
        </button>
        <button onClick={ this.getAction("patient")}>
          { this.getLabel("patient") }
        </button>
      </div>
    )
  }
}

export default CSSModules(ControlButtons, style);
