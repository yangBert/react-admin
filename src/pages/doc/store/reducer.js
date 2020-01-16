import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  productAllList: [],
  docCatalogList: [],
  editCatalogCode: "",
  pagination: {},
  spinning: false,
  params: {},
  editTitle: "",
  editContent: "<p>请输入文档内容!</b></p>",
  editState: "",
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
    case types.QUERY_DOCCATALOG_LIST:
      newState.docCatalogList = action.docCatalogList
      break;
    case types.SET_EDIT_CATALOGO_CODE:
      newState.editCatalogCode = action.editCatalogCode
      break;

    case types.INIT_PRODUCT_ALL_LIST:
      newState.productAllList = action.productAllList;
      break;
    case types.CHANGE_EDIT_TITLE:
      newState.editTitle = action.editTitle
      break;
    case types.CHANGE_EDIT_CONTENT:
      newState.editContent = action.editContent
      break;
    case types.INIT_NOTICE_DETAIL:
      newState.detailInfo = action.detailInfo
      break;
    case types.CHANGE_EDIT_STATE:
      newState.editState = action.editState
      break;
    default:
      break;
  }
  return newState
}