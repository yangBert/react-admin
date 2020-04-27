import * as types from "./actionTypes";
import * as requestURL from "static/js/requestURL";
import * as request from "static/js/request";
import spinningAction from "pages/common/layer/spinning";
import notification from "pages/common/layer/notification";
import * as config from "../config";

const initListAction = list => ({
  type: types.OAPI_TYPES_QUERY_LIST,
  list
});

const saveLoadingAction = saveLoading => ({
  type: types.OAPI_TYPES_SAVE_LOADING,
  saveLoading
});

const changeModalVisibleAction = (modalVisible, edit, record) => ({
  type: types.OAPI_TYPES_CHANGE_MODAL_VISIBLE,
  modalVisible,
  edit,
  record
});

const changeTypeNameAction = typeName => ({
  type: types.OAPI_TYPES_CHANGE_TYPE_NAME,
  typeName
});

const changeTypeRemarksAction = typeRemarks => ({
  type: types.OAPI_TYPES_CHANGE_TYPE_REMARKS,
  typeRemarks
});

const changeStrategyStatusAction = strategyStatus => ({
  type: types.OAPI_TYPES_CHANGE_STRATEGY_STATUS,
  strategyStatus
});

const changeConfirmLoadingAction = confirmLoading => ({
  type: types.OAPI_TYPES_CHANGE_CONFIRM_LOADING,
  confirmLoading
});

const saveAction = req => {
  return dispatch => {
    dispatch(changeConfirmLoadingAction(true));
    const url = req.data.typeId
      ? requestURL.managerOApiUpdateType
      : requestURL.managerOApiInsertType;
    request.json(url, req.data, res => {
      dispatch(changeConfirmLoadingAction(false));
      if (res.data) {
        const { success, message } = res.data && res.data;
        if (success) {
          notification("success", message);
          dispatch(changeModalVisibleAction(false, false, config.record));
          dispatch(queryListAction({ props: req.props, data: {} }));
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
    request.get(requestURL.webSiteSelectAPITypes, req.data, res => {
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
  changeModalVisibleAction,
  changeTypeNameAction,
  changeTypeRemarksAction,
  changeStrategyStatusAction,
  changeConfirmLoadingAction
};
