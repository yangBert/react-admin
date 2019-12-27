import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import createPagination from 'static/js/pagination';
import { Modal } from 'antd';

const { confirm } = Modal;

const queryAppListAction = (list, pagination) => ({
  type: types.QUERY_APP_LIST,
  list,
  pagination
})

//查询携带参数
const createChangeParamsAction = params => ({
  type: types.CHANGE_SEARCH_PARAMS,
  params
})

//新增清空value
const emptyAddValueAction = () => ({
  type: types.EMPTY_ADD_VALUE,
})

//审核应用
const appAuditAction = req => {
  return dispatch => {
    console.log("审核应用", req.data, requestURL.plateSettingAppAudit)
    dispatch(spinningAction(true))
    request.json(requestURL.plateSettingAppAudit, req.data, res => {
      dispatch(spinningAction(false))
      console.log("审核应用", res)
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          notification('success', message)
          req.com.setState({ visibleModal: false })
          req.com.props.history.push("/app/authList")
        } else {
          notification('error', message)
        }
      } else {
        req.com.props.history.push("/500")
      }
    })
  }
}

//修改查询信息
const queryEditAppAction = req => {
  return dispatch => {
    console.log("修改查询信息", req.data, requestURL.plateSettingAppDetail)
    dispatch(spinningAction(true))
    request.json(requestURL.plateSettingAppDetail, req.data, res => {
      dispatch(spinningAction(false))
      console.log("修改查询信息", res)
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          dispatch(onChangeAppNameAction(data.appName))
          dispatch(onChangeUrlAction(data.url))
          dispatch(onChangeDescribesAction(data.describes))
          dispatch(onChangeRedirectUrlAction(data.redirectUrl))
          dispatch(onChangeIconAction(data.icon))
          dispatch(onChangeAppTypeAction(data.extInfoBean.appType))
          dispatch(onChangeAuditModeAction(data.extInfoBean.auditMode))
          dispatch(changeLandingModesAction(data.extInfoBean.landingModes))
          dispatch(onChangeSupportCAsAction(data.extInfoBean.supportCAs))
          dispatch(onChangeEditAppIdAction(data.id))
          const iconArr = data.icon.split("gzdata.com.cn")
          const iconRUL = iconArr[iconArr.length - 1]
          implementURLtoBlob(req.com, iconRUL)
        } else {
          notification('error', message)
        }
      } else {
        req.com.props.history.push("/500")
      }
    })
  }
}

//根据图url获取file blob
function implementURLtoBlob(com, url) {
  request.urlToBlob(url, res => {

    blobToDataURI(res.data, function (base64) {
      const file = dataURLtoFile(base64, "icon.jpg")
      com.setState({ icon: file })
    })
  })
}

function blobToDataURI(blob, callback) {
  if (typeof blob !== 'undefined') {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function (e) {
      callback(e.target.result);
    }
  }
}

