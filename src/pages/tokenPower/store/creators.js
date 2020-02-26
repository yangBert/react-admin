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

//改变editTitle
const onChangeEditTitleAction = editTitle => ({
  type: types.CHANGE_EDIT_TITLE,
  editTitle
})

//改变editURL
const onChangeEditURLAction = editURL => ({
  type: types.CHANGE_EDIT_URL,
  editURL
})

//改变editRemarks
const onChangeEeditRemarksAction = editRemarks => ({
  type: types.CHANGE_EDIT_REMARKS,
  editRemarks
})


const onChangeEditStatusAction = editStatus => ({
  type: types.CHANGE_EDIT_STATUS,
  editStatus
})

//改变保存loading
const onChangeSaveLoadingAction = saveLoading => ({
  type: types.CHANGE_SAVE_LOADING,
  saveLoading
})

//保存和修改
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

//查询
const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.tokenPowerSelectInterList, req.data, res => {
      dispatch(spinningAction(false))
      console.log("res",res)
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

//修改状态
const updateStateAction = req => {
  return (dispatch,getState) => {
    dispatch(spinningAction(true))
    const url = requestURL.webManagerLinkChangeStatus
    request.json(url, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const pagination = getState().link.pagination
          const params = {
            ...getState().link.params,
            pageNo: pagination.current,
            pageSize: pagination.pageSize
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

const deleteAction = req => {
  return (dispatch, getState) => {
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



//查询携带参数
const createChangeParamsAction = params => ({
  type: types.CHANGE_SEARCH_PARAMS,
  params
})

export {
  queryListAction,
  onChangeEditTitleAction,
  onChangeEditURLAction,
  onChangeEeditRemarksAction,
  onChangeEditStatusAction,
  saveAction,
  deleteAction,
  onChangeSaveLoadingAction,
  createChangeParamsAction,
  updateStateAction

}