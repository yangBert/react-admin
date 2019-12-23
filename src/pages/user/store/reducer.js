import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  spinning: false,
  params: {},

};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'NAV_TO':
      newState.NAV_TO = action.NAV_TO
      break;
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.QUERY_USER_LIST:
      newState.list = action.list
      newState.pagination = action.pagination
      break;
    case types.CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    default:
      break;
  }
  return newState
}