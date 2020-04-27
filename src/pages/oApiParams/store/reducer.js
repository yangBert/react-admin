import * as types from "./actionTypes";
import spinningTypes from "pages/common/layer/spinning/spinningTypes";

const defaultState = {
  list: [],
  spinning: false,
  saveLoading: false,
  paramName: "",
  paramType: "",
  isNess: "",
  paramRemarks: ""
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning;
      break;
    case types.OAPI_PARAMS_QUERY_LIST:
      newState.list = action.list;
      break;
    case types.OAPI_PARAMS_SAVE_LOADING:
      newState.saveLoading = action.saveLoading;
      break;
    case types.OAPI_PARAMS_SET_PARAM_NAME:
      newState.paramName = action.paramName;
      break;
    case types.OAPI_PARAMS_SET_PARAM_TYPE:
      newState.paramType = action.paramType;
      break;
    case types.OAPI_PARAMS_SET_IS_NESS:
      newState.isNess = action.isNess;
      break;
    case types.OAPI_PARAMS_SET_PARAM_REMARKS:
      newState.paramRemarks = action.paramRemarks;
      break;
    default:
      break;
  }
  return newState;
};
