import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  productList: [],
  pagination: {},
  spinning: false,
  params: {},
  editProductCode: "",
  editName: "",
  editOrders: "",
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.INIT_LIST:
      newState.list = action.list
      break;
    case types.CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.INIT_PRODUCT_LIST:
      newState.productList = action.productList
      break;
    case types.CHANGE_EDIT_PRODUCT_CODE:
      newState.editProductCode = action.editProductCode
      break;
    case types.CHANGE_EDIT_NAME:
      newState.editName = action.editName
      break;
    case types.CHANGE_EDIT_ORDERS:
      newState.editOrders = action.editOrders
      break;
    default:
      break;
  }
  return newState
}