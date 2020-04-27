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
    case types.DOC_QUERY_LIST:
      newState.list = action.list
      newState.pagination = action.pagination
      break;
    case types.DOC_CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.DOC_QUERY_DOCCATALOG_LIST:
      newState.docCatalogList = action.docCatalogList
      newState.editCatalogCode = action.editCatalogCode
      break;
    case types.DOC_SET_EDIT_CATALOGO_CODE:
      newState.editCatalogCode = action.editCatalogCode
      break;
    case types.DOC_INIT_PRODUCT_ALL_LIST:
      newState.productAllList = action.productAllList;
      break;
    case types.DOC_CHANGE_EDIT_TITLE:
      newState.editTitle = action.editTitle
      break;
    case types.DOC_CHANGE_EDIT_CONTENT:
      newState.editContent = action.editContent
      break;
    case types.DOC_INIT_NOTICE_DETAIL:
      newState.detailInfo = action.detailInfo
      break;
    case types.DOC_CHANGE_EDIT_STATE:
      newState.editState = action.editState
      break;
    default:
      break;
  }
  return newState
}