import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';
import { Modal } from 'antd'
import BraftEditor from 'braft-editor';
const initNoticeListAction = (list, pagination) => ({
  type: types.NOTICE_QUERY_NOTICE_LIST,
  list,
  pagination
})

//查询携带参数
const createChangeParamsAction = params => ({
  type: types.NOTICE_CHANGE_SEARCH_PARAMS,
  params
})

//编辑改变标题
const changeEditTitleAction = editTitle => ({
  type: types.NOTICE_CHANGE_EDIT_TITLE,
  editTitle
})

const changeEditNoticeTypeAction = editNoticeType => ({
  type: types.NOTICE_CHANGE_EDIT_NOTICE_TYPE,
  editNoticeType
})

//保存公告
const createSaveNoticeAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    const url = req.data.id ? requestURL.noticeUpdateNotice : requestURL.noticeAddNotice
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

//查询公告列表
const queryNoticelistAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.noticeQueryByPage, req.data, res => {
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

//公告详情
const queryNoticeDetailAction = req => {
  return (dispatch) => {
    dispatch(spinningAction(true))
    request.json(requestURL.noticeGetNoticeDetail, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          dispatch(changeEditTitleAction(data.title))
          dispatch(changeEditNoticeTypeAction(data.noticeType))
          req._this.setState({
            editorState: BraftEditor.createEditorState(data.content)
          })
        } else {
          notification('error', message)
        }
      } else {
        req._this.props.history.push("/500")
      }
    })
  }
}

//发布公告
const publishNoticeAction = req => {
  return (dispatch, getState) => {
    dispatch(spinningAction(true))
    request.json(requestURL.noticeUpdateNotice, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          notification('success', message)
          const pagination = getState().notice.pagination
          const params = {
            ...getState().notice.params,
            pageNo: pagination.current,
            pageSize: pagination.pageSize,
          }
          dispatch(queryNoticelistAction({ props: req.props, data: params }));
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
  queryNoticelistAction,
  createSaveNoticeAction,
  createChangeParamsAction,
  changeEditTitleAction,
  queryNoticeDetailAction,
  publishNoticeAction,
  changeEditNoticeTypeAction
}