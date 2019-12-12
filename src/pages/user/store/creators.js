import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';

const queryUserAction = (list, pagination) => ({
  type: types.QUERY_USER_LIST,
  list,
  pagination,
})

const createChangeParamsAction = params => ({
  type: types.CHANGE_SEARCH_PARAMS,
  params
})

//查询管理员
const createQueryUserAction = requestData => {
  return dispatch => {
    dispatch(spinningAction(true))
    console.log("Query requestData", requestData)
    request.json(requestURL.userSelectUsers, requestData, res => {
      dispatch(spinningAction(false))
      console.log("Query res", res)
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = queryUserAction(data.results, createPagination(data))
          dispatch(action)
        } else {
          notification('error', message)
        }
      } else {
        notification('error', res)
      }
    })
  }
}





export {
  createQueryUserAction,
  createChangeParamsAction,
}