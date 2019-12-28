import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';

//保存按钮Loading
const changeSaveLoadingAction = (saveLoading) => ({
  type: types.CHANGE_SAVE_LOADING,
  saveLoading,
})

//初始化机构列表
const initOrgAction = (list) => ({
  type: types.INIT_ORG_LIST,
  list,
})

//初始化机构树数据
const initOrgTreeAction = (treeList) => ({
  type: types.INIT_ORG_TREE_DATA,
  treeList,
})

//新增机构
const createAddOrgAction = req => {
  return dispatch => {
    console.log("req.data", req.data)
    let url;
    if (req.data.id) {
      url = requestURL.orgUpdateOrg
    } else {
      url = requestURL.orgAddOrg
    }
    dispatch(changeSaveLoadingAction(true))
    request.json(url, req.data, res => {
      dispatch(changeSaveLoadingAction(false))
      console.log("res", res)
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          notification('success', message)
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}


//处理菜单查询返回数据---删除空children
function implementMenusData(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].children && data[i].children.length > 0) {
      implementMenusData(data[i].children)
    } else if (data[i].children && data[i].children.length === 0) {
      delete data[i].children
    }
  }
  return data
}

//机构树数据处理
function implementTreeData(data) {
  for (let i = 0; i < data.length; i++) {

    data[i].title = data[i].orgName
    data[i].value = data[i].orgCode
    data[i].key = data[i].id
    if (data[i].children && data[i].children.length > 0) {
      implementTreeData(data[i].children)
    }
  }
  return data
}

//查询机构
const queryOrgListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    request.json(requestURL.orgQueryAllOrgTree, req.data, res => {
      dispatch(spinningAction(false))
      console.log("查询机构data", res)
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = initOrgAction(implementMenusData(data))
          const treeAction = initOrgTreeAction(implementTreeData(implementTreeData(data)))
          dispatch(action)
          dispatch(treeAction)
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

//修改机构状态
const updateOrgUpdateAction = req => {
  return dispatch => {
    console.log("req", req)
    request.json(requestURL.orgUpdateOrgState, req.data, res => {
      console.log("res", res)
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const action = queryOrgListAction({ props: req.props, data: { pageNo: 1, pageSize: 10 } })
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

//机构树数据处理
const initTreeAction = req => {
  return dispatch => {
    const treeAction = initOrgTreeAction(implementTreeData(implementTreeData(req)))
    dispatch(treeAction)
  }
}


//初始化表单
const initValuesAction = record => ({
  type: types.INIT_FORM_VALUES,
  record,
})

//改变表单机构名称
const setOrgNameAction = editOrgName => ({
  type: types.SET_ORG_NAME,
  editOrgName,
})

//改变表单机构编码
const setOrgCodeAction = editOrgCode => ({
  type: types.SET_ORG_CODE,
  editOrgCode,
})

//改变表单机构描述
const setOrgDescAction = editOrgDesc => ({
  type: types.SET_ORG_DESC,
  editOrgDesc,
})

//改变表单机构树
const setTreeValueAction = tree => ({
  type: types.SET_EDIT_TREE_VALUE,
  tree,
})


export {
  queryOrgListAction,
  createAddOrgAction,
  setOrgNameAction,
  setOrgCodeAction,
  setOrgDescAction,
  initValuesAction,
  setTreeValueAction,
  initTreeAction,
  changeSaveLoadingAction,
  updateOrgUpdateAction,
}