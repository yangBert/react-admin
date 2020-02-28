import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';
import { Modal } from 'antd'

const initListAction = (list, pagination) => ({
  type: types.QUERY_LIST,
  list,
  pagination
})

const onChangeEditTitleAction = editTitle => ({
  type: types.CHANGE_EDIT_TITLE,
  editTitle
})

const onChangeEditURLAction = editURL => ({
  type: types.CHANGE_EDIT_URL,
  editURL
})

const onChangeEeditRemarksAction = editRemarks => ({
  type: types.CHANGE_EDIT_REMARKS,
  editRemarks
})

const onChangeSaveLoadingAction = saveLoading => ({
  type: types.CHANGE_SAVE_LOADING,
  saveLoading
})

const createChangeParamsAction = params => ({
  type: types.CHANGE_SEARCH_PARAMS,
  params
})

const changeSelectedRowKeysAction = selectedRowKeys => ({
  type: types.CHANGE_SELECTED_ROW_KEYS,
  selectedRowKeys
})

const initRoleIdAction = roleId => ({
  type: types.INIT_ROLE_ID,
  roleId
})

const saveAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    const url = req.data.id ? requestURL.uamBaseTokenPowerUpdateInter : requestURL.uamBaseTokenPowerNewInter
    request.json(url, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          Modal.success({
            title: '系统提示',
            content: message,
            okText: '确认',
            onOk: () => {
              req.props.history.goBack()
            }
          });
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

function generateData(interIds, roleId) {
  let data = []
  for (let i = 0; i < interIds.length; i++) {
    let o = { interId: interIds[i], roleId }
    data.push(o)
  }
  return data
}

const saveConfigRoleAction = req => {
  return (dispatch, getState) => {
    dispatch(spinningAction(true))
    const { selectedRowKeys, roleId } = getState().tokenPower
    const data = generateData(selectedRowKeys, roleId)
    const url = requestURL.uamBaseTokenPowerNewTokenInterRole
    request.json(url, data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          Modal.success({
            title: '系统提示',
            content: message,
            okText: '确认',
            onOk: () => {
              req.props.history.goBack()
            }
          });
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

function parseData(arr) {
  let selectedRowKeys = []
  for (let i = 0; i < arr.length; i++) {
    selectedRowKeys.push(arr[i].interId)
  }
  return selectedRowKeys
}

const queryBindedAction = req => {
  return (dispatch) => {
    dispatch(spinningAction(true))
    const url = requestURL.uamBaseTokenPowerSelectTokenInterRoleList
    request.json(url, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data
        if (success) {
          dispatch(changeSelectedRowKeysAction(parseData(data.results)))
          dispatch(queryListAction({ props: req.props, data: { pageSize: 10, pageNo: 1 } }))
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

//查询
const queryListAction = req => {
  return (dispatch) => {
    dispatch(spinningAction(true))
    request.json(requestURL.tokenPowerSelectInterList, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = initListAction(data.results, createPagination(data))
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

const deleteAction = req => {
  return (dispatch) => {
    dispatch(spinningAction(true))
    const url = requestURL.uamBaseTokenPowerDeleteInter
    request.json(url, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const params = {
            pageNo: 1,
            pageSize: 10
          }
          dispatch(queryListAction({ props: req.props, data: params }));

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
  queryListAction,
  onChangeEditTitleAction,
  onChangeEditURLAction,
  onChangeEeditRemarksAction,
  saveAction,
  deleteAction,
  onChangeSaveLoadingAction,
  createChangeParamsAction,
  changeSelectedRowKeysAction,
  saveConfigRoleAction,
  initRoleIdAction,
  queryBindedAction,
}