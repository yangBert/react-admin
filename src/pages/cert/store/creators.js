import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';

const queryCertListAction = list => ({
  type: types.QUERY_CERT_LIST,
  list
})

//查询证书列表
const createQueryCertlistAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    console.log("查询证书列表req", req)
    request.json(requestURL.certManageSelectCerts, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          console.log("查询证书列表res===", data.results)
          const action = queryCertListAction(data.results, createPagination(data))
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

//用户证书注册
const createInsertCertAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    console.log("用户证书注册", req)
    request.json(requestURL.certManageInsert, req.data, res => {
      console.log("用户证书注册res", res)
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const action = createQueryCertlistAction({ props: req.props, data: { pageSize: 10, pageNo: 1 } })
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
  createQueryCertlistAction,
  createChangeParamsAction,
  createInsertCertAction
}