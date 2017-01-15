import { connect } from "react-redux";
import OpenTok from "./OpenTok";

const mapStateToProps = state => {
  return state.OpenTokReducer
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const OpenTokContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenTok);

export default OpenTokContainer;
