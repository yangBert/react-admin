import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';

const initDictTypeListAction = (list, pagination) => ({
  type: types.QUERY_DICT_TYPE_LIST,
  list,
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

//查询
const queryDictTypeListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.plateSettingSelectDictionaryType, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = initDictTypeListAction(data.results, createPagination(data))
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
const deleteDictTypeAction = req => {
  return (dispatch, getState) => {
    dispatch(spinningAction(true))
    request.json(requestURL.plateSettingDeleteDicType, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const params = {
            ...getState().dictType.params,
            pageNo: 1,
            pageSize: 10
          }
          dispatch(queryDictTypeListAction({ props: req.props, data: params }));
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
    const url = req.type ? requestURL.plateSettingUpdateDicType : requestURL.plateSettingAddDicType;
    dispatch(changeConfirmLoadingAction(true))
    request.json(url, req.data, res => {
      dispatch(changeConfirmLoadingAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          notification('success', message)
          const action = changeAddModalvisibleAction(false, "", {});
          dispatch(action);

          const pagination = getState().dictType.pagination
          const params = {
            ...getState().dictType.params,
            pageNo: pagination.current,
            pageSize: pagination.pageSize
          }
          dispatch(queryDictTypeListAction({ props: req.props, data: params }));
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
  queryDictTypeListAction,
  deleteDictTypeAction,
  changeAddModalvisibleAction,
  createAddAction,

  createChangeParamsAction,

}