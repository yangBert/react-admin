import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';
import { Modal } from 'antd'

const initListAction = (list, pagination) => ({
  type: types.QUERY_LIST,
  list,
  pagination
})

//改变计费策略
const onChangeEditTitleAction = editTitle => ({
  type: types.CHANGE_EDIT_TITLE,
  editTitle
})

//改变金额
const onChangeEditAmountAction = editAmount => ({
  type: types.CHANGE_EDIT_Amount,
  editAmount
})

//改变类型
const onChangeEditTypeAction = editType => ({
  type: types.CHANGE_EDIT_TYPE,
  editType
})

//改变保存loading
const onChangeSaveLoadingAction = saveLoading => ({
  type: types.CHANGE_SAVE_LOADING,
  saveLoading
})

const onChangeEditMaxLimitAction = editMaxLimit => ({
  type: types.CHANGE_EDIT_MAX_LIMIT,
  editMaxLimit
})

//保存和修改
const saveAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    const url = req.data.id ? requestURL.chargeRuleUpdate : requestURL.chargeRuleAdd
    request.json(url, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          Modal.success({
            title: '系统提示',
            content: message,
            okText: '确认',
            onOk: () => {
              req.props.history.goBack()
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

//查询
const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.chargeRuleQueryByPage, req.data, res => {
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
const updateStateAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    const url = requestURL.chargeRuleUpdate
    request.json(url, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const action = queryListAction({ props: req.props, data: { pageNo: 1, pageSize: 10 } })
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

//查询携带参数
const createChangeParamsAction = params => ({
  type: types.CHANGE_SEARCH_PARAMS,
  params
})

export {
  queryListAction,
  onChangeEditTitleAction,
  onChangeEditAmountAction,
  onChangeEditTypeAction,
  saveAction,
  onChangeSaveLoadingAction,
  createChangeParamsAction,
  updateStateAction,
  onChangeEditMaxLimitAction

}