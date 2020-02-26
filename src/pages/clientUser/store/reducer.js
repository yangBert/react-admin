import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  params: {},
  modalVisible:false, 
  editStatus: "",
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.QUERY_LIST:
      newState.list = action.list
      newState.pagination = action.pagination
      break;
    case types.CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.CHANGE_MODAL_VISIBLE:
      newState.modalVisible = action.modalVisible
      newState.editStatus = action.editStatus
      break;
    case types.CHANGE_EDIT_STATUS:
      newState.editStatus = action.editStatus
      break;
    default:
      break;
  }
  return newState
}