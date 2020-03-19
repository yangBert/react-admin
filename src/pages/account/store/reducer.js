import * as types from "./actionTypes";
import spinningTypes from "pages/common/layer/spinning/spinningTypes";

const defaultState = {
  list: [],
  pagination: {},
  appList: [],
  appListPagination: {},
  spinning: false,
  saveLoading: false,
  params: {},
  editAccountName: "",
  editAccountType: "",
  editOrgCode: "",
  editParentAccount: "",
  editAccessScrect: "",
  editOrgList: [],
  rechargeType: "",
  rechargeMoney: 0,
  appSelectedKeys: []
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
    case types.QUERY_APP_LIST:
      newState.appList = action.appList;
      newState.appListPagination = action.appListPagination;
      break;
    case types.CHANGE_SEARCH_PARAMS:
      newState.params = action.params;
      break;
    case types.CHANGE_SAVE_LOADING:
      newState.saveLoading = action.saveLoading;
      break;
    case types.SET_EDIT_ACCOUNT_NAME:
      newState.editAccountName = action.editAccountName;
      break;
    case types.SET_EDIT_ACCOUNT_TYPE:
      newState.editAccountType = action.editAccountType;
      break;
    case types.SET_EDIT_ORG_CODE:
      newState.editOrgCode = action.editOrgCode;
      break;
    case types.INIT_EDIT_ORG_LIST:
      newState.editOrgList = action.editOrgList;
      break;
    case types.SET_EDIT_PARENT_ACCOUNT:
      newState.editParentAccount = action.editParentAccount;
      break;
    case types.SET_EDIT_ACCESS_SCRECT:
      newState.editAccessScrect = action.editAccessScrect;
      break;
    case types.SET_RE_CHARGE_TYPE:
      newState.rechargeType = action.rechargeType;
      break;
    case types.SET_RE_CHARGE_MONEY:
      newState.rechargeMoney = action.rechargeMoney;
      break;
    case types.CHANGE_APP_SELECTED_KEYS:
      newState.appSelectedKeys = action.appSelectedKeys;
      break;
    default:
      break;
  }
  return newState;
};
