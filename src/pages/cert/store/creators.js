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
    console.log("reqreq", req)
    request.json(requestURL.certManageSelectCerts, req.data, res => {
      console.log("resresresres", res)
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
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


//查询携带参数
const createChangeParamsAction = params => ({
  type: types.CHANGE_SEARCH_PARAMS,
  params
})

export {
  createQueryCertlistAction,
  createChangeParamsAction,
}