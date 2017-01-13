export const INITIALIZE_OPEN_TOCK = "INITIALIZE_OPEN_TOCK";
export const SET_CREDENTIALS = "SET_CREDENTIALS";
import Api from "../../api";
import OpenTokService from "./OpenTokService";

export const initializeOpentTock = options => {
  return {
    type: INITIALIZE_OPEN_TOCK,
    options
  }
}

export const setCredentials = credentials => {
  return {
    type: SET_CREDENTIALS,
    credentials
  }
}

export const configureTokens = options => {
  return dispatch => {
    return Api.get("opentok/token")
      .then(response => {
        const credentials = response.body;
        dispatch(setCredentials(credentials));
        OpenTokService.init(credentials);
      })
      .catch( error => console.log(error))
  }
}
