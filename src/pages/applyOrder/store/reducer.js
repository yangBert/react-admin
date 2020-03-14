import * as types from "./actionTypes";
import spinningTypes from "pages/common/layer/spinning/spinningTypes";

function mapArr(catalog, product) {
  for (let i = 0; i < catalog.length; i++) {
    if (catalog[i].productTypeCode === product[0].productTypeCode) {
      catalog[i].productList = product
    }
  }
}

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  saveLoading: false,
  params: {},
  detail: null,
  allLandingModes: [],
  allAppTypes: [],
  allSupportCAs: [],
  applyGetFileList: [],
  confirmVisible: false,
  confirmLoading: false,
  catalog: []
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning;
      break;
    case types.QUERY_LIST:
      newState.list = action.list;
      newState.pagination = action.pagination;
      break;
    case types.CHANGE_SEARCH_PARAMS:
      newState.params = action.params;
      break;
    case types.CHANGE_SAVE_LOADING:
      newState.saveLoading = action.saveLoading;
      break;
    case types.INIT_DETAIL:
      newState.detail = action.detail;
      break;
    case types.INIT_ALL_LANDING_MODES:
      newState.allLandingModes = action.allLandingModes;
      break;
    case types.INIT_ALL_APP_TYPES:
      newState.allAppTypes = action.allAppTypes;
      break;
    case types.INIT_ALL_SUPPORT_CAS:
      newState.allSupportCAs = action.allSupportCAs;
      break;
    case types.INIT_GET_FILE_LIST:
      newState.applyGetFileList = action.applyGetFileList;
      break;
    case types.CHANGE_CONFIRM_VISIBLE:
      newState.confirmVisible = action.confirmVisible;
      break;
    case types.CHANGE_CONFIRM_LOADING:
      newState.confirmLoading = action.confirmLoading;
      break;
    case types.INIT_CATALOG:
      newState.catalog = action.catalog;
      break;
    case types.INIT_PRODUCT_LIST:
      mapArr(newState.catalog, action.productList)
      break;
    default:
      break;
  }
  return newState;
};
