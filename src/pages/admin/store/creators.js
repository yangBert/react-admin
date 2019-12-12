import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';

const changeConfirmLoadingAction = ConfirmLoading => ({
  type: types.CHANGE_CONFIRM_LOADING,
  ConfirmLoading,
})

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

const initSelectedRole = selectedRoles => ({
  type: types.INIT_SELECTED_ROLES,
  selectedRoles,
})

const changeRoleModalVisibleAction = roleModalVisible => ({
  type: types.CHANGE_ROLE_MODAL_VISIBLE,
  roleModalVisible,
})

//初始化所有角色
const initRoleAllAction = roleAllList => ({
  type: types.INIT_ROLE_ALL_LIST,
  roleAllList,
})

//初始化角色绑定需要的adminId
const initRoleAdminId = roleAdminId => ({
  type: types.INIT_ROLE_ADMINID,
  roleAdminId,
})

//管理员绑定角色按钮Loading
const changeConfirmLoadingRole = ConfirmLoadingRole => ({
  type: types.CHANGE_CONFIRMLOADING_ROLE,
  ConfirmLoadingRole,
})

//新增或修改管理员
const createAddUserAction = (requestData, type) => {
  return dispatch => {
    const url = type ? requestURL.managerUpdateAdminInfoURL : requestURL.managerRegistertURL;
    dispatch(changeConfirmLoadingAction(true))
    request.json(url, requestData, res => {
      dispatch(changeConfirmLoadingAction(false))
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
    })
  }
}

//查询管理员
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

//删除管理员
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
        notification('error', res)
      }
    })
  }
}

//修改管理员状态
const createChangeStatusAction = req => {
  return dispatch => {
    request.json(requestURL.managerUpdateAdminInfoURL, req.requestData, res => {
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

//已绑定角色处理数据
function mapSelectedRoles(arr) {
  let selectedRoles = []
  for (let i = 0; i < arr.length; i++) {
    selectedRoles.push(arr[i].roleId)
  }
  return selectedRoles
}

//所有角色处理数据
function mapAllRoles(list) {
  let options = []
  for (let i = 0; i < list.length; i++) {
    options.push({
      value: list[i].roleId,
      label: list[i].roleName,
      roleStatue: list[i].roleStatue,
    })
  }
  return options
}

//查询所有角色
const queryAllRoleAction = requestData => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.powerSelectAllRoleURL, {}, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = initRoleAllAction(mapAllRoles(data))
          dispatch(action)
          dispatch(querySelectedRoleAction(requestData))
        } else {
          notification('error', message)
        }
      } else {
        notification('error', res)
      }
    })
  }
}

//管理员查询已绑定角色
const querySelectedRoleAction = adminId => {
  return dispatch => {
    console.log("reqreqreqreq", "adminId=" + adminId)
    request.json(requestURL.powerSelectUserRole, "adminId=" + adminId, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const selectedRoles = mapSelectedRoles(data)
          dispatch(initSelectedRole(selectedRoles))
          dispatch(initRoleAdminId(adminId))
          dispatch(changeRoleModalVisibleAction(true))
        } else {
          notification('error', message)
        }
      } else {
        notification('error', res)
      }
    })
  }
}

//管理员绑定角色
const bindRoleAction = req => {
  return dispatch => {
    dispatch(changeConfirmLoadingRole(true))
    request.jsonArr(requestURL.powerUserBindRole, req, res => {
      dispatch(changeConfirmLoadingRole(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          dispatch(changeRoleModalVisibleAction(false))
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
  changeRoleModalVisibleAction,
  bindRoleAction,
  queryAllRoleAction,
}