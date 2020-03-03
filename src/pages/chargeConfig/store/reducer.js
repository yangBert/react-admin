import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  preferentialList: [],
  billingList: [],
  productList: [],
  pagination: {},
  preferentialListPagination: {},
  billingListPagination: {},
  productPagination: {},
  spinning: false,
  params: {},
  modalVisible: false,
  editStatus: "",
  strategyName: "",
  strategyCode: "",
  billingName: "",
  billingCode: "",
  productName: "",
  productCode: "",
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
    case types.QUERY_PREFERENTTIAL_LIST:
      newState.preferentialList = action.preferentialList
      newState.preferentialListPagination = action.preferentialListPagination
      break;
    case types.QUERY_BILLING_LIST:
      newState.billingList = action.billingList
      newState.billingListPagination = action.billingListPagination
      break;
    case types.QUERY_PRODUCT_LIST:
      newState.productList = action.productList
      newState.productPagination = action.productPagination
      break;
    case types.CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.CHANGE_MODAL_VISIBLE:
      newState.modalVisible = action.modalVisible
      newState.editStatus = action.editStatus
      break;
    case types.CHANGE_EDIT_STATUS:
      newState.editStatus = action.editStatus
      break;
    case types.CHANGE_CONFIG_STRATEGY_NAME:
      newState.strategyName = action.strategyName
      break;
    case types.CHANGE_CONFIG_STRATEGY_CODE:
      newState.strategyCode = action.strategyCode
      break;
    case types.CHANGE_CONFIG_BILLING_NAME:
      newState.billingName = action.billingName
      break;
    case types.CHANGE_CONFIG_BILLING_CODE:
      newState.billingCode = action.billingCode
      break;
    case types.CHANGE_CONFIG_PRODUCT_NAME:
      newState.productName = action.productName
      break;
    case types.CHANGE_CONFIG_PRODUCT_CODE:
      newState.productCode = action.productCode
      break;

    default:
      break;
  }
  return newState
}