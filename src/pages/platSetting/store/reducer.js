import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  params: {},
  editSettingExp: "",
  editSettingKey: "",
  editSettingValue: ""
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.PLAT_SETTING_INIT_LIST:
      newState.list = action.list
      newState.pagination = action.pagination
      newState.needPaging = action.true
      break;
    case types.PLAT_SETTING_CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.PLAT_SETTING_CHANGE_EDIT_SETTING_EXP:
      newState.editSettingExp = action.editSettingExp
      break;
    case types.PLAT_SETTING_CHANGE_EDIT_SETTING_KEY:
      newState.editSettingKey = action.editSettingKey
      break;
    case types.PLAT_SETTING_CHANGE_EDIT_SETTING_VALUE:
      newState.editSettingValue = action.editSettingValue
      break;
    default:
      break;
  }
  return newState
}