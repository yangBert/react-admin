import * as types from "./actionTypes";
import spinningTypes from "pages/common/layer/spinning/spinningTypes";

const defaultState = {
  list: [],
  allProductType: [],
  verifyApiList: [],
  pagination: {},
  spinning: false,
  params: {},
  productName: "",
  productPrice: 0,
  productPaying: "",
  productTypeCode: "",
  productRemark: "",
  tag: "",
  APIName: "",
  orderWord: "",
  record: {},
  saveLoading: false
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning;
      break;
    case types.PRODUCT_QUERY_DICT_TYPE_LIST:
      newState.typeList = action.typeList;
      break;
    case types.PRODUCT_QUERY_DICT_DATA_LIST:
      newState.list = action.list;
      newState.pagination = action.pagination;
      break;
    case types.PRODUCT_CHANGE_SEARCH_PARAMS:
      newState.params = action.params;
      break;
    case types.PRODUCT_INIT_ALL_PRODUCT_TYPE:
      newState.allProductType = action.allProductType;
      break;
    case types.PRODUCT_SET_PRODUCT_NAME:
      newState.productName = action.productName;
      break;
    case types.PRODUCT_SET_PRODUCT_PRICE:
      newState.productPrice = action.productPrice;
      break;
    case types.PRODUCT_SET_PRODUCT_PAYING:
      newState.productPaying = action.productPaying;
      break;
    case types.PRODUCT_SET_PRODUCT_TYPE_CODE:
      newState.productTypeCode = action.productTypeCode;
      break;
    case types.PRODUCT_SET_PRODUCT_REMARK:
      newState.productRemark = action.productRemark;
      break;
    case types.PRODUCT_SET_PRODUCT_TAG:
      newState.tag = action.tag;
      break;
    case types.PRODUCT_INIT_VERIFY_API_LIST:
      newState.verifyApiList = action.verifyApiList;
      break;
    case types.PRODUCT_SET_API_NAME:
      newState.APIName = action.APIName;
      break;
    case types.PRODUCT_SET_ORDER_WORD:
      newState.orderWord = action.orderWord;
      break;
    case types.PRODUCT_CHANGE_SAVE_LOADING:
      newState.saveLoading = action.saveLoading;
      break;
    default:
      break;
  }
  return newState;
};
