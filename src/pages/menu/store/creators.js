import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';

////改变新增弹出层显示和隐藏
const changeAddModalvisibleAction = addModalvisible => ({
  type: types.MENU_CHANGE_ADD_MODAL_VISIBLE,
  addModalvisible,
})

//改变修改弹出层显示和隐藏
const changeEditModalvisibleAction = editModalvisible => ({
  type: types.MENU_CHANGE_EDIT_MODAL_VISIBLE,
  editModalvisible,
})

//初始化要编辑的某一行数据
const changeEditRecordAction = editRecord => ({
  type: types.MENU_CHANGE_EDIT_RECORD,
  editRecord
})

//改变修改弹出层显示和隐藏
const changeEditAction = record => {
  return dispatch => {
    dispatch(changeEditModalvisibleAction(true))
    dispatch(changeEditRecordAction(record))
  }
}

//初始化菜单
const initMenuAction = (list) => ({
  type: types.MENU_INIT_MENU_LIST,
  list,
})

//新增弹出层提交按钮loading状态
const changeaddConfirmLoadingAction = addConfirmLoading => ({
  type: types.MENU_CHANGE_ADD_CONFIRM_LOADING,
  addConfirmLoading,
})

//改变编辑弹出层提交按钮loading状态
const changeEditConfirmLoadingAction = editConfirmLoading => ({
  type: types.MENU_CHANGE_EDIT_CONFIRM_LOADING,
  editConfirmLoading,
})

//新增菜单
const addMenuAction = req => {
  return dispatch => {
    dispatch(changeaddConfirmLoadingAction(true))
    request.json(requestURL.powerNewMenu, req.data, res => {
      dispatch(changeaddConfirmLoadingAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const action = queryMenuAction({ props: req.props, data: {} })
          dispatch(action)
          dispatch(changeAddModalvisibleAction(false))
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

//修改菜单
const editMenuAction = req => {
  return dispatch => {
    dispatch(changeEditConfirmLoadingAction(true))
    request.json(requestURL.powerUpdateMenu, req.data, res => {
      dispatch(changeEditConfirmLoadingAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const action = queryMenuAction({ props: req.props, data: {} })
          dispatch(changeEditModalvisibleAction(false))
          dispatch(action)
          notification('success', message)
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

//删除菜单
const deleteMenuAction = req => {
  return dispatch => {
    request.json(requestURL.powerDeleteMenu, req.data, res => {
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          notification('success', message)
          const action = queryMenuAction({ props: req.props, data: {} })
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

//查询菜单
const queryMenuAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.powerSelectAllMenu, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = initMenuAction(implementMenusData(data))
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

//处理菜单查询返回数据---删除空children
function implementMenusData(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].children && data[i].children.length > 0) {
      implementMenusData(data[i].children)
    } else if (data[i].children && data[i].children.length === 0) {
      delete data[i].children
    }
  }
  return implementParentName(data)
}

//给每个菜单添加父菜单名字
function implementParentName(data) {
  for (let i = 0; i < data.length; i++) {
    const parentName = data[i].menuName
    if (data[i].children && data[i].children.length > 0) {
      for (let j = 0; j < data[i].children.length; j++) {
        data[i].children[j].parentName = parentName
        if (data[i].children[j].children && data[i].children[j].children.length > 0) {
          implementParentName(data[i].children[j].children)
        }
      }
    }
  }
  return data
}

export {
  queryMenuAction,
  changeAddModalvisibleAction,
  changeEditModalvisibleAction,
  addMenuAction,
  editMenuAction,
  deleteMenuAction,
  changeEditAction,
}