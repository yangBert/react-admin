import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import * as config from '../config';

const initListAction = (list) => ({
  type: types.QUERY_LIST,
  list,
})

const saveLoadingAction = saveLoading => ({
  type: types.SAVE_LOADING,
  saveLoading
})

const changeModalVisibleAction = (modalVisible, edit, record) => ({
  type: types.CHANGE_MODAL_VISIBLE,
  modalVisible,
  edit,
  record
})

const changeStrategyNameAction = strategyName => ({
  type: types.CHANGE_STRATEGY_NAME,
  strategyName
})

const changeStrategyCodeAction = strategyCode => ({
  type: types.CHANGE_STRATEGY_CODE,
  strategyCode
})

const changeStrategyStatusAction = strategyStatus => ({
  type: types.CHANGE_STRATEGY_STATUS,
  strategyStatus
})

const changeConfirmLoadingAction = confirmLoading => ({
  type: types.CHANGE_CONFIRM_LOADING,
  confirmLoading
})

const saveAction = req => {
  return dispatch => {
    dispatch(changeConfirmLoadingAction(true))
    const url = req.data.id ? requestURL.updateSafeStrategy : requestURL.safeStrategyAddSafeStrategy
    console.log("req update", req)
    request.json(url, req.data, res => {
      console.log("res update", res)
      dispatch(changeConfirmLoadingAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          notification('success', message)
          dispatch(changeModalVisibleAction(false, false, config.record))
          dispatch(queryListAction({ props: req.props, data: {} }))
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

const delAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    const url = requestURL.delSafeStrategy
    console.log("del", req)
    request.json(url, req.data, res => {
      console.log("del res", res)
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data
        if (success) {
          notification('success', message)
          dispatch(queryListAction({ props: req.props, data: {} }))
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    console.log("queryListAction req===>", req)
    request.json(requestURL.safeStrategySelectAll, req.data, res => {
      dispatch(spinningAction(false))
      console.log("queryListAction===>", res)
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = initListAction(data)
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
  saveAction,
  delAction,
  saveLoadingAction,
  changeModalVisibleAction,
  changeStrategyNameAction,
  changeStrategyCodeAction,
  changeStrategyStatusAction,
  changeConfirmLoadingAction
}