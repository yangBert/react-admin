import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  params: {},
  editAuthName: "",
  editURL: "",
  editAuthLevel: "",
  editAuthStyle: "",
  editStatus: ""
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.INIT_LIST:
      newState.list = action.list
      break;
    case types.CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.CHANGE_EDIT_AUTH_NAME:
      newState.editAuthName = action.editAuthName
      break;
    case types.CHANGE_EDIT_URL:
      newState.editURL = action.editURL
      break;
    case types.CHANGE_AUTH_LEVE:
      newState.editAuthLevel = action.editAuthLevel
      break;
    case types.CHANGE_AUTH_STYLE:
      newState.editAuthStyle = action.editAuthStyle
      break;
    case types.CHANGE_EDIT_STATUS:
      newState.editStatus = action.editStatus
      break;
    case types.CLEAN_FORM:
      newState.editAuthName = ""
      newState.editURL = ""
      newState.editAuthLevel = ""
      newState.editAuthStyle = ""
      newState.editStatus = ""
      break;
    default:
      break;
  }
  return newState
}