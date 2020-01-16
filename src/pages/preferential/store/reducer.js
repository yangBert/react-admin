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
  editState: "",
  detailInfo: null,
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.QUERY_LIST:
      newState.list = action.list
      newState.pagination = action.pagination
      break;
    case types.CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.CHANGE_EDIT_STRATEGY_NAME:
      newState.editStrategyName = action.editStrategyName
      break;
    case types.CHANGE_EDIT_STRATEGY_DESC:
      newState.editStrategyDesc = action.editStrategyDesc
      break;
    case types.CHANGE_SAVE_LOADING:
      newState.saveLoading = action.saveLoading
      break;
    case types.CHANGE_EDIT_CONTENT:
      newState.editContent = action.editContent
      break;
    case types.INIT_NOTICE_DETAIL:
      newState.detailInfo = action.detailInfo
      break;
    case types.CHANGE_EDIT_STATE:
      newState.editState = action.editState
      break;
    default:
      break;
  }
  return newState
}