import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';

const initListAction = (list, pagination) => ({
  type: types.QUERY_LIST,
  list,
  pagination
})

const saveLoadingAction = saveLoading => ({
  type: types.SAVE_LOADING,
  saveLoading
})


//查询
const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.managerSelectOrgManagerList, req.data, res => {
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

//审核
const auditAction = req => {
  return dispatch => {
    dispatch(saveLoadingAction(true))
    const url = requestURL.managerAuditOrgManager
    request.json(url, req.data, res => {
      dispatch(saveLoadingAction(false))
      if (res.data) {
        const { success, message } = res.data
        if (success) {
          notification('success', message)
          req.props.history.goBack()
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
  auditAction,
  createChangeParamsAction,
}