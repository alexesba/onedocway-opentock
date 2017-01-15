export const CONNECTING_TO_CALL = "CONNECTED_TO_CALL";
export const DISCONNECTING_TO_CALL = "DISCONNECT_TO_CALL";
export const DISCONNECTED_TO_CALL = "DISCONNECTED_TO_CALL";
export const CONNECTED_TO_CALL = "CONNECTED_TO_CALL";
import { OpenTokService, OpenTokActions } from "../OpenTok";

const connectingToCall = (role) => {
  return {
    type: CONNECTING_TO_CALL,
    role
  };
}

export const connectToCall = (type) => {
  return dispatch => {
    OpenTokService.getCredentials(type).then(credentials => {
      OpenTokActions.setCredentials(credentials).then( actionCredential => {
        dispatch(actionCredential);
        OpenTokService.initSession(type).then(connection  => {
          dispatch(connectingToCall(type))
          OpenTokService.connect(type)
        });
      });
    });
  }
}

