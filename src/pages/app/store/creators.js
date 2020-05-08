import React from 'react';
import * as types from "./actionTypes";
import * as requestURL from "static/js/requestURL";
import * as request from "static/js/request";
import spinningAction from "pages/common/layer/spinning";
import notification from "pages/common/layer/notification";
import createPagination from "static/js/pagination";
import { Modal } from "antd";
import $$ from "static/js/base";

const { confirm } = Modal;

const queryAppListAction = (list, pagination) => ({
  type: types.APP_QUERY_APP_LIST,
  list,
  pagination
});

//查询携带参数
const createChangeParamsAction = params => ({
  type: types.APP_CHANGE_SEARCH_PARAMS,
  params
});

//新增清空value
const emptyAddValueAction = () => ({
  type: types.APP_EMPTY_ADD_VALUE
});

//初始化树
const initOrgTreesAction = orgList => ({
  type: types.APP_INIT_ORG_TREES,
  orgList
});

//改变机构树
const onChangeOrgTreeSelectAction = orgCode => ({
  type: types.APP_CHANGE_TREE_ORG_CODE,
  orgCode
});

//审核应用
const appAuditAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.json(requestURL.plateSettingAppAudit, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message } = res.data && res.data;
        if (success) {
          notification("success", message);
          req.com.setState({ visibleModal: false });
          req.com.props.history.push("/app/authList");
        } else {
          notification("error", message);
        }
      } else {
        req.com.props.history.push("/500");
      }
    });
  };
};

//修改查询信息
const queryEditAppAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.json(requestURL.plateSettingAppDetail, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          dispatch(onChangeAppNameAction(data.appName));
          dispatch(onChangeUrlAction(data.url));
          dispatch(onChangeDescribesAction(data.describes));
          dispatch(onChangeRedirectUrlAction(data.redirectUrl));
          dispatch(onChangeIconAction(data.icon));
          dispatch(onChangeAppTypeAction(data.extInfoBean.appType));
          dispatch(onChangeAuditModeAction(data.extInfoBean.auditMode));
          dispatch(changeLandingModesAction(data.extInfoBean.landingModes));
          dispatch(onChangeSupportCAsAction(data.extInfoBean.supportCAs));
          dispatch(onChangeEditAppIdAction(data.id));
          dispatch(onChangeOrgTreeSelectAction(data.orgCode));
          dispatch(onChangeTagAction(data.tag));
          console.log("detail", data);
          req.com.setState({ feeCode: data.feeCode });
          req.com.setState({ feeMoney: data.feeMoney });
          if (data.icon) {
            const iconArr = data.icon.split("gzdata.com.cn");
            const iconRUL = iconArr[iconArr.length - 1];
            implementURLtoBlob(req.com, iconRUL);
          }
        } else {
          notification("error", message);
        }
      } else {
        req.com.props.history.push("/500");
      }
    });
  };
};

//根据图url获取file blob
function implementURLtoBlob(com, url) {
  request.urlToBlob(url, res => {
    blobToDataURI(res.data, function (base64) {
      const file = dataURLtoFile(base64, "icon.jpg");
      com.setState({ icon: file });
    });
  });
}

function blobToDataURI(blob, callback) {
  if (typeof blob !== "undefined") {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function (e) {
      callback(e.target.result);
    };
  }
}

function dataURLtoFile(dataurl, filename) {
  //将base64转换为文件
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

//查询应用列表
const createQueryAppListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.json(requestURL.plateSettingSelectAppData, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          console.log("data", res)
          const action = queryAppListAction(
            data.results,
            createPagination(data)
          );
          dispatch(action);
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

//递归处理菜单查询返回数据---删除空children
function implementMenusData(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].children && data[i].children.length > 0) {
      implementMenusData(data[i].children);
    } else if (data[i].children && data[i].children.length === 0) {
      delete data[i].children;
    }
  }
  return data;
}

//递归机构树数据处理
function implementTreeData(data) {
  for (let i = 0; i < data.length; i++) {
    data[i].title = data[i].orgName;
    data[i].value = data[i].id;
    data[i].key = data[i].id;
    if (data[i].children && data[i].children.length > 0) {
      implementTreeData(data[i].children);
    }
  }
  return data;
}

