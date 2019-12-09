import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';

const changeAddModalvisibleAction = (addModalvisible, operationType, record) => ({
  type: types.CHANGE_ADD_MODAL_VISIBLE,
  addModalvisible,
  operationType,
  record,
})

const queryRoleAction = (list) => ({
  type: types.QUERY_ROLE_LIST,
  list
})

const createAddRoleAction = (requestData, type) => {
  return dispatch => {
    const url = type ? requestURL.powerUpdateRoleURL : requestURL.powerNewRoleURL;
    console.log("requestData", url, requestData);
    request.json(url, requestData, res => {
      console.log("res", res)
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          notification('success', message)
          const action = changeAddModalvisibleAction(false, "", {});
          dispatch(action);
          dispatch(queryRoleListAction({}));
        } else {
          notification('error', message)
        }
      } else {
        notification('error', res)
      }
    })
  }
}

const queryRoleListAction = requestData => {
  return dispatch => {
    dispatch(spinningAction(true))
    console.log("Query requestData========", requestData)
    request.json(requestURL.powerSelectAllRoleURL, requestData, res => {
      dispatch(spinningAction(false))
      console.log("Query res=========", res)
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = queryRoleAction(data)
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

const createDeleteRoleAction = requestData => {
  return dispatch => {
    console.log("managerDeleteAdminURL", requestURL.powerDeleteRoleURL, requestData)
    request.json(requestURL.powerDeleteRoleURL, requestData, res => {
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          dispatch(queryRoleListAction({}));
        } else {
          notification('error', message)
        }
      } else {
        console.log(res)
        //notification('error', res)
      }

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
          dispatch(queryRoleAction(req.params));
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
  queryRoleListAction,
  changeAddModalvisibleAction,
  createAddRoleAction,
  createDeleteRoleAction,
  createChangeStatusAction,
  createChangeParamsAction,
}