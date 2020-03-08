import * as types from "./actionTypes";
import * as requestURL from "static/js/requestURL";
import * as request from "static/js/request";
import spinningAction from "pages/common/layer/spinning";
import notification from "pages/common/layer/notification";
import createPagination from "static/js/pagination";
import { Modal } from "antd";

const initListAction = (list, pagination) => ({
  type: types.QUERY_LIST,
  list,
  pagination
});

const setApiNameAction = apiName => ({
  type: types.SET_API_NAME,
  apiName
});

const initTypeListAction = typeList => ({
  type: types.INIT_TYPE_LIST,
  typeList
});

const setTypeIdAction = typeId => ({
  type: types.SET_TYPE_ID,
  typeId
});

const setApiReqTypeAction = apiReqType => ({
  type: types.SET_API_REQ_TYPE,
  apiReqType
});

const setApiUrlAction = apiUrl => ({
  type: types.SET_API_URL,
  apiUrl
});

const setApiParamTypeAction = apiParamType => ({
  type: types.SET_API_PARAM_TYPE,
  apiParamType
});

const setApiRemarksAction = apiRemarks => ({
  type: types.SET_API_REMARKS,
  apiRemarks
});

const createSaveAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    const url = req.props.location.state
      ? requestURL.managerOApiUpdateOpenApi
      : requestURL.managerOApiInsertOpenApi;
    request.json(url, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message } = res.data && res.data;
        if (success) {
          Modal.success({
            title: "系统提示",
            content: message,
            okText: "确认",
            onOk: () => {
              req.props.history.goBack();
            }
          });
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    console.log("req.data", req.data);
    request.json(requestURL.managerOApiSelectPageOApi, req.data, res => {
      dispatch(spinningAction(false));
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

const queryDetailAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.json(requestURL.webManagerQuestionDetail, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const queryTypeListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.get(requestURL.webSiteSelectAPITypes, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          const action = initTypeListAction(data);
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

export {
  queryListAction,
  setApiNameAction,
  setTypeIdAction,
  queryTypeListAction,
  createChangeParamsAction,
  createSaveAction,
  queryDetailAction,
  setApiReqTypeAction,
  setApiUrlAction,
  setApiParamTypeAction,
  setApiRemarksAction
};
