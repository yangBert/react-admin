import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';

const initListAction = (list, pagination) => ({
  type: types.QUERY_LIST,
  list,
  pagination
})

//查询
const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    console.log("req", req)
    request.json(requestURL.chargeAppQueryByPage, req.data, res => {
      dispatch(spinningAction(false))
      console.log("res", res)
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
const updateAction = req => {
  return (dispatch, getState) => {
    dispatch(spinningAction(true))
    const url = requestURL.webManagerUserChangeUserStatus
    request.json(url, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          notification('success', message)
          const pagination = getState().clientUser.pagination
          const params = {
            ...getState().clientUser.params,
            pageNo: pagination.current,
            pageSize: pagination.pageSize
          }
          dispatch(queryListAction({ props: req.props, data: params }));
          dispatch(changeModalVisibleAction(false, ""))
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

//改变弹出层显示隐藏
const changeModalVisibleAction = (modalVisible, editStatus) => ({
  type: types.CHANGE_MODAL_VISIBLE,
  modalVisible,
  editStatus
})

//改变状态
const setStatusAction = editStatus => ({
  type: types.CHANGE_EDIT_STATUS,
  editStatus
})

//查询携带参数
const createChangeParamsAction = params => ({
  type: types.CHANGE_SEARCH_PARAMS,
  params
})

export {
  queryListAction,
  setStatusAction,
  updateAction,
  changeModalVisibleAction,
  createChangeParamsAction,
}