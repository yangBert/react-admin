import * as types from "./actionTypes";
import * as requestURL from "static/js/requestURL";
import * as request from "static/js/request";
import spinningAction from "pages/common/layer/spinning";
import notification from "pages/common/layer/notification";
import createPagination from "static/js/pagination";

const initListAction = (list, pagination) => ({
  type: types.CHARGE_RE_CHARGE_QUERY_LIST,
  list,
  pagination
});

const initDetailAction = detail => ({
  type: types.CHARGE_RE_CHARGE_INIT_DETAIL,
  detail
});

const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.json(requestURL.chargeRechargeRecordByPage, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          const action = initListAction(data.results, createPagination(data));
          dispatch(action);
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const qeruyDetailAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.json(requestURL.chargeRechargeDetail, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          const action = initDetailAction(data);
          dispatch(action);
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const createChangeParamsAction = params => ({
  type: types.CHARGE_RE_CHARGE_CHANGE_SEARCH_PARAMS,
  params
});

export { queryListAction, qeruyDetailAction, createChangeParamsAction };
