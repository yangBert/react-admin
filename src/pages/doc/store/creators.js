import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';
import { Modal } from 'antd'
import BraftEditor from 'braft-editor';

const initlistAction = (list, pagination) => ({
  type: types.QUERY_LIST,
  list,
  pagination
})

const initProductListAction = productAllList => ({
  type: types.INIT_PRODUCT_ALL_LIST,
  productAllList,
})

//初始化文档分类
const initDocCatalogListAction = (docCatalogList) => ({
  type: types.QUERY_DOCCATALOG_LIST,
  docCatalogList,
})

//change文档分类
const setCatalogCodeAction = editCatalogCode => ({
  type: types.SET_EDIT_CATALOGO_CODE,
  editCatalogCode,
})


//保存文档
const createSaveAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    const url = req.data.id ? requestURL.docUpdateDocContent : requestURL.docAddDocContent
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
              dispatch(setCatalogCodeAction(""))
              dispatch(changeEditTitleAction(""))
              dispatch(changeEditorContentAction(BraftEditor.createEditorState('<p>请输入文档内容!</b></p>')))
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

//查询目录列表
const queryDocCatalogListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.docQueryCatalogPages, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          dispatch(initDocCatalogListAction(data.results))
          dispatch(setCatalogCodeAction(""))
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

//查询文档列表
const querylistAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    console.log("res", req.data)
    request.json(requestURL.docQueryContentPages, req.data, res => {
      dispatch(spinningAction(false))
      console.log("res", res)
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = initlistAction(data.results, createPagination(data))
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

//查询所产品
const queryProductlistAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.productSelectByPage, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = initProductListAction(data.results)
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
          dispatch(changeEditorContentAction(data.content))
          dispatch(changeEditorStateAction(data.state))
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
              dispatch(querylistAction({ props: req.props, data: params }));
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

//编辑改变富文本内容
const changeEditorStateAction = editState => ({
  type: types.CHANGE_EDIT_STATE,
  editState
})


export {
  querylistAction,
  queryDocCatalogListAction,
  createChangeParamsAction,
  queryProductlistAction,
  setCatalogCodeAction,
  createSaveAction,
  changeEditTitleAction,
  changeEditorContentAction,

  queryNoticeDetailAction,
  publishNoticeAction,
}