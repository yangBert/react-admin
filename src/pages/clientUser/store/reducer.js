import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  params: {},
  modalVisible: false,
  editStatus: "",
  record: null
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.CLIENT_USER_QUERY_LIST:
      newState.list = action.list
      newState.pagination = action.pagination
      break;
    case types.CLIENT_USER_CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.CLIENT_USER_CHANGE_MODAL_VISIBLE:
      newState.modalVisible = action.modalVisible
      newState.record = action.record
      newState.editStatus = action.record.status
      break;
    case types.CLIENT_USER_CHANGE_EDIT_STATUS:
      newState.editStatus = action.editStatus
      break;
    default:
      break;
  }
  return newState
}