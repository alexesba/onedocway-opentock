import {
  INITIALIZE_OPEN_TOCK,
  SET_CREDENTIALS,
  SET_USERNAME
}  from "./OpenTokActions";

const DEFAULT_STATE = {
  initialized: false,
  credentials: {},
  loading: true,
  username: ""
}

export default (state=DEFAULT_STATE, action) => {
  switch(action.type) {
    case INITIALIZE_OPEN_TOCK:
      return { ...state }
    case SET_CREDENTIALS:
      const { credentials } = action;
      return { ...state, credentials, loading: false }
    case SET_USERNAME:
      return {...state, username: action.username }
    default:
      return state;
  }
}
