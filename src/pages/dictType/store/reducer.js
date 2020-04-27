import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  params: {},
  ConfirmLoading: false,
  operationType: "",
  addModalvisible: false,
  record: {},
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.DICT_TYPE_QUERY_DICT_TYPE_LIST:
      newState.list = action.list
      newState.pagination = action.pagination
      break;
    case types.DICT_TYPE_CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.DICT_TYPE_CHANGE_CONFIRM_LOADING:
      newState.ConfirmLoading = action.ConfirmLoading
      break;
    case types.DICT_TYPE_CHANGE_ADD_MODAL_VISIBLE:
      newState.operationType = action.operationType
      newState.addModalvisible = action.addModalvisible
      newState.record = action.record
      break;
    default:
      break;
  }
  return newState
}