import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';
import { Modal } from 'antd'
import BraftEditor from 'braft-editor';
const initNoticeListAction = (list, pagination) => ({
  type: types.QUESTION_QUERY_LIST,
  list,
  pagination
})

//保存公告
const createSaveAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    const url = req.data.id ? requestURL.webManagerQuestionUpdate : requestURL.webManagerQuestionAdd
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
const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.questionQueryQuestionByPage, req.data, res => {
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


const queryDetailAction = req => {
  return (dispatch) => {
    dispatch(spinningAction(true))
    request.json(requestURL.webManagerQuestionDetail, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          dispatch(changeEditorContentAction(BraftEditor.createEditorState(data.content)))
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

//发布公告
const publishNoticeAction = req => {
  return (dispatch, getState) => {
    dispatch(spinningAction(true))
    request.json(requestURL.noticePublishNotice, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          Modal.success({
            title: '系统提示',
            content: message,
            okText: '确认',
            onOk: () => {
              const pagination = getState().notice.pagination
              const params = {
                ...getState().notice.params,
                pageNo: pagination.current,
                pageSize: pagination.pageSize,
              }
              dispatch(queryListAction({ props: req.props, data: params }));
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

//查询携带参数
const createChangeParamsAction = params => ({
  type: types.QUESTION_CHANGE_SEARCH_PARAMS,
  params
})

//编辑改变标题
const changeEditTitleAction = editTitle => ({
  type: types.QUESTION_CHANGE_EDIT_TITLE,
  editTitle
})

//改变类型
const setEditTypeAction = editType => ({
  type: types.QUESTION_CHANGE_EDIT_TYPE,
  editType
})

//编辑改变富文本内容
const changeEditorContentAction = editContent => ({
  type: types.QUESTION_CHANGE_EDIT_CONTENT,
  editContent
})


export {
  queryListAction,
  createSaveAction,
  createChangeParamsAction,
  changeEditTitleAction,
  setEditTypeAction,
  changeEditorContentAction,
  publishNoticeAction,
  queryDetailAction,
}