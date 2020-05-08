import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';


const initfetchProductListAction = (productListArr) => ({
  type: types.CHARGE_CONFIG_FETCH_PRODUCT_LIST,
  productListArr
})

const setAppCodeAction = (appCode) => ({
  type: types.CHARGE_CONFIG_SET_APP_CODE,
  appCode
})

const initListAction = (list, pagination) => ({
  type: types.CHARGE_CONFIG_QUERY_LIST,
  list,
  pagination
})

const initListPreferentialListAction = (preferentialList, preferentialListPagination) => ({
  type: types.CHARGE_CONFIG_QUERY_PREFERENTTIAL_LIST,
  preferentialList,
  preferentialListPagination
})

const initListBillingListAction = (billingList, billingListPagination) => ({
  type: types.CHARGE_CONFIG_QUERY_BILLING_LIST,
  billingList,
  billingListPagination
})

const initProductListAction = (productList, productPagination) => ({
  type: types.CHARGE_CONFIG_QUERY_PRODUCT_LIST,
  productList,
  productPagination
})

const changeConfigStrategyNameAction = (strategyName) => ({
  type: types.CHARGE_CONFIG_CHANGE_CONFIG_STRATEGY_NAME,
  strategyName
})

const changeConfigStrategyCodeAction = (strategyCode) => ({
  type: types.CHARGE_CONFIG_CHANGE_CONFIG_STRATEGY_CODE,
  strategyCode
})

const changeConfigBillingNameAction = (billingName) => ({
  type: types.CHARGE_CONFIG_CHANGE_CONFIG_BILLING_NAME,
  billingName
})

const changeConfigBillingCodeAction = (billingCode) => ({
  type: types.CHARGE_CONFIG_CHANGE_CONFIG_BILLING_CODE,
  billingCode
})

const changeConfigProductNameAction = (productName) => ({
  type: types.CHARGE_CONFIG_CHANGE_CONFIG_PRODUCT_NAME,
  productName
})

const changeConfigProductCodeAction = (productCode) => ({
  type: types.CHARGE_CONFIG_CHANGE_CONFIG_PRODUCT_CODE,
  productCode
})

const changeProductSelectedKeysAction = (productSelectedKeys) => ({
  type: types.CHARGE_CONFIG_CHANGE_PRODUCT_SELECTED_KEYS,
  productSelectedKeys
})

const changeBillingSelectedKeysAction = (billingSelectedKeys) => ({
  type: types.CHARGE_CONFIG_CHANGE_BILLING_SELECTED_KEYS,
  billingSelectedKeys
})

const changePreferentialSelectedKeysAction = (preferentialSelectedKeys) => ({
  type: types.CHARGE_CONFIG_CHANGE_PREFERENTIAL_SELECTED_KEYS,
  preferentialSelectedKeys
})

const changeConfigRecordAction = (record) => ({
  type: types.CHARGE_CONFIG_CHANGE_RECORD,
  record
})

//改变弹出层显示隐藏
const changeModalVisibleAction = (modalVisible, editStatus) => ({
  type: types.CHARGE_CONFIG_CHANGE_MODAL_VISIBLE,
  modalVisible,
  editStatus
})

//改变状态
const setStatusAction = editStatus => ({
  type: types.CHARGE_CONFIG_CHANGE_EDIT_STATUS,
  editStatus
})

//查询携带参数
const createChangeParamsAction = params => ({
  type: types.CHARGE_CONFIG_CHANGE_SEARCH_PARAMS,
  params
})


//查询
const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.chargeAppQueryByPage, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = initListAction(data.results, createPagination(data))
          dispatch(action)
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

//修改状态
const updateAction = req => {
  return (dispatch, getState) => {
    dispatch(spinningAction(true))
    const url = requestURL.webManagerUserChangeUserStatus
    request.json(url, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          notification('success', message)
          const pagination = getState().clientUser.pagination
          const params = {
            ...getState().clientUser.params,
            pageNo: pagination.current,
            pageSize: pagination.pageSize
          }
          dispatch(queryListAction({ props: req.props, data: params }));
          dispatch(changeModalVisibleAction(false, ""))
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

const queryPreferentialListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.chargePreferentialQueryByPage, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data
        if (success) {
          const action = initListPreferentialListAction(data.results, createPagination(data))
          dispatch(action)
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

const queryBillingListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.chargeRuleQueryByPage, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data
        if (success) {
          const action = initListBillingListAction(data.results, createPagination(data))
          dispatch(action)
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

const queryProductListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.productSelectByPage, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data
        if (success) {
          const action = initProductListAction(data.results, createPagination(data))
          dispatch(action)
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

const saveAction = req => {
  return (dispatch, getState) => {
    dispatch(spinningAction(true))
    const url = req.data.id ? requestURL.chargePreferentialUpdate : requestURL.chargeAppAdd
    request.json(url, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data
        if (success) {
          notification('success', message)
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

const delChargeConfigAction = req => {
  return (dispatch, getState) => {
    dispatch(spinningAction(true))
    const url = requestURL.chargeAppDelete
    request.json(url, { id: req.data.id }, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data
        if (success) {
          notification('success', message)
          const pagination = getState().chargeConfig.pagination
          const params = {
            ...getState().chargeConfig.params,
            appCode: getState().chargeConfig.appCode,
            pageNo: pagination.current,
            pageSize: pagination.pageSize
          }
          dispatch(queryListAction({ props: req.props, data: params }));
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}


const fetchProductListAction = req => {
  return dispatch => {
    request.json(requestURL.productSelectByPage, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data
        if (success) {
          const action = initfetchProductListAction(data.results)
          dispatch(action)
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

export {
  queryListAction,
  queryPreferentialListAction,
  queryBillingListAction,
  queryProductListAction,
  setStatusAction,
  updateAction,
  changeModalVisibleAction,
  createChangeParamsAction,
  changeConfigStrategyNameAction,
  changeConfigStrategyCodeAction,
  changeConfigBillingNameAction,
  changeConfigBillingCodeAction,
  changeConfigProductNameAction,
  changeConfigProductCodeAction,
  changeProductSelectedKeysAction,
  changeBillingSelectedKeysAction,
  changePreferentialSelectedKeysAction,
  changeConfigRecordAction,
  saveAction,
  delChargeConfigAction,
  setAppCodeAction,
  initfetchProductListAction,
  fetchProductListAction
}