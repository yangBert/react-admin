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

//改变保存loading
const onChangeSaveLoadingAction = saveLoading => ({
  type: types.CHANGE_SAVE_LOADING,
  saveLoading
});

const initDetailAction = detail => ({
  type: types.INIT_DETAIL,
  detail
});

const changeConfirmVisibleAction = confirmVisible => ({
  type: types.CHANGE_CONFIRM_VISIBLE,
  confirmVisible
});

const changeConfirmLoadingAction = confirmLoading => ({
  type: types.CHANGE_CONFIRM_LOADING,
  confirmLoading
});

//审核
const auditAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    dispatch(changeConfirmLoadingAction(true));
    const url = requestURL.webManagerAuditApply;
    console.log("审核 req==>", req.data);
    request.json(url, req.data, res => {
      dispatch(spinningAction(false));
      dispatch(changeConfirmLoadingAction(false));
      dispatch(changeConfirmVisibleAction(false));
      console.log("审核 res==>", res);
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

//查询
const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.json(requestURL.webManagerQueryApplyPages, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        console.log("data", res);
        const { success, message, data } = res.data;
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

const getDetailAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.get(requestURL.webManagerGetApplyDetail, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data;
        if (success) {
          console.log("data", data);
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

const initAllAppTypes = allAppTypes => ({
  type: types.INIT_ALL_APP_TYPES,
  allAppTypes
});

const initAllLandingModes = allLandingModes => ({
  type: types.INIT_ALL_LANDING_MODES,
  allLandingModes
});

const initAllSupportCAs = allSupportCAs => ({
  type: types.INIT_ALL_SUPPORT_CAS,
  allSupportCAs
});

const initapplyGetFileListAction = applyGetFileList => ({
  type: types.INIT_GET_FILE_LIST,
  applyGetFileList
});

//处理返回数据
function implementResponseType(arr) {
  let a = [];
  for (let i = 0; i < arr.length; i++) {
    let o = { label: arr[i].name, value: arr[i].code };
    a.push(o);
  }
  return a;
}

//查询所有应用类型
const queryAllAppTypeAction = req => {
  return dispatch => {
    request.json(requestURL.plateSettingDictByNine, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          const arr = implementResponseType(JSON.parse(data));
          dispatch(initAllAppTypes(arr));
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

//查询app登录方式
const queryLoginTypeAction = req => {
  return dispatch => {
    request.json(requestURL.plateSettingLoginType, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          const arr = implementResponseType(JSON.parse(data));
          dispatch(initAllLandingModes(arr));
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

//查询所有支持CA机构
const queryAllSupportCAsAction = req => {
  return dispatch => {
    request.json(requestURL.plateSettingSelectCA, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          const arr = implementResponseType(JSON.parse(data));
          dispatch(initAllSupportCAs(arr));
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const applyGetFileListAction = req => {
  return dispatch => {
    request.json(requestURL.webApplyGetFileList, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          console.log("res", res);
          const action = initapplyGetFileListAction(data);
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
  auditAction,
  onChangeSaveLoadingAction,
  createChangeParamsAction,
  getDetailAction,
  queryAllAppTypeAction,
  queryLoginTypeAction,
  queryAllSupportCAsAction,
  applyGetFileListAction,
  initDetailAction,
  changeConfirmVisibleAction
};
