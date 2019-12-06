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

const queryUserAction = list => ({
  type: types.QUERY_USER_LIST,
  list
})

const createAddUserAction = (requestData, type) => {
  return dispatch => {
    const url = type ? requestURL.managerUpdateAdminInfoURL : requestURL.managerRegistertURL;
    request.json(url, requestData, res => {
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          notification('success', message)
          const action = changeAddModalvisibleAction(false, "", {});
          dispatch(action);
          dispatch(createQueryUserAction({}));
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
  console.log(55555)
  return dispatch => {
    console.log("dispatch", 4444)
    dispatch(spinningAction(true))
    console.log("Query", requestData)
    request.json(requestURL.managerSelectAdminListURL, requestData, res => {
      dispatch(spinningAction(false))
      console.log("Query res", res)
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = queryUserAction(data.results)
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

const createDeleteUserAction = requestData => {
  return dispatch => {
    console.log("requestData", requestData);
    request.string(requestURL.managerDeleteAdminURL, requestData, res => {
      console.log("res==000000000000>", res)
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          dispatch(createQueryUserAction({}));
        } else {
          notification('error', message)
        }
      } else {
        notification('error', res)
      }

    })
  }
}

const createChangeStatusAction = requestData => {
  return dispatch => {
    console.log("Status", requestData);
    request.json(requestURL.managerUpdateAdminInfoURL, requestData, res => {
      console.log("managerUpdateAdminInfoURL", res)
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          dispatch(createQueryUserAction({}));
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
  changeAddModalvisibleAction,
  createAddUserAction,
  createDeleteUserAction,
  createChangeStatusAction,
}