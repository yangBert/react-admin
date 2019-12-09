import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';


const changeAddModalvisibleAction = (addModalvisible, operationType, record) => ({
  type: types.CHANGE_ADD_MODAL_VISIBLE,
  addModalvisible,
  operationType,
  record,
})

const queryUserAction = (list, pagination) => ({
  type: types.QUERY_USER_LIST,
  list,
  pagination,
})

const createAddUserAction = (requestData, type) => {
  return dispatch => {
    const url = type ? requestURL.managerUpdateAdminInfoURL : requestURL.managerRegistertURL;
    console.log("requestData", requestData)
    request.json(url, requestData, res => {
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          notification('success', message)
          const action = changeAddModalvisibleAction(false, "", {});
          dispatch(action);
          dispatch(createQueryUserAction({ pageSize: 10, pageNo: 1 }));
        } else {
          notification('error', message)
        }
      } else {
        notification('error', res)
      }
      console.log("res", res)
    })
  }
}

const createQueryUserAction = requestData => {
  return dispatch => {
    dispatch(spinningAction(true))
    console.log("Query requestData", requestData)
    request.json(requestURL.managerSelectAdminListURL, requestData, res => {
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

const createDeleteUserAction = req => {
  return dispatch => {
    console.log("delete", req.requestData)
    request.json(requestURL.managerDeleteAdminURL, req.requestData, res => {
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          dispatch(createQueryUserAction(req.params));
        } else {
          notification('error', message)
        }
      } else {
        //notification('error', res)
      }
      console.log("delete", res)
    })
  }
}

const createChangeStatusAction = req => {
  return dispatch => {
    request.json(requestURL.managerUpdateAdminInfoURL, req.requestData, res => {
      console.log("managerUpdateAdminInfoURL", res)
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          dispatch(createQueryUserAction(req.params));
        } else {
          notification('error', message)
        }
      } else {
        notification('error', res)
      }

    })
  }
}

const createChangeParamsAction = params => ({
  type: types.CHANGE_SEARCH_PARAMS,
  params
})

export {
  createQueryUserAction,
  changeAddModalvisibleAction,
  createAddUserAction,
  createDeleteUserAction,
  createChangeStatusAction,
  createChangeParamsAction,
}