import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  params: {},
  editTitle: "",
  editType: "",
  editContent: "",
  editState: "",
  detailInfo: null,
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.QUESTION_QUERY_LIST:
      newState.list = action.list
      newState.pagination = action.pagination
      break;
    case types.QUESTION_CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.QUESTION_CHANGE_EDIT_TITLE:
      newState.editTitle = action.editTitle
      break;
    case types.QUESTION_CHANGE_EDIT_TYPE:
      newState.editType = action.editType
      break;
    case types.QUESTION_CHANGE_EDIT_CONTENT:
      newState.editContent = action.editContent
      break;
    case types.QUESTION_INIT_NOTICE_DETAIL:
      newState.detailInfo = action.detailInfo
      break;
    case types.QUESTION_CHANGE_EDIT_STATE:
      newState.editState = action.editState
      break;
    default:
      break;
  }
  return newState
}