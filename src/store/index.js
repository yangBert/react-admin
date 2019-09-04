import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers(reducers);

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default store;
