import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';

//改变确定按钮loading
const changeConfirmLoadingAction = ConfirmLoading => ({
  type: types.CHANGE_CONFIRM_LOADING,
  ConfirmLoading,
})

//改变新增角色Modal显示或隐藏
const changeAddModalvisibleAction = (addModalvisible, operationType, record) => ({
  type: types.CHANGE_ADD_MODAL_VISIBLE,
  addModalvisible,
  operationType,
  record,
})

//初始化角色列表
const queryRoleAction = (list) => ({
  type: types.QUERY_ROLE_LIST,
  list
})

//菜单弹出层显示和隐藏
const menuModalvisibleAction = (menuModalvisible, selectedRoleId, checkedKeys) => ({
  type: types.CHANGE_MENU_MODAL_VISIBLE,
  menuModalvisible,
  selectedRoleId,
  checkedKeys
})

//初始化菜单列表
const initMenuAction = (menuList) => ({
  type: types.INIT_MENU_LIST,
  menuList,
})

//新增角色或修改角色
const createAddRoleAction = (requestData, type) => {
  return dispatch => {
    const url = type ? requestURL.powerUpdateRoleURL : requestURL.powerNewRoleURL;
    request.json(url, requestData, res => {
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const action = changeAddModalvisibleAction(false, "", {});
          dispatch(action);
          dispatch(queryRoleListAction({}));
          notification('success', message)
        } else {
          notification('error', message)
        }
      } else {
        notification('error', res)
      }
    })
  }
}

//查询角色
const queryRoleListAction = requestData => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.powerSelectAllRoleURL, requestData, res => {
      dispatch(spinningAction(false))
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

//删除角色
const createDeleteRoleAction = requestData => {
  return dispatch => {
    request.json(requestURL.powerDeleteRoleURL, requestData, res => {
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
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

//改变角色状态
const createChangeStatusAction = req => {
  return dispatch => {
    request.json(requestURL.powerUpdateRoleURL, req.requestData, res => {
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          dispatch(queryRoleListAction({})); 
          notification('success', message)
        } else {
          notification('error', message)
        }
      } else {
        notification('error', res)
      }

    })
  }
}

//查询所有系统菜单
const queryMenuAction = requestData => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.powerSelectAllMenu, requestData, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = initMenuAction(data)
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

//处理返回的角色已绑定数据
function implementData(data) {
  var arr = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].checked) {
      arr.push(data[i].menuId)
    }
  }
  return arr
}

//查询角色已绑定的菜单
const queryHaveMenusAction = requestData => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.powerSelectUserMenu, requestData, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = menuModalvisibleAction(true, requestData.userId, implementData(data))
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

//保存角色权限分配
const roleBindMenuAction = requestData => {
  return dispatch => {
    dispatch(changeConfirmLoadingAction(true))
    request.jsonArr(requestURL.powerUserBindMenu, requestData, res => {
      dispatch(changeConfirmLoadingAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const action = menuModalvisibleAction(false, "")
          dispatch(action)
          notification('success', "配置权限成功")
        } else {
          notification('error', message)
        }
      } else {
        notification('error', res)
      }
    })
  }
}

//改变选中的角色
const changeCheckedKeysAction = checkedKeys => ({
  type: types.CHANGE_CHECKED_KEYS_ACTION,
  checkedKeys,
})

export {
  queryRoleListAction,
  changeAddModalvisibleAction,
  createAddRoleAction,
  createDeleteRoleAction,
  createChangeStatusAction,
  menuModalvisibleAction,
  queryMenuAction,
  roleBindMenuAction,
  queryHaveMenusAction,
  changeCheckedKeysAction,
  changeConfirmLoadingAction,
}