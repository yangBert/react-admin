import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  params: {},
  editTitle: "",
  editContent: "",
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.QUERY_NOTICE_LIST:
      newState.list = action.list
      break;
    case types.CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.CHANGE_EDIT_TITLE:
      newState.editTitle = action.editTitle
      break;
    case types.CHANGE_EDIT_CONTENT:
      newState.editContent = action.editContent
      break;
    default:
      break;
  }
  return newState
}