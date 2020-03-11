import * as types from "./actionTypes";
import spinningTypes from "pages/common/layer/spinning/spinningTypes";

const defaultState = {
  list: [],
  allProductType: [],
  pagination: {},
  spinning: false,
  params: {},
  productName: "",
  productPrice: 0,
  editContent: "",
  productPaying: "",
  productTypeCode: "",
  productRemark: "",
  tag: "",
  record: {}
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning;
      break;
    case types.QUERY_DICT_TYPE_LIST:
      newState.typeList = action.typeList;
      break;
    case types.QUERY_DICT_DATA_LIST:
      newState.list = action.list;
      newState.pagination = action.pagination;
      break;
    case types.CHANGE_SEARCH_PARAMS:
      newState.params = action.params;
      break;
    case types.INIT_ALL_PRODUCT_TYPE:
      newState.allProductType = action.allProductType;
      break;
    case types.SET_PRODUCT_NAME:
      newState.productName = action.productName;
      break;
    case types.SET_EDIT_CONTENT:
      newState.editContent = action.editContent;
      break;
    case types.SET_PRODUCT_PRICE:
      newState.productPrice = action.productPrice;
      break;
    case types.SET_PRODUCT_PAYING:
      newState.productPaying = action.productPaying;
      break;
    case types.SET_PRODUCT_TYPE_CODE:
      newState.productTypeCode = action.productTypeCode;
      break;
    case types.SET_PRODUCT_REMARK:
      newState.productRemark = action.productRemark;
      break;
    case types.SET_PRODUCT_TAG:
      newState.tag = action.tag;
      break;
    default:
      break;
  }
  return newState;
};
