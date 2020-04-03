import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';

const initListAction = (list, pagination) => ({
  type: types.RECHARGE_RULE_LIST_QUERY_LIST,
  list,
  pagination
})

const initListPreferentialListAction = (preferentialList, preferentialListPagination) => ({
  type: types.RECHARGE_RULE_LIST_QUERY_PREFERENTTIAL_LIST,
  preferentialList,
  preferentialListPagination
})

const initListBillingListAction = (billingList, billingListPagination) => ({
  type: types.RECHARGE_RULE_LIST_QUERY_BILLING_LIST,
  billingList,
  billingListPagination
})

const initProductListAction = (productList, productPagination) => ({
  type: types.RECHARGE_RULE_LIST_QUERY_PRODUCT_LIST,
  productList,
  productPagination
})

const changeConfigStrategyNameAction = (strategyName) => ({
  type: types.RECHARGE_RULE_LIST_CHANGE_CONFIG_STRATEGY_NAME,
  strategyName
})

const changeConfigStrategyCodeAction = (strategyCode) => ({
  type: types.RECHARGE_RULE_LIST_CHANGE_CONFIG_STRATEGY_CODE,
  strategyCode
})

const changeConfigBillingNameAction = (billingName) => ({
  type: types.RECHARGE_RULE_LIST_CHANGE_CONFIG_BILLING_NAME,
  billingName
})

const changeConfigBillingCodeAction = (billingCode) => ({
  type: types.RECHARGE_RULE_LIST_CHANGE_CONFIG_BILLING_CODE,
  billingCode
})

const changeConfigProductNameAction = (productName) => ({
  type: types.RECHARGE_RULE_LIST_CHANGE_CONFIG_PRODUCT_NAME,
  productName
})

const changeConfigProductCodeAction = (productCode) => ({
  type: types.RECHARGE_RULE_LIST_CHANGE_CONFIG_PRODUCT_CODE,
  productCode
})

const changeProductSelectedKeysAction = (productSelectedKeys) => ({
  type: types.RECHARGE_RULE_LIST_CHANGE_PRODUCT_SELECTED_KEYS,
  productSelectedKeys
})

const changeBillingSelectedKeysAction = (billingSelectedKeys) => ({
  type: types.RECHARGE_RULE_LIST_CHANGE_BILLING_SELECTED_KEYS,
  billingSelectedKeys
})

const changePreferentialSelectedKeysAction = (preferentialSelectedKeys) => ({
  type: types.RECHARGE_RULE_LIST_CHANGE_PREFERENTIAL_SELECTED_KEYS,
  preferentialSelectedKeys
})

const changeConfigRecordAction = (record) => ({
  type: types.RECHARGE_RULE_LIST_CHANGE_RECORD,
  record
})

//查询
const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    console.log("req", req)
    request.json(requestURL.accountGetBindRechargeRule, req.data, res => {
      console.log("res", res)
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
  return dispatch => {
    dispatch(spinningAction(true))
    const url = requestURL.accountBindRechargeRule
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

const unBindRechargeRuleAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    const url = requestURL.accountUnbindRechargeRule
    request.json(url, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data
        if (success) {
          notification('success', message)
          dispatch(queryListAction({
            props: req.props,
            data: { pageSize: 10, pageNo: 1, accountCode: req.data.accountCode }
          }))
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

//改变弹出层显示隐藏
const changeModalVisibleAction = (modalVisible, editStatus) => ({
  type: types.RECHARGE_RULE_LIST_CHANGE_MODAL_VISIBLE,
  modalVisible,
  editStatus
})

//改变状态
const setStatusAction = editStatus => ({
  type: types.RECHARGE_RULE_LIST_CHANGE_EDIT_STATUS,
  editStatus
})

//查询携带参数
const createChangeParamsAction = params => ({
  type: types.RECHARGE_RULE_LIST_CHANGE_SEARCH_PARAMS,
  params
})

export {
  queryListAction,
  queryPreferentialListAction,
  queryBillingListAction,
  queryProductListAction,
  setStatusAction,
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
  unBindRechargeRuleAction
}