import * as types from "./actionTypes";
import spinningTypes from "pages/common/layer/spinning/spinningTypes";

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  saveLoading: false,
  params: {},
  editTitle: "",
  editURL: "",
  showImage: false,
  editImageURL: "",
  editStatus: ""
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning;
      break;
    case types.LINK_QUERY_LIST:
      newState.list = action.list;
      newState.pagination = action.pagination;
      break;
    case types.LINK_CHANGE_SEARCH_PARAMS:
      newState.params = action.params;
      break;
    case types.LINK_CHANGE_EDIT_TITLE:
      newState.editTitle = action.editTitle;
      break;
    case types.LINK_CHANGE_SHOW_IMAGE:
      newState.showImage = action.showImage;
      break;
    case types.LINK_CHANGE_EDIT_URL:
      newState.editURL = action.editURL;
      break;
    case types.LINK_CHANGE_EDIT_IMAGE_URL:
      newState.editImageURL = action.editImageURL;
      break;
    case types.LINK_CHANGE_EDIT_STATUS:
      newState.editStatus = action.editStatus;
      break;
    case types.LINK_CHANGE_SAVE_LOADING:
      newState.saveLoading = action.saveLoading;
      break;
    default:
      break;
  }
  return newState;
};
