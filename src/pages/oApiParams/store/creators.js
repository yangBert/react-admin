import * as types from "./actionTypes";
import * as requestURL from "static/js/requestURL";
import * as request from "static/js/request";
import spinningAction from "pages/common/layer/spinning";
import notification from "pages/common/layer/notification";

const initListAction = list => ({
  type: types.QUERY_LIST,
  list
});

const saveLoadingAction = saveLoading => ({
  type: types.SAVE_LOADING,
  saveLoading
});

const setParamNameAction = paramName => ({
  type: types.SET_PARAM_NAME,
  paramName
});

const setParamTypeAction = paramType => ({
  type: types.SET_PARAM_TYPE,
  paramType
});

const setIsNessAction = isNess => ({
  type: types.SET_IS_NESS,
  isNess
});

const setParamRemarksAction = paramRemarks => ({
  type: types.SET_PARAM_REMARKS,
  paramRemarks
});

const saveAction = req => {
  return dispatch => {
    const url = req.data.paramId
      ? requestURL.managerOApiUpdateParam
      : requestURL.managerOApiInsertParam;
    request.json(url, req.data, res => {
      if (res.data) {
        const { success, message } = res.data && res.data;
        if (success) {
          notification("success", message);
          req.props.history.goBack();
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
    request.get(requestURL.managerOApiSelectAllParamByApiId, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          const action = initListAction(data);
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

export {
  queryListAction,
  saveAction,
  saveLoadingAction,
  setParamNameAction,
  setParamTypeAction,
  setIsNessAction,
  setParamRemarksAction
};
