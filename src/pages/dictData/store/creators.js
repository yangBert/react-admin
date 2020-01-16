import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';

const initDictTypeListAction = typeList => ({
  type: types.QUERY_DICT_TYPE_LIST,
  typeList,
})

const initDictDataListAction = (dataList, pagination) => ({
  type: types.QUERY_DICT_DATA_LIST,
  dataList,
  pagination
})

//改变新增或修改弹出层显示或隐藏
const changeAddModalvisibleAction = (addModalvisible, operationType, record) => ({
  type: types.CHANGE_ADD_MODAL_VISIBLE,
  addModalvisible,
  operationType,
  record,
})

//新增或修改提交按钮loading状态
const changeConfirmLoadingAction = ConfirmLoading => ({
  type: types.CHANGE_CONFIRM_LOADING,
  ConfirmLoading,
})

//查询字典数据
const queryDictDataListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.plateSettingSelectDictionaryApp, req.data, res => {
      dispatch(spinningAction(false))
      console.log("data", res)
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = initDictDataListAction(data.results, createPagination(data))
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

//删除字典类型
const deleteDictDataAction = req => {
  return (dispatch, getState) => {
    dispatch(spinningAction(true))
    request.json(requestURL.plateSettingDeleteDictionaryApp, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const params = { ...getState().dictData.params, pageNo: 1, pageSize: 10 }
          dispatch(queryDictDataListAction({ props: req.props, data: params }));
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

//新增或修改类型
const createAddAction = req => {
  return (dispatch, getState) => {
    const url = req.type ? requestURL.plateSettingUpdateDictionaryApp : requestURL.plateSettingAddDictionaryApp;
    dispatch(changeConfirmLoadingAction(true))
    request.json(url, req.data, res => {
      dispatch(changeConfirmLoadingAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          notification('success', message)
          const action = changeAddModalvisibleAction(false, "", {});
          dispatch(action);
          const pagination = getState().dictData.pagination
          const params = {
            ...getState().dictData.params,
            pageNo: pagination.current,
            pageSize: pagination.pageSize
          }
          dispatch(queryDictDataListAction({ props: req.props, data: params }));
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

//查询字典类型
const queryDictTypeListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.plateSettingSelectDictionaryType, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = initDictTypeListAction(data.results)
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

export {
  initDictTypeListAction,
  queryDictDataListAction,
  deleteDictDataAction,
  changeAddModalvisibleAction,
  createAddAction,
  queryDictTypeListAction,

  createChangeParamsAction,

}