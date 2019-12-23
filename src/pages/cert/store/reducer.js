import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  params: {},
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.QUERY_CERT_LIST:
      newState.list = action.list
      break;
    case types.CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    default:
      break;
  }
  return newState
}