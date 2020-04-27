import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';
import { Modal } from 'antd';

const initListAction = (list, pagination) => ({
  type: types.PLAT_SETTING_INIT_LIST,
  list,
  pagination
})

//查询配置列表
const querylistAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.platSettingQueryByPage, req.data, res => {
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

//保存表单
const saveFormAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    const url = req.data.id ? requestURL.platSettingUpdatePlatSetting : requestURL.platSettingAddPlatSetting
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

//删除
const deleteAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    const url = requestURL.platSettingDelete
    request.json(url, req.data, res => {
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          notification('success', message)
          dispatch(querylistAction({ props: req.props, data: { pageSize: 10, pageNo: 1 } }))
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
  type: types.PLAT_SETTING_CHANGE_SEARCH_PARAMS,
  params
})

//改变配置名称
const onChangeSettingExpAction = editSettingExp => ({
  type: types.PLAT_SETTING_CHANGE_EDIT_SETTING_EXP,
  editSettingExp
})

//改变配置名称
const onChangeSettingKeyAction = editSettingKey => ({
  type: types.PLAT_SETTING_CHANGE_EDIT_SETTING_KEY,
  editSettingKey
})

const onChangeSettingValueAction = editSettingValue => ({
  type: types.PLAT_SETTING_CHANGE_EDIT_SETTING_VALUE,
  editSettingValue
})


export {
  querylistAction,
  onChangeSettingExpAction,
  createChangeParamsAction,
  onChangeSettingKeyAction,
  onChangeSettingValueAction,
  saveFormAction,
  deleteAction
}