//查询机构树
const queryOrgListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.json(requestURL.orgQueryAllOrgTree, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          const trees = implementTreeData(implementMenusData(data));
          const action = initOrgTreesAction(trees);
          dispatch(action);
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const createSecretAction = req => {
  return () => {
    request.json(requestURL.plateSettingGenerateKeyPair, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data;
        if (success) {
          notification("success", message);
          confirm({
            content: <div>
              <p>私钥：{data.appPriSecret}</p>
              <p>公钥：{data.appPubSecret}</p>
              <p>生成时间：{$$.getHours(data.createTime)}</p>
            </div>,
            onOk() { }
          });
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const showSecretAction = req => {
  return dispatch => {
    request.json(requestURL.plateSettingSelectAppAuthSecret, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data;
        if (success) {
          if (data) {
            confirm({
              title:
                "应用授权公钥已存在，若重新生成将会覆盖已存在的公钥，是否重新生成？",
              onOk() {
                dispatch(
                  createSecretAction({ props: req.props, data: req.data })
                );
              }
            });
          } else {
            dispatch(createSecretAction({ props: req.props, data: req.data }));
          }
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

//修改应用状态
const createChangeAppStatusAction = req => {
  return (dispatch, getState) => {
    dispatch(spinningAction(true));
    request.json(requestURL.plateSettingUpdateAppWithOutFile, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message } = res.data && res.data;
        if (success) {
          const pagination = getState().app.pagination;
          const params = {
            ...getState().admin.params,
            pageNo: pagination.current,
            pageSize: pagination.pageSize
          };
          dispatch(
            createQueryAppListAction({ props: req.props, data: params })
          );
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const initAllLandingModes = allLandingModes => ({
  type: types.APP_INIT_ALL_LANDING_MODES,
  allLandingModes
});

//处理返回数据
function implementResponseType(arr) {
  let a = [];
  for (let i = 0; i < arr.length; i++) {
    let o = { label: arr[i].name, value: arr[i].code };
    a.push(o);
  }
  return a;
}

//查询app登录方式
const queryLoginTypeAction = req => {
  return dispatch => {
    request.json(requestURL.plateSettingLoginType, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          const arr = implementResponseType(JSON.parse(data));
          dispatch(initAllLandingModes(arr));
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const initAllAppTypes = allAppTypes => ({
  type: types.APP_INIT_ALL_APP_TYPES,
  allAppTypes
});

//查询所有应用类型
const queryAllAppTypeAction = req => {
  return dispatch => {
    request.json(requestURL.plateSettingDictByNine, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          const arr = implementResponseType(JSON.parse(data));
          dispatch(initAllAppTypes(arr));
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const initAllSupportCAs = allSupportCAs => ({
  type: types.APP_INIT_ALL_SUPPORT_CAS,
  allSupportCAs
});

//查询所有支持CA机构
const queryAllSupportCAsAction = req => {
  return dispatch => {
    request.json(requestURL.plateSettingSelectCA, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          const arr = implementResponseType(JSON.parse(data));
          dispatch(initAllSupportCAs(arr));
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const initAllAuthLevel = allAuthLevel => ({
  type: types.APP_INIT_ALL_AUTH_LEVEL,
  allAuthLevel
});

//查询所有认证源等级
const getAuthLevelAction = req => {
  return dispatch => {
    request.json(requestURL.authGetAuthLevel, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          dispatch(initAllAuthLevel(data));
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const initAllProductType = allProductType => ({
  type: types.APP_INIT_ALL_PRODUCT_TYPE,
  allProductType
});

const initProductList = productList => ({
  type: types.APP_INIT_PRODUCT_LIST,
  productList
});

//初始化 计费策略列表
const initBillingList = billingList => ({
  type: types.APP_INIT_BILLING_LIST,
  billingList
});

//change 计费策略
const changeBillingAction = billing => ({
  type: types.APP_CHANGE_BILLING,
  billing
});

//搜索计费策略loading
const changeBillingFetching = billingFetching => ({
  type: types.APP_CHANGE_BILLING_FETCHING,
  billingFetching
});

//搜索优惠策略loading
const changePreferentialFetching = preferentialFetching => ({
  type: types.APP_CHANGE_PREFERENTIAL_FETCHING,
  preferentialFetching
});

//初始化 优惠策略
const initPreferentialList = preferentialList => ({
  type: types.APP_INIT_PREFERENTIAL_LIST,
  preferentialList
});

//change 优惠策略
const changePreferentialAction = preferential => ({
  type: types.APP_CHANGE_PREFERENTIAL,
  preferential
});

//选择产品
const changeProductAction = product => ({
  type: types.APP_CHANGE_PRODUCT,
  product
});

//查询所有产品类型
const getProductTypeAction = req => {
  return dispatch => {
    request.json(requestURL.productTypeSelectAll, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          dispatch(initAllProductType(data));
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

//根据 产品类型 查询 产品列表
const changeProductTypeAction = req => {
  return dispatch => {
    request.json(requestURL.productSelectByPage, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          dispatch(initProductList(data.results));
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

//关键字查询 计费策略
const queryBillingListAction = req => {
  return dispatch => {
    dispatch(changeBillingFetching(true));
    request.json(requestURL.chargeRuleQueryByPage, req.data, res => {
      dispatch(changeBillingFetching(false));
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          dispatch(initBillingList(data.results));
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

//关键字查询 优惠策略
const queryPreferentialListAction = req => {
  return dispatch => {
    dispatch(changePreferentialFetching(true));
    request.json(requestURL.chargePreferentialQueryByPage, req.data, res => {
      dispatch(changePreferentialFetching(false));
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          dispatch(initPreferentialList(data.results));
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

//应用 计费策略 优惠策略 配置
const saveFormAction = req => {
  return () => {
    request.json(requestURL.chargeAppAdd, req.data, res => {
      if (res.data) {
        const { success, message } = res.data && res.data;
        if (success) {
          confirm({
            title: "信息提示",
            content: message,
            onOk() {
              req.props.history.goBack();
            }
          });
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const changeSaveLoading = saveLoading => ({
  type: types.APP_CHANGE_SAVE_LOADING,
  saveLoading
});

//应用新增保存
const saveAppFormAction = req => {
  return dispatch => {
    dispatch(changeSaveLoading(true));
    let url;
    if (req.props.location.state && req.props.location.state.editAppId) {
      url = requestURL.plateSettingUpdateApp;
    } else {
      url = requestURL.plateSettingAddAppData;
    }
    request.formData(url, req.data, res => {
      dispatch(changeSaveLoading(false));
      if (res.data) {
        const { success, message } = res.data && res.data;
        if (success) {
          confirm({
            title: "信息提示",
            content: message,
            onOk() {
              req.props.history.push("/app/appList");
            }
          });
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

//应用配置详情
// const queryChargeAppDetailAction = req => {
//   return (dispatch) => {
//     dispatch(changeSaveLoading(true))
//     console.log("req", req.data)
//     request.json(requestURL.chargeAppDetail, req.data, res => {
//       dispatch(changeSaveLoading(false))
//       console.log("res", res)
//       if (res.data) {
//         const { success, message, data } = res.data && res.data
//         if (success) {
//           if (data !== null) {

//             dispatch(changeProductAction(""))
//             dispatch(changeBillingAction(""))
//             dispatch(changePreferentialAction(""))
//           }
//         } else {
//           notification('error', message)
//         }
//       } else {
//         req.props.history.push("/500")
//       }
//     })
//   }
// }

//设置iconBae64
const setIconBase64Action = iconBase64 => ({
  type: types.APP_SET_ICON_BASE64,
  iconBase64
});

//修改应用名称
const onChangeAppNameAction = appName => ({
  type: types.APP_CHANGE_FORM_APP_NAME,
  appName
});

//修改应用访问地址
const onChangeUrlAction = url => ({
  type: types.APP_CHANGE_FORM_URL,
  url
});

//修改应用描述
const onChangeDescribesAction = describes => ({
  type: types.APP_CHANGE_FORM_DESCRIBES,
  describes
});

//修改应用推送URL
const onChangeRedirectUrlAction = redirectUrl => ({
  type: types.APP_CHANGE_FORM_REDIRECTURL,
  redirectUrl
});

//修改上传应用LOGO：
const onChangeIconAction = icon => ({
  type: types.APP_CHANGE_FORM_ICON,
  icon
});

//修改应用类型：
const onChangeAppTypeAction = appType => ({
  type: types.APP_CHANGE_FORM_APPTYPE,
  appType
});

//修改审核模式：
const onChangeAuditModeAction = auditMode => ({
  type: types.APP_CHANGE_FORM_AUDITMODE,
  auditMode
});

//修改登陆认证方式：
const changeLandingModesAction = landingModes => ({
  type: types.APP_CHANGE_FORM_LANDINGMODES,
  landingModes
});

//修改支持CA机构：
const onChangeSupportCAsAction = supportCAs => ({
  type: types.APP_CHANGE_FORM_SUPPORTCAS,
  supportCAs
});

//改变编辑editAppId
const onChangeEditAppIdAction = editAppId => ({
  type: types.APP_CHANGE_FORM_EDIT_APP_ID,
  editAppId
});

const onChangeTagAction = tag => ({
  type: types.APP_CHANGE_FORM_TAG,
  tag
});

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
  onChangeTagAction,
  queryLoginTypeAction,
  queryAllSupportCAsAction,
  queryAllAppTypeAction,
  getAuthLevelAction,
  setIconBase64Action,
  saveAppFormAction,
  showSecretAction,
  queryEditAppAction,
  appAuditAction,
  emptyAddValueAction,
  queryOrgListAction,
  onChangeOrgTreeSelectAction,
  getProductTypeAction,
  changeProductTypeAction,
  changeProductAction,
  queryBillingListAction,
  changeBillingAction,
  queryPreferentialListAction,
  changePreferentialAction,
  saveFormAction
};
