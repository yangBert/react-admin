import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';
import { Modal } from 'antd'

const initListAction = (list, pagination) => ({
  type: types.INIT_LIST,
  list,
  pagination
})


const initProductListAction = productList => ({
  type: types.INIT_PRODUCT_LIST,
  productList,
})

//保存
const saveFormAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    const url = req.data.id ? requestURL.docUpdateDocCatalog : requestURL.docAddDocCatalog
    console.log("修改", req.data)
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

//查询目录列表
const querylistAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    console.log("req", req.data)
    request.json(requestURL.docQueryCatalogPages, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          console.log("目录列表", res)
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

//查询所有产品列表
const queryProductListAction = req => {
  return dispatch => {
    request.json(requestURL.productSelectByPage, req.data, res => {
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


//查询携带参数
const createChangeParamsAction = params => ({
  type: types.CHANGE_SEARCH_PARAMS,
  params
})

//改变产品
const onChangeProductCodeAction = editProductCode => ({
  type: types.CHANGE_EDIT_PRODUCT_CODE,
  editProductCode
})

//改变产品名称
const onChangeEditNameAction = editName => ({
  type: types.CHANGE_EDIT_NAME,
  editName
})

//排序号
const onChangeOrdersAction = editOrders => ({
  type: types.CHANGE_EDIT_ORDERS,
  editOrders
})



export {
  querylistAction,
  saveFormAction,
  createChangeParamsAction,
  queryProductListAction,
  onChangeProductCodeAction,
  onChangeEditNameAction,
  onChangeOrdersAction,
}