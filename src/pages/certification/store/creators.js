import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';
import { Modal } from 'antd'

const initListAction = (list, pagination) => ({
  type: types.INIT_LIST,
  list,
  pagination
})

//保存认证源
const createSaveFormAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    const url = req.data.authCode ? requestURL.authUpdateAuth : requestURL.authAddAuth
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
              req.props.history.goBack();
              //dispatch(cleanFormAction())
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

//查询认证源
const querylistAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.authSelectByPage, req.data, res => {
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

//删除认证源
const deleteRowAction = req => {
  return (dispatch, getState) => {
    dispatch(spinningAction(true))
    request.json(requestURL.authDelAuth, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const params = {
            ...getState().certification.params,
            pageNo: 1,
            pageSize: 10
          }
          dispatch(querylistAction({ props: req.props, data: params }));
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


//查询携带参数
const createChangeParamsAction = params => ({
  type: types.CHANGE_SEARCH_PARAMS,
  params
})

//认证源名称
const changeAuthNameAction = editAuthName => ({
  type: types.CHANGE_EDIT_AUTH_NAME,
  editAuthName
})

//认证接入URL
const changeEditURLAction = editURL => ({
  type: types.CHANGE_EDIT_URL,
  editURL
})

//认证等级
const changeAuthLevelAction = editAuthLevel => ({
  type: types.CHANGE_AUTH_LEVE,
  editAuthLevel
})

//认证源接口方式
const changeAuthStyleAction = editAuthStyle => ({
  type: types.CHANGE_AUTH_STYLE,
  editAuthStyle
})

//认证源接状态
const changeEditStatusAction = editStatus => ({
  type: types.CHANGE_EDIT_STATUS,
  editStatus
})

//清空表单
const cleanFormAction = () => ({
  type: types.CLEAN_FORM,
})

export {
  querylistAction,
  createSaveFormAction,
  createChangeParamsAction,
  changeAuthNameAction,
  changeEditURLAction,
  changeAuthLevelAction,
  changeAuthStyleAction,
  changeEditStatusAction,
  cleanFormAction,
  deleteRowAction
}