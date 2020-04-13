import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  typesList: [],
  tableList: [],
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
    case types.INIT_APP_STATISTICAL_TYPES_LIST:
      newState.typesList = action.typesList
      break;
    case types.INIT_APP_STATISTICAL_TABLE_LIST:
      newState.tableList = action.tableList
      break;
    case types.CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    default:
      break;
  }
  return newState
}