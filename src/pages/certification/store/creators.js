import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';

const initListAction = list => ({
  type: types.INIT_LIST,
  list
})

//保存公告
const createSaveNoticeAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    console.log("保存公告req", req.data)
    const url = req.data.id ? requestURL.noticeUpdateNotice : requestURL.noticeAddNotice
    request.json(url, req.data, res => {
      console.log("保存公告res", res)
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          // const action = initNoticeListAction(data.results, createPagination(data))
          // dispatch(action)
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

//查询公告列表
const querylistAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    console.log("查询公告列表列表req", req.data)
    request.json(requestURL.authSelectByPage, req.data, res => {
      console.log("查询公告列表res", res)
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

//公告详情
const queryNoticeDetailAction = req => {
  return (dispatch, getState) => {
    dispatch(spinningAction(true))
    console.log("公告详情", req.data)
    request.json(requestURL.noticeGetNoticeDetail, req.data, res => {
      console.log("公告详情res", res)
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          dispatch(changeEditTitleAction(data.title))
          dispatch(changeEditorContentAction(data.content))
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

//编辑改变标题
const changeEditTitleAction = editTitle => ({
  type: types.CHANGE_EDIT_TITLE,
  editTitle
})

//编辑改变富文本内容
const changeEditorContentAction = editContent => ({
  type: types.CHANGE_EDIT_CONTENT,
  editContent
})

export {
  querylistAction,
  createSaveNoticeAction,
  createChangeParamsAction,
  changeEditTitleAction,
  changeEditorContentAction,
  queryNoticeDetailAction,
}