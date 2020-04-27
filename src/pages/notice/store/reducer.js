import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  params: {},
  editTitle: "",
  editContent: "",
  editState: "",
  detailInfo: null,
  editNoticeType: ""
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.NOTICE_QUERY_NOTICE_LIST:
      newState.list = action.list
      newState.pagination = action.pagination
      break;
    case types.NOTICE_CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.NOTICE_CHANGE_EDIT_TITLE:
      newState.editTitle = action.editTitle
      break;
    case types.NOTICE_CHANGE_EDIT_CONTENT:
      newState.editContent = action.editContent
      break;
    case types.NOTICE_INIT_NOTICE_DETAIL:
      newState.detailInfo = action.detailInfo
      break;
    case types.NOTICE_CHANGE_EDIT_STATE:
      newState.editState = action.editState
      break;
    case types.NOTICE_CHANGE_EDIT_NOTICE_TYPE:
      newState.editNoticeType = action.editNoticeType
      break;
    default:
      break;
  }
  return newState
}