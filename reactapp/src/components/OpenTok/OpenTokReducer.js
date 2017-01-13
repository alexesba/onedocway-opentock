import {
  INITIALIZE_OPEN_TOCK,
  SET_CREDENTIALS
}  from "./OpenTokActions";

const DEFAULT_STATE = {
  initialized: false,
  credentials: {},
  loading: true
}

export default (state=DEFAULT_STATE, action) => {
  switch(action.type) {
    case INITIALIZE_OPEN_TOCK:
      return { ...state }
    case SET_CREDENTIALS:
      const { credentials } = action;
      return { ...state, credentials, loading: false }
    default:
      return state;
  }
}
