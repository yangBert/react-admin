import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  pagination: {},
  spinning: false,
  params: {},
  rowAppId: null,
  form: {
    appName: "",
    url: "",
    describes: "",
    redirectUrl: "",
    appType: "",
    auditMode: "",
    landingModes: [],
    supportCAs: [],
    allAuthLevel: [],
    allLandingModes: [],
    allSupportCAs: [],
    allAppTypes: [],
    tag: "",
  },
  iconBase64: "",
  editLoading: false,
  orgList: [],
  editOrgCode: "",
  allProductType: [],
  product: "",
  productList: [],
  billingList: [],
  billing: "",
  billingFetching: false,
  preferentialFetching: false,
  preferentialList: [],
  preferential: "",
  chargeDetail: {
    productTypeCode: "",
    productCode: "",
    preferentialCode: "",
    ruleCode: ""
  }
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.APP_QUERY_APP_LIST:
      newState.list = action.list
      newState.pagination = action.pagination
      break;
    case types.APP_CHANGE_SEARCH_PARAMS:
      newState.params = action.params
      break;
    case types.APP_CHANGE_ROW_APP_ID:
      newState.rowAppId = action.rowAppId
      break;
    case types.APP_INIT_ORG_TREES:
      newState.orgList = action.orgList
      break;
    case types.APP_CHANGE_TREE_ORG_CODE:
      newState.form.orgCode = action.orgCode
      break;

    //修改表单值
    case types.APP_CHANGE_FORM_APP_NAME:
      newState.form.appName = action.appName
      break;
    case types.APP_CHANGE_FORM_URL:
      newState.form.url = action.url
      break;
    case types.APP_CHANGE_FORM_DESCRIBES:
      newState.form.describes = action.describes
      break;
    case types.APP_CHANGE_FORM_REDIRECTURL:
      newState.form.redirectUrl = action.redirectUrl
      break;
    case types.APP_CHANGE_FORM_ICON:
      newState.form.icon = action.icon
      break;
    case types.APP_CHANGE_FORM_APPTYPE:
      newState.form.appType = action.appType
      break;
    case types.APP_CHANGE_FORM_AUDITMODE:
      newState.form.auditMode = action.auditMode
      break;
    case types.APP_CHANGE_FORM_LANDINGMODES:
      newState.form.landingModes = action.landingModes
      break;
    case types.APP_CHANGE_FORM_SUPPORTCAS:
      newState.form.supportCAs = action.supportCAs
      break;
    case types.APP_CHANGE_FORM_TAG:
      newState.form.tag = action.tag
      break;
    case types.APP_INIT_ALL_AUTH_LEVEL:
      newState.form.allAuthLevel = action.allAuthLevel
      break;
    case types.APP_INIT_ALL_LANDING_MODES:
      newState.form.allLandingModes = action.allLandingModes
      break;
    case types.APP_INIT_ALL_APP_TYPES:
      newState.form.allAppTypes = action.allAppTypes
      break;
    case types.APP_INIT_ALL_SUPPORT_CAS:
      newState.form.allSupportCAs = action.allSupportCAs
      break;
    case types.APP_SET_ICON_BASE64:
      newState.iconBase64 = action.iconBase64
      break;
    case types.APP_CHANGE_SAVE_LOADING:
      newState.saveLoading = action.saveLoading
      break;
    case types.APP_CHANGE_FORM_EDIT_APP_ID:
      newState.form.editAppId = action.editAppId
      break;
    case types.APP_CHANGE_ROW_AUDIT_STATUS:
      newState.rowauditStatus = action.rowauditStatus
      break;
    case types.APP_EMPTY_ADD_VALUE:
      newState.form.appName = ""
      newState.form.url = ""
      newState.form.describes = ""
      newState.form.redirectUrl = ""
      newState.form.appType = ""
      newState.form.auditMode = ""
      newState.form.tag = ""
      newState.form.orgCode = ""
      newState.form.landingModes = []
      newState.form.supportCAs = []
      newState.iconBase64 = ""
      break;
    case types.APP_INIT_ALL_PRODUCT_TYPE:
      newState.allProductType = action.allProductType
      break;
    case types.APP_INIT_PRODUCT_LIST:
      newState.productList = action.productList
      break;
    case types.APP_INIT_BILLING_LIST:
      newState.billingList = action.billingList
      break;
    case types.APP_CHANGE_BILLING:
      newState.billing = action.billing
      break;
    case types.APP_CHANGE_BILLING_FETCHING:
      newState.billingFetching = action.billingFetching
      break;
    case types.APP_CHANGE_PREFERENTIAL_FETCHING:
      newState.preferentialFetching = action.preferentialFetching
      break;
    case types.APP_INIT_PREFERENTIAL_LIST:
      newState.preferentialList = action.preferentialList
      break;
    case types.APP_CHANGE_PREFERENTIAL:
      newState.preferential = action.preferential
      break;
    case types.APP_CHANGE_PRODUCT:
      newState.product = action.product
      break;
    default:
      break;
  }
  return newState
}
