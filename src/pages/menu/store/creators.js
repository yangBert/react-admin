import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';

const changeAddModalvisibleAction = addModalvisible => ({
  type: types.CHANGE_ADD_MODAL_VISIBLE,
  addModalvisible,
})

const changeEditModalvisibleAction = (editModalvisible, editRecord) => ({
  type: types.CHANGE_EDIT_MODAL_VISIBLE,
  editModalvisible,
  editRecord,
})

const initMenuAction = (list, pagination) => ({
  type: types.INIT_MENU_LIST,
  list,
  pagination,
})

const changeaddConfirmLoadingAction = addConfirmLoading => ({
  type: types.CHANGE_ADD_CONFIRM_LOADING,
  addConfirmLoading,
})

const changeEditConfirmLoadingAction = editConfirmLoading => ({
  type: types.CHANGE_EDIT_CONFIRM_LOADING,
  editConfirmLoading,
})

//新增菜单
const addMenuAction = requestData => {
  return dispatch => {
    dispatch(changeaddConfirmLoadingAction(true))
    request.json(requestURL.powerNewMenu, requestData, res => {
      dispatch(changeaddConfirmLoadingAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const action = queryMenuAction({})
          dispatch(action)
          dispatch(changeAddModalvisibleAction(false))
        } else {
          notification('error', message)
        }
      } else {
        notification('error', res)
      }
    })
  }
}

//修改菜单
const editMenuAction = requestData => {
  return dispatch => {
    dispatch(changeEditConfirmLoadingAction(true))
    request.json(requestURL.powerUpdateMenu, requestData, res => {
      dispatch(changeEditConfirmLoadingAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const action = queryMenuAction({})
          dispatch(action)
          dispatch(changeEditModalvisibleAction(false, {}))
        } else {
          notification('error', message)
        }
      } else {
        notification('error', res)
      }
    })
  }
}

//删除菜单
const deleteMenuAction = requestData => {
  return dispatch => {
    console.log("requestData", requestData)
    request.json(requestURL.powerDeleteMenu, requestData, res => {
      console.log("res", res)

      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const action = queryMenuAction({})
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


const queryMenuAction = requestData => {
  return dispatch => {
    dispatch(spinningAction(true))
    console.log("Query requestData", requestData)
    console.log("Query requestData", requestURL.powerSelectAllMenu)
    request.json(requestURL.powerSelectAllMenu, requestData, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          console.log("Query res", data)
          const action = initMenuAction(data, createPagination(data))
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
  queryMenuAction,
  changeAddModalvisibleAction,
  changeEditModalvisibleAction,
  addMenuAction,
  editMenuAction,
  deleteMenuAction
}