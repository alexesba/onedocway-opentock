import { connect } from "react-redux";
import ControlButtons from "./ControlButtons";
import { connectToCall } from "./ControlButtonsActions";

const mapStateToProps = state => {
  return state.ControlButtonsReducer
}

const mapDispatchToProps = dispatch => {
  return {
    onPhysicianConnect: () => dispatch(connectToCall("physician")),
    onPatientConnect: () => dispatch(connectToCall("patient"))
  }
}

const ControlButtonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlButtons);

export default ControlButtonsContainer;
