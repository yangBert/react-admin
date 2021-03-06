import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  saveLoading: false,
  params: {},
  editName: "",
  editRemarks: "",
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
    case types.CHANGE_EDIT_NAME:
      newState.editName = action.editName
      break;
    case types.CHANGE_EDIT_REMARKS:
      newState.editRemarks = action.editRemarks
      break;
    case types.CHANGE_SAVE_LOADING:
      newState.saveLoading = action.saveLoading
      break;
    default:
      break;
  }
  return newState
}