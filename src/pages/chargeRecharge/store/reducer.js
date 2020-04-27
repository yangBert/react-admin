import * as types from "./actionTypes";
import spinningTypes from "pages/common/layer/spinning/spinningTypes";

const defaultState = {
  list: [],
  detail: null,
  pagination: {},
  spinning: false,
  params: {}
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning;
      break;
    case types.CHARGE_RE_CHARGE_QUERY_LIST:
      newState.list = action.list;
      newState.pagination = action.pagination;
      break;
    case types.CHARGE_RE_CHARGE_INIT_DETAIL:
      newState.detail = action.detail;
      break;
    case types.CHARGE_RE_CHARGE_CHANGE_SEARCH_PARAMS:
      newState.params = action.params;
      break;
    default:
      break;
  }
  return newState;
};
