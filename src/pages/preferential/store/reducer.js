import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  saveLoading: false,
  params: {},
  editStrategyName: "",
  editStrategyDesc: "",
  editType: "",
  editStrategyRule: "",
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.PREFERENTIAL_QUERY_LIST:
      newState.list = action.list
      newState.pagination = action.pagination
      break;
    case types.PREFERENTIAL_CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.PREFERENTIAL_CHANGE_EDIT_STRATEGY_NAME:
      newState.editStrategyName = action.editStrategyName
      break;
    case types.PREFERENTIAL_CHANGE_EDIT_STRATEGY_DESC:
      newState.editStrategyDesc = action.editStrategyDesc
      break;
    case types.PREFERENTIAL_CHANGE_SAVE_LOADING:
      newState.saveLoading = action.saveLoading
      break;
    case types.PREFERENTIAL_CHANGE_EDIT_TYPE:
      newState.editType = action.editType
      break;
    case types.PREFERENTIAL_CHANGE_EDIT_STRATEGY_RULE:
      newState.editStrategyRule = action.editStrategyRule
      break;
    default:
      break;
  }
  return newState
}