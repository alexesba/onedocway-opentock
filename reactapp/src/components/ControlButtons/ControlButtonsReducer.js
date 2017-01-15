import {
  CONNECTING_TO_CALL,
  CONNECTED_TO_CALL,
  DISCONNECTING_TO_CALL,
  DISCONNECTED_TO_CALL
} from "./ControlButtonsActions";

const DEFAULT_STATE = {
  connecting: false,
  disconnecting: false,
  connected: false,
  role: ""
}
export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case CONNECTING_TO_CALL:
      return { ...state, connecting: true, role: action.role }
    case CONNECTED_TO_CALL:
      return { ...state, connecting: false, connected: true }
    case DISCONNECTING_TO_CALL:
      return { ...state, disconnecting: true }
    case DISCONNECTED_TO_CALL:
      return { ...state, ...DEFAULT_STATE}
    default:
      return state;
  }
}
