import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'
//import { routerMiddleware } from 'react-router-redux';

// let createHistory = require('history').createHashHistory;
// let history = createHistory();   // 初始化history
// let routerWare = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers(reducers);

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default store;
