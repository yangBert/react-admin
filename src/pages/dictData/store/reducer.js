import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  typeList: [],
  dataList: [],
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
    case types.DICT_DATA_QUERY_DICT_TYPE_LIST:
      newState.typeList = action.typeList
      break;
    case types.DICT_DATA_QUERY_DICT_DATA_LIST:
      newState.dataList = action.dataList
      newState.pagination = action.pagination
      break;
    case types.DICT_DATA_CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.DICT_DATA_CHANGE_CONFIRM_LOADING:
      newState.ConfirmLoading = action.ConfirmLoading
      break;
    case types.DICT_DATA_CHANGE_ADD_MODAL_VISIBLE:
      newState.operationType = action.operationType
      newState.addModalvisible = action.addModalvisible
      newState.record = action.record
      break;
    default:
      break;
  }
  return newState
}