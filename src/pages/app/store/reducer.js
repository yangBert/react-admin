import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  params: {},
  rowAppId: null,
  form: {},
  iconBase64: "",
  editLoading: false,
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  console.log("==========", action)
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.QUERY_APP_LIST:
      newState.list = action.list
      newState.pagination = action.pagination
      break;
    case types.CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.CHANGE_ROW_APP_ID:
      newState.rowAppId = action.rowAppId
      break;
    //修改表单值
    case types.CHANGE_FORM_APP_NAME:
      newState.form.appName = action.appName
      break;
    case types.CHANGE_FORM_URL:
      newState.form.url = action.url
      break;
    case types.CHANGE_FORM_DESCRIBES:
      newState.form.describes = action.describes
      break;
    case types.CHANGE_FORM_REDIRECTURL:
      newState.form.redirectUrl = action.redirectUrl
      break;
    case types.CHANGE_FORM_ICON:
      newState.form.icon = action.icon
      break;
    case types.CHANGE_FORM_APPTYPE:
      newState.form.appType = action.appType
      break;
    case types.CHANGE_FORM_AUDITMODE:
      newState.form.auditMode = action.auditMode
      break;
    case types.CHANGE_FORM_LANDINGMODES:
      newState.form.landingModes = action.landingModes
      break;
    case types.CHANGE_FORM_SUPPORTCAS:
      newState.form.supportCAs = action.supportCAs
      break;
    case types.INIT_ALL_LANDING_MODES:
      newState.form.allLandingModes = action.allLandingModes
      break;
    case types.INIT_ALL_APP_TYPES:
      newState.form.allAppTypes = action.allAppTypes
      break;
    case types.INIT_ALL_SUPPORT_CAS:
      newState.form.allSupportCAs = action.allSupportCAs
      break;
    case types.SET_ICON_BASE64:
      newState.iconBase64 = action.iconBase64
      break;
    case types.CHANGE_SAVE_LOADING:
      newState.saveLoading = action.saveLoading
      break;
    case types.CHANGE_FORM_EDIT_APP_ID:
      newState.form.editAppId = action.editAppId
      break;
    case types.CHANGE_ROW_AUDIT_STATUS:
      newState.rowauditStatus = action.rowauditStatus
      break;
    default:
      break;
  }
  return newState
}