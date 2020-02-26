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
  editImageURL:"",
  editStatus:"",
  detailInfo: null,
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
    case types.CHANGE_EDIT_URL:
      newState.editURL = action.editURL
      break;
    case types.CHANGE_EDIT_IMAGE_URL:
      newState.editImageURL = action.editImageURL
      break;
    case types.CHANGE_EDIT_STATUS:
      newState.editStatus = action.editStatus
      break;
    case types.CHANGE_SAVE_LOADING:
      newState.saveLoading = action.saveLoading
      break;
    case types.CHANGE_EDIT_CONTENT:
      newState.editContent = action.editContent
      break;
    case types.INIT_NOTICE_DETAIL:
      newState.detailInfo = action.detailInfo
      break;
    default:
      break;
  }
  return newState
}