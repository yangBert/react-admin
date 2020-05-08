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
    case types.ACCOUNT_STATISTICAL_TYPES_LIST:
      newState.typesList = action.typesList
      break;
    case types.ACCOUNT_STATISTICAL_TABLE_LIST:
      newState.tableList = action.tableList
      newState.pagination = action.pagination
      break;
    case types.ACCOUNT_STATISTICAL_CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    default:
      break;
  }
  return newState
}