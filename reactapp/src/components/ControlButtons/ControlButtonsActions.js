export const CONNECTING_TO_CALL = "CONNECTING_TO_CALL";
export const DISCONNECTING_TO_CALL = "DISCONNECT_TO_CALL";
export const DISCONNECTED_TO_CALL = "DISCONNECTED_TO_CALL";
export const CONNECTED_TO_CALL = "CONNECTED_TO_CALL";
import { OpenTokService, OpenTokActions } from "../OpenTok";

const connectingToCall = (role) => {
  return {
    type: CONNECTING_TO_CALL,
    role
  }
}

const disconnectingToCall = () => {
  return { type: DISCONNECTING_TO_CALL };
}
const connectedToCall = () => {
  return { type: CONNECTED_TO_CALL }
}

const disconnected = () => {
  return { type: DISCONNECTED_TO_CALL }
}

export const disconnectToCall = () => {
  return dispatch => {
    dispatch(disconnectingToCall());
    OpenTokService.disconnect().then(
      () => dispatch(disconnected())
    ).catch(error  => console.log(error))
  }
}

export const connectToCall = (type) => {
  return dispatch => {
    OpenTokService.getCredentials(type).then(credentials => {
      OpenTokActions.setCredentials(credentials).then( actionCredential => {
        dispatch(actionCredential);
        OpenTokService.initSession(type).then(connection  => {
          dispatch(connectingToCall(type))
          OpenTokService.connect().then( () => dispatch(connectedToCall())).
            catch(error => console.log(error))
        });
      });
    });
  }
}

