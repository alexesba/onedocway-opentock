import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from "redux-thunk";
import { browserHistory } from 'react-router'
import { routerMiddleware } from "react-router-redux";

// Import reducers
import  { AppReducer } from "./components/App";
import { OpenTokReducer } from "./components/OpenTok";
import { ControlButtonsReducer } from "./components/ControlButtons";

const reactRouterReduxMiddleware = routerMiddleware(browserHistory);

let createStoreWithMiddleware = applyMiddleware(
  thunk, reactRouterReduxMiddleware
)(createStore);

let reducers = combineReducers({
  AppReducer,
  OpenTokReducer,
  ControlButtonsReducer
});

export default createStoreWithMiddleware(reducers);

