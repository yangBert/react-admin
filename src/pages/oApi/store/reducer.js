import * as types from "./actionTypes";
import spinningTypes from "pages/common/layer/spinning/spinningTypes";

const defaultState = {
  list: [],
  typeList: [],
  paramsDetail: [],
  pagination: {},
  spinning: false,
  params: {},
  apiName: "",
  typeId: "",
  apiUrl: "",
  apiReqType: "",
  apiParamType: "",
  apiRemarks: ""
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning;
      break;
    case types.OAPI_QUERY_LIST:
      newState.list = action.list;
      newState.pagination = action.pagination;
      break;
    case types.OAPI_CHANGE_SEARCH_PARAMS:
      newState.params = action.params;
      break;
    case types.OAPI_SET_API_NAME:
      newState.apiName = action.apiName;
      break;
    case types.OAPI_SET_TYPE_ID:
      newState.typeId = action.typeId;
      break;
    case types.OAPI_SET_API_REQ_TYPE:
      newState.apiReqType = action.apiReqType;
      break;
    case types.OAPI_INIT_TYPE_LIST:
      newState.typeList = action.typeList;
      break;
    case types.OAPI_SET_API_URL:
      newState.apiUrl = action.apiUrl;
      break;
    case types.OAPI_SET_API_PARAM_TYPE:
      newState.apiParamType = action.apiParamType;
      break;
    case types.OAPI_SET_API_REMARKS:
      newState.apiRemarks = action.apiRemarks;
      break;
    case types.OAPI_SET_API_PARAMS_DETAIL:
      newState.paramsDetail = action.paramsDetail;
      break;
    default:
      break;
  }
  return newState;
};
