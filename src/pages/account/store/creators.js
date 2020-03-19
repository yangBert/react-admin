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

//改变账户名称
const setAccountNameAction = editAccountName => ({
  type: types.SET_EDIT_ACCOUNT_NAME,
  editAccountName
});

//改变账户类型
const setEditAccountTypeAction = editAccountType => ({
  type: types.SET_EDIT_ACCOUNT_TYPE,
  editAccountType
});

//改变机构编码
const setEditOrgCodeAction = editOrgCode => ({
  type: types.SET_EDIT_ORG_CODE,
  editOrgCode
});

//改变父账户
const setEditParentAccountAction = editParentAccount => ({
  type: types.SET_EDIT_PARENT_ACCOUNT,
  editParentAccount
});

//改变账户访问
const setEditAccessScrectAction = editAccessScrect => ({
  type: types.SET_EDIT_ACCESS_SCRECT,
  editAccessScrect
});

//改变保存loading
const onChangeSaveLoadingAction = saveLoading => ({
  type: types.CHANGE_SAVE_LOADING,
  saveLoading
});

const setRechargeTypeAction = rechargeType => ({
  type: types.SET_RE_CHARGE_TYPE,
  rechargeType
});

const setRechargeMoneyAction = rechargeMoney => ({
  type: types.SET_RE_CHARGE_MONEY,
  rechargeMoney
});

const changeBillingSelectedKeysAction = (appSelectedKeys) => ({
  type: types.CHANGE_APP_SELECTED_KEYS,
  appSelectedKeys
})

const reChargeAction = req => {
  return dispatch => {
    const url = requestURL.chargeRecharge;
    request.json(url, req.data, res => {
      if (res.data) {
        const { success, message } = res.data;
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

const saveAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    const url = req.data.id
      ? requestURL.accountUpdateAccount
      : requestURL.accountAddCount;
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

//查询
const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.json(requestURL.accountQueryByPage, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          const action = initListAction(data.results, createPagination(data));
          dispatch(action);
          dispatch(
            queryOrgListAction({
              props: req.props,
              data: { pageSize: 100, pageNo: 1 }
            })
          );
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

//初始化机构树
const initOrgListAction = editOrgList => ({
  type: types.INIT_EDIT_ORG_LIST,
  editOrgList
});

//查询机构
const queryOrgListAction = req => {
  return dispatch => {
    request.json(requestURL.orgQueryAllOrgTree, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          const action = initOrgListAction(data);
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

const queryAppListAction = (appList, appListPagination) => ({
  type: types.QUERY_APP_LIST,
  appList,
  appListPagination
});

const createQueryAppListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.json(requestURL.accountQueryByPage, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          const action = queryAppListAction(
            data.results,
            createPagination(data)
          );
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

const bindSaveAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.json(requestURL.accountBindAppAccount, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message } = res.data;
        console.log("res", res)
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

const getbindAppAccountAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.get(requestURL.accountGetbindAppAccount, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data;
        if (success) {
          dispatch(changeBillingSelectedKeysAction([data[0].accountCode]))
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
  saveAction,
  onChangeSaveLoadingAction,
  createChangeParamsAction,
  setAccountNameAction,
  setEditAccountTypeAction,
  setEditOrgCodeAction,
  queryOrgListAction,
  setEditParentAccountAction,
  setEditAccessScrectAction,
  setRechargeTypeAction,
  setRechargeMoneyAction,
  reChargeAction,
  createQueryAppListAction,
  changeBillingSelectedKeysAction,
  bindSaveAction,
  getbindAppAccountAction
};
