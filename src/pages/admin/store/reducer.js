import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  roleAllList: [],
  pagination: {},
  operationType: "",
  addModalvisible: false,
  roleModalVisible: false,
  record: {},
  spinning: false,
  params: {},
  ConfirmLoading: false,
  ConfirmLoadingRole: false,
  selectedRoles: [],
  roleAdminId: "",
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.QUERY_USER_LIST:
      newState.list = action.list
      newState.pagination = action.pagination
      break;
    case types.CHANGE_ADD_MODAL_VISIBLE:
      newState.operationType = action.operationType
      newState.addModalvisible = action.addModalvisible
      newState.record = action.record
      break;
    case types.CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.CHANGE_CONFIRM_LOADING:
      newState.ConfirmLoading = action.ConfirmLoading
      break;
    case types.INIT_SELECTED_ROLES:
      newState.selectedRoles = action.selectedRoles
      break;
    case types.CHANGE_ROLE_MODAL_VISIBLE:
      newState.roleModalVisible = action.roleModalVisible
      break;
    case types.INIT_ROLE_ALL_LIST:
      newState.roleAllList = action.roleAllList
      break;
    case types.INIT_ROLE_ADMINID:
      newState.roleAdminId = action.roleAdminId
      break;
    case types.CHANGE_CONFIRMLOADING_ROLE:
      newState.ConfirmLoadingRole = action.ConfirmLoadingRole
      break;
  }
  return newState
}