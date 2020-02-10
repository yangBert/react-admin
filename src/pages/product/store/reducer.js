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
  allProductType: []
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.QUERY_DICT_TYPE_LIST:
      newState.typeList = action.typeList
      break;
    case types.QUERY_DICT_DATA_LIST:
      newState.list = action.list
      newState.pagination = action.pagination
      break;
    case types.CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.CHANGE_CONFIRM_LOADING:
      newState.ConfirmLoading = action.ConfirmLoading
      break;
    case types.CHANGE_ADD_MODAL_VISIBLE:
      newState.operationType = action.operationType
      newState.addModalvisible = action.addModalvisible
      newState.record = action.record
      break;
    case types.INIT_ALL_PRODUCT_TYPE:
      newState.allProductType = action.allProductType
      break;
    default:
      break;
  }
  return newState
}