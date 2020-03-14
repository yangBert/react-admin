import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  saveLoading: false,
  params: {},
  editTitle: "",
  editAmount: "",
  editType: "",
  editMaxLimit: 0
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
    case types.CHANGE_EDIT_TITLE:
      newState.editTitle = action.editTitle
      break;
    case types.CHANGE_EDIT_Amount:
      newState.editAmount = action.editAmount
      break;
    case types.CHANGE_EDIT_TYPE:
      newState.editType = action.editType
      break;
    case types.CHANGE_SAVE_LOADING:
      newState.saveLoading = action.saveLoading
      break;
    case types.CHANGE_EDIT_MAX_LIMIT:
      newState.editMaxLimit = action.editMaxLimit
      break;
    default:
      break;
  }
  return newState
}