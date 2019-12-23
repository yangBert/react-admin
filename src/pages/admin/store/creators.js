import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';

//新增或修改提交按钮loading状态
const changeConfirmLoadingAction = ConfirmLoading => ({
  type: types.CHANGE_CONFIRM_LOADING,
  ConfirmLoading,
})

//改变新增或修改弹出层显示或隐藏
const changeAddModalvisibleAction = (addModalvisible, operationType, record) => ({
  type: types.CHANGE_ADD_MODAL_VISIBLE,
  addModalvisible,
  operationType,
  record,
})

//查询管理员action
const queryUserAction = (list, pagination) => ({
  type: types.QUERY_USER_LIST,
  list,
  pagination,
})

//初始化已选中的角色
const initSelectedRole = selectedRoles => ({
  type: types.INIT_SELECTED_ROLES,
  selectedRoles,
})

//改变角色配置弹出层显示隐藏
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
const createAddUserAction = req => {
  return (dispatch, getState) => {
    const url = req.type ? requestURL.managerUpdateAdminInfoURL : requestURL.managerRegistertURL;
    dispatch(changeConfirmLoadingAction(true))
    request.json(url, req.data, res => {
      dispatch(changeConfirmLoadingAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          notification('success', message)
          const action = changeAddModalvisibleAction(false, "", {});
          dispatch(action);

          const pagination = getState().admin.pagination
          const params = {
            ...getState().admin.params,
            pageNo: pagination.current,
            pageSize: pagination.pageSize
          }
          dispatch(createQueryUserAction({ props: req.props, data: params }));
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

//查询管理员
const createQueryUserAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.managerSelectAdminListURL, req.data, res => {
      dispatch(spinningAction(false))
      console.log("res", res)
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = queryUserAction(data.results, createPagination(data))
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

//删除管理员
const createDeleteUserAction = req => {
  return (dispatch, getState) => {
    request.json(requestURL.managerDeleteAdminURL, req.data, res => {
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const params = {
            ...getState().dictType.params,
            pageNo: 1,
            pageSize: 10
          }
          dispatch(createQueryUserAction({ props: req.props, data: params }));
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

//修改管理员状态
const createChangeStatusAction = req => {
  return (dispatch, getState) => {
    request.json(requestURL.managerUpdateAdminInfoURL, req.data, res => {
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const pagination = getState().admin.pagination
          const params = {
            ...getState().admin.params,
            pageNo: pagination.current,
            pageSize: pagination.pageSize
          }
          dispatch(createQueryUserAction({ props: req.props, data: params }));
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
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
const queryAllRoleAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.powerSelectAllRoleURL, {}, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = initRoleAllAction(mapAllRoles(data))
          dispatch(action)
          dispatch(querySelectedRoleAction(req))
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

//管理员查询已绑定角色
const querySelectedRoleAction = req => {
  return dispatch => {
    request.json(requestURL.powerSelectUserRole, "adminId=" + req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const selectedRoles = mapSelectedRoles(data)
          dispatch(initSelectedRole(selectedRoles))
          dispatch(initRoleAdminId(req.data))
          dispatch(changeRoleModalVisibleAction(true))
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

//管理员绑定角色
const bindRoleAction = req => {
  return dispatch => {
    dispatch(changeConfirmLoadingRole(true))
    request.jsonArr(requestURL.powerUserBindRole, req.data, res => {
      dispatch(changeConfirmLoadingRole(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          dispatch(changeRoleModalVisibleAction(false))
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