import { connect } from "react-redux";
import { configureTokens } from "./OpenTokActions";
import OpenTok from "./OpenTok";

const mapStateToProps = state => {
  return state.OpenTokReducer
}

const mapDispatchToProps = dispatch => {
  return {
    onConfigureTokens: () => dispatch(configureTokens())
  }
}

const OpenTokContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenTok);

export default OpenTokContainer;
