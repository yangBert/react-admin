import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';

const initNoticeListAction = list => ({
  type: types.QUERY_NOTICE_LIST,
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
        const { success, message, data } = res.data && res.data
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
const queryNoticelistAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    console.log("查询公告列表列表req", req.data)
    request.json(requestURL.noticeQueryByPage, req.data, res => {
      console.log("查询公告列表res", res)
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = initNoticeListAction(data.results, createPagination(data))
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
  queryNoticelistAction,
  createSaveNoticeAction,
  createChangeParamsAction,
  changeEditTitleAction,
  changeEditorContentAction,
}