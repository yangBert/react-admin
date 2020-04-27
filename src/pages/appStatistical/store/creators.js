import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import { Modal } from 'antd';

const initTypesListAction = typesList => ({
  type: types.INIT_APP_STATISTICAL_TYPES_LIST,
  typesList,
})

const initTableListAction = tableList => ({
  type: types.INIT_APP_STATISTICAL_TABLE_LIST,
  tableList,
})

function createTableList(arr) {
  let a = []
  for (let i = 0; i < arr.length; i++) {
    const list = arr[i].list
    const { total, balanceMoney, preferentialMoney, actPayMoney, applicationName, accountCode } = arr[i]
    let o = { total, balanceMoney, preferentialMoney, actPayMoney, applicationName, accountCode }
    let payMoneyTotal = 0;
    let sumTotal = 0;
    for (let j = 0; j < list.length; j++) {
      o[list[j].operType] = list[j].sum
      payMoneyTotal += list[j].payMoney
      sumTotal += list[j].sum
    }
    o.payMoneyTotal = payMoneyTotal
    o.sumTotal = sumTotal
    a.push(o)
  }
  return a
}

const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.statisGetApplicationStatis, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          dispatch(initTypesListAction(Array.isArray(data.results) && data.results[0].list))
          dispatch(initTableListAction(createTableList(data.results)))
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

const consumeAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.chargeConsume, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          Modal.success({
            title: '系统提示',
            content: message,
            okText: '确认',
            onOk: () => {
              dispatch(queryListAction({ props: req.props, data: {} }))
            }
          });
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

//查询携带参数
const createChangeParamsAction = params => ({
  type: types.CHANGE_SEARCH_PARAMS,
  params
})

export {
  queryListAction,
  createChangeParamsAction,
  consumeAction,
}