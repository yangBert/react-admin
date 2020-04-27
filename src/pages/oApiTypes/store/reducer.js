import * as types from "./actionTypes";
import spinningTypes from "pages/common/layer/spinning/spinningTypes";

const defaultState = {
  list: [],
  spinning: false,
  saveLoading: false,
  modalVisible: false,
  edit: false,
  record: {}
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning;
      break;
    case types.OAPI_TYPES_QUERY_LIST:
      newState.list = action.list;
      break;
    case types.OAPI_TYPES_SAVE_LOADING:
      newState.saveLoading = action.saveLoading;
      break;
    case types.OAPI_TYPES_CHANGE_MODAL_VISIBLE:
      newState.modalVisible = action.modalVisible;
      newState.edit = action.edit;
      newState.record = action.record;
      break;
    case types.OAPI_TYPES_CHANGE_TYPE_NAME:
      newState.record.typeName = action.typeName;
      break;
    case types.OAPI_TYPES_CHANGE_TYPE_REMARKS:
      newState.record.typeRemarks = action.typeRemarks;
      break;
    case types.OAPI_TYPES_CHANGE_STRATEGY_STATUS:
      newState.record.state = action.strategyStatus;
      break;
    case types.OAPI_TYPES_CHANGE_CONFIRM_LOADING:
      newState.confirmLoading = action.confirmLoading;
      break;
    default:
      break;
  }
  return newState;
};
