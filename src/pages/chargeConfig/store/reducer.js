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
  record: null,
  productSelectedKeys: [],
  billingSelectedKeys: [],
  preferentialSelectedKeys: [],
  appCode: "",
  productListArr: []
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case types.CHARGE_CONFIG_FETCH_PRODUCT_LIST:
      newState.productListArr = action.productListArr
      break;
    case types.CHARGE_CONFIG_SET_APP_CODE:
      newState.appCode = action.appCode
      break;
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.CHARGE_CONFIG_QUERY_LIST:
      newState.list = action.list
      newState.pagination = action.pagination
      break;
    case types.CHARGE_CONFIG_QUERY_PREFERENTTIAL_LIST:
      newState.preferentialList = action.preferentialList
      newState.preferentialListPagination = action.preferentialListPagination
      break;
    case types.CHARGE_CONFIG_QUERY_BILLING_LIST:
      newState.billingList = action.billingList
      newState.billingListPagination = action.billingListPagination
      break;
    case types.CHARGE_CONFIG_QUERY_PRODUCT_LIST:
      newState.productList = action.productList
      newState.productPagination = action.productPagination
      break;
    case types.CHARGE_CONFIG_CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.CHARGE_CONFIG_CHANGE_MODAL_VISIBLE:
      newState.modalVisible = action.modalVisible
      newState.editStatus = action.editStatus
      break;
    case types.CHARGE_CONFIG_CHANGE_EDIT_STATUS:
      newState.editStatus = action.editStatus
      break;
    case types.CHARGE_CONFIG_CHANGE_CONFIG_STRATEGY_NAME:
      newState.strategyName = action.strategyName
      break;
    case types.CHARGE_CONFIG_CHANGE_CONFIG_STRATEGY_CODE:
      newState.strategyCode = action.strategyCode
      break;
    case types.CHARGE_CONFIG_CHANGE_CONFIG_BILLING_NAME:
      newState.billingName = action.billingName
      break;
    case types.CHARGE_CONFIG_CHANGE_CONFIG_BILLING_CODE:
      newState.billingCode = action.billingCode
      break;
    case types.CHARGE_CONFIG_CHANGE_CONFIG_PRODUCT_NAME:
      newState.productName = action.productName
      break;
    case types.CHARGE_CONFIG_CHANGE_CONFIG_PRODUCT_CODE:
      newState.productCode = action.productCode
      break;
    case types.CHARGE_CONFIG_CHANGE_PRODUCT_SELECTED_KEYS:
      newState.productSelectedKeys = action.productSelectedKeys
      break;
    case types.CHARGE_CONFIG_CHANGE_BILLING_SELECTED_KEYS:
      newState.billingSelectedKeys = action.billingSelectedKeys
      break;
    case types.CHARGE_CONFIG_CHANGE_PREFERENTIAL_SELECTED_KEYS:
      newState.preferentialSelectedKeys = action.preferentialSelectedKeys
      break;
    case types.CHARGE_CONFIG_CHANGE_RECORD:
      newState.record = action.record
      break;
    default:
      break;
  }
  return newState
}