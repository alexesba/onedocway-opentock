import { connect } from "react-redux";
import { configureTokens } from "./OpenTockActions";
import OpenTock from "./OpenTock";

const mapStateToProps = state => {
  return state.OpenTockReducer
}

const mapDispatchToProps = dispatch => {
  return {
    onConfigureTokens: () => dispatch(configureTokens())
  }
}

const OpenTockContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenTock);

export default OpenTockContainer;
