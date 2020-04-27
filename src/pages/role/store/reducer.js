import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  operationType: "",
  addModalvisible: false,
  record: {},
  spinning: false,
  menuModalvisible: false,
  menuList: [],
  checkedKeys: [],
  selectedRoleId: "",
  ConfirmLoading: false,
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.ROLE_QUERY_ROLE_LIST:
      newState.list = action.list
      break;
    case types.ROLE_CHANGE_ADD_MODAL_VISIBLE:
      newState.operationType = action.operationType
      newState.addModalvisible = action.addModalvisible
      newState.record = action.record
      break;
    case types.ROLE_CHANGE_MENU_MODAL_VISIBLE:
      newState.menuModalvisible = action.menuModalvisible
      newState.selectedRoleId = action.selectedRoleId
      newState.checkedKeys = action.checkedKeys
      break;
    case types.ROLE_INIT_MENU_LIST:
      newState.menuList = action.menuList
      break;
    case types.ROLE_CHANGE_CHECKED_KEYS_ACTION:
      newState.checkedKeys = action.checkedKeys
      break;
    case types.ROLE_CHANGE_CONFIRM_LOADING:
      newState.ConfirmLoading = action.ConfirmLoading
      break;
    default:
      break;
  }
  return newState
}
