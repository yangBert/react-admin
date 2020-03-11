import * as types from "./actionTypes";
import * as requestURL from "static/js/requestURL";
import * as request from "static/js/request";
import spinningAction from "pages/common/layer/spinning";
import notification from "pages/common/layer/notification";
import createPagination from "static/js/pagination";

const initListAction = (list, pagination) => ({
  type: types.QUERY_LIST,
  list,
  pagination
});

const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    console.log("req.data", req.data);
    request.json(requestURL.logManageSelectUserLogs, req.data, res => {
      dispatch(spinningAction(false));
      console.log("res============", res);
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        console.log("res", res);
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

//查询携带参数
const createChangeParamsAction = params => ({
  type: types.CHANGE_SEARCH_PARAMS,
  params
});

export { queryListAction, createChangeParamsAction };
