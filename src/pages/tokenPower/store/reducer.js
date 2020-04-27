import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  saveLoading: false,
  params: {},
  editTitle: "",
  editURL: "",
  editRemarks: "",
  selectedRowKeys: [],
  roleId: ""
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.TOKEN_POWER_QUERY_LIST:
      newState.list = action.list
      newState.pagination = action.pagination
      break;
    case types.TOKEN_POWER_CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.TOKEN_POWER_CHANGE_EDIT_TITLE:
      newState.editTitle = action.editTitle
      break;
    case types.TOKEN_POWER_CHANGE_EDIT_URL:
      newState.editURL = action.editURL
      break;
    case types.TOKEN_POWER_CHANGE_EDIT_REMARKS:
      newState.editRemarks = action.editRemarks
      break;
    case types.TOKEN_POWER_CHANGE_SAVE_LOADING:
      newState.saveLoading = action.saveLoading
      break;
    case types.TOKEN_POWER_CHANGE_SELECTED_ROW_KEYS:
      newState.selectedRowKeys = action.selectedRowKeys
      break;
    case types.TOKEN_POWER_INIT_ROLE_ID:
      newState.roleId = action.roleId
      break;
    default:
      break;
  }
  return newState
}