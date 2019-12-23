import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';

const initQueryUserAction = (list, pagination) => ({
  type: types.QUERY_USER_LIST,
  list,
  pagination,
})

const createChangeParamsAction = params => ({
  type: types.CHANGE_SEARCH_PARAMS,
  params
})

//查询用户
const createQueryUserAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.userSelectUsers, req.data, res => {
      console.log("查询用户", res)
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = initQueryUserAction(data.results, createPagination(data))
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
  createQueryUserAction,
  createChangeParamsAction,
}