function dataURLtoFile(dataurl, filename) {//将base64转换为文件
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

//查询应用列表
const createQueryAppListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true))
    console.log("查询应用列表", req.data, requestURL.plateSettingSelectAppData)
    request.json(requestURL.plateSettingSelectAppData, req.data, res => {
      console.log("查询应用列表返回", res)
      dispatch(spinningAction(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = queryAppListAction(data.results, createPagination(data))
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

//查询应用授权密钥
const showSecretAction = req => {
  return () => {
    request.json(requestURL.plateSettingSelectAppAuthSecret, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const appSecret = JSON.parse(data).appSecret
          confirm({
            title: '应用授权密钥',
            content: appSecret,
            onOk() { },
            onCancel() { },
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

//修改应用状态
const createChangeAppStatusAction = req => {
  return (dispatch, getState) => {
    console.log("req", req, requestURL.plateSettingUpdateApp);
    dispatch(spinningAction(true))
    request.json(requestURL.plateSettingUpdateAppWithOutFile, req.data, res => {
      dispatch(spinningAction(false))
      console.log("resres", res);
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          const params = { ...getState().admin.params, pageNo: 1, pageSize: 10 }
          dispatch(createQueryAppListAction({ props: req.props, data: params }));
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

const initAllLandingModes = allLandingModes => ({
  type: types.INIT_ALL_LANDING_MODES,
  allLandingModes,
})

//处理返回数据
function implementResponseType(arr) {
  let a = []
  for (let i = 0; i < arr.length; i++) {
    let o = { label: arr[i].name, value: arr[i].code }
    a.push(o)
  }
  return a;
}

//查询app登录方式
const queryLoginTypeAction = req => {
  return dispatch => {
    request.json(requestURL.plateSettingLoginType, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const arr = implementResponseType(JSON.parse(data))
          dispatch(initAllLandingModes(arr));
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

const initAllAppTypes = allAppTypes => ({
  type: types.INIT_ALL_APP_TYPES,
  allAppTypes,
})

//查询所有应用类型
const queryAllAppTypeAction = req => {
  return dispatch => {
    console.log("req", req);
    request.json(requestURL.plateSettingDictByNine, req.data, res => {
      console.log("resres", res);
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const arr = implementResponseType(JSON.parse(data))
          dispatch(initAllAppTypes(arr));
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

const initAllSupportCAs = allSupportCAs => ({
  type: types.INIT_ALL_SUPPORT_CAS,
  allSupportCAs,
})

//查询所有支持CA机构
const queryAllSupportCAsAction = req => {
  return dispatch => {
    console.log("req", req);
    request.json(requestURL.plateSettingSelectCA, req.data, res => {
      console.log("resres", res);
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const arr = implementResponseType(JSON.parse(data))
          dispatch(initAllSupportCAs(arr));
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/500")
      }
    })
  }
}

const changeSaveLoading = saveLoading => ({
  type: types.CHANGE_SAVE_LOADING,
  saveLoading
})

//应用新增保存
const saveAppFormAction = req => {
  return (dispatch) => {
    dispatch(changeSaveLoading(true))
    let url;
    if (req.props.location.state && req.props.location.state.editAppId) {
      console.log("idididid", req.data.get("id"));
      url = requestURL.plateSettingUpdateAppWithOutFile
    } else {
      url = requestURL.plateSettingAddAppData
    }

    request.formData(url, req.data, res => {
      dispatch(changeSaveLoading(false))
      if (res.data) {
        const { success, message } = res.data && res.data
        if (success) {
          confirm({
            title: '信息提示',
            content: message,
            onOk() {
              req.props.history.push("/app/appList")
            },
            onCancel() { },
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

//设置iconBae64
const setIconBase64Action = iconBase64 => ({
  type: types.SET_ICON_BASE64,
  iconBase64
})


//修改应用名称
const onChangeAppNameAction = appName => ({
  type: types.CHANGE_FORM_APP_NAME,
  appName
})

//修改应用访问地址
const onChangeUrlAction = url => ({
  type: types.CHANGE_FORM_URL,
  url
})

//修改应用描述
const onChangeDescribesAction = describes => ({
  type: types.CHANGE_FORM_DESCRIBES,
  describes
})

//修改应用推送URL
const onChangeRedirectUrlAction = redirectUrl => ({
  type: types.CHANGE_FORM_REDIRECTURL,
  redirectUrl
})

//修改上传应用LOGO：
const onChangeIconAction = icon => ({
  type: types.CHANGE_FORM_ICON,
  icon
})

//修改应用类型：
const onChangeAppTypeAction = appType => ({
  type: types.CHANGE_FORM_APPTYPE,
  appType
})

//修改审核模式：
const onChangeAuditModeAction = auditMode => ({
  type: types.CHANGE_FORM_AUDITMODE,
  auditMode
})

//修改登陆认证方式：
const changeLandingModesAction = landingModes => ({
  type: types.CHANGE_FORM_LANDINGMODES,
  landingModes
})

//修改支持CA机构：
const onChangeSupportCAsAction = supportCAs => ({
  type: types.CHANGE_FORM_SUPPORTCAS,
  supportCAs
})

//改变编辑editAppId
const onChangeEditAppIdAction = editAppId => ({
  type: types.CHANGE_FORM_EDIT_APP_ID,
  editAppId
})


export {
  createQueryAppListAction,
  createChangeParamsAction,
  createChangeAppStatusAction,

  onChangeAppNameAction,
  onChangeUrlAction,
  onChangeDescribesAction,
  onChangeRedirectUrlAction,
  onChangeIconAction,
  onChangeAppTypeAction,
  onChangeAuditModeAction,
  changeLandingModesAction,
  onChangeSupportCAsAction,

  queryLoginTypeAction,
  queryAllSupportCAsAction,
  queryAllAppTypeAction,
  setIconBase64Action,
  saveAppFormAction,
  showSecretAction,
  queryEditAppAction,
  appAuditAction,
  emptyAddValueAction
}