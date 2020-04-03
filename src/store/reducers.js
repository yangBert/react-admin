import sliderReducer from "pages/common/menu/store/reducer";
import headReducer from "pages/common/header/store/reducer";
import adminReducer from "pages/admin/store/reducer";
import loginReducer from "pages/login/store/reducer";
import roleReducer from "pages/role/store/reducer";
import menuReducer from "pages/menu/store/reducer";
import userReducer from "pages/user/store/reducer";
import appReducer from "pages/app/store/reducer";
import dictTypeReducer from "pages/dictType/store/reducer";
import dictDataReducer from "pages/dictData/store/reducer";
import noticeReducer from "pages/notice/store/reducer";
import orgReducer from "pages/org/store/reducer";
import certReducer from "pages/cert/store/reducer";
import productReducer from "pages/product/store/reducer";
import certificationReducer from "pages/certification/store/reducer";
import docCatalogReducer from "pages/docCatalog/store/reducer";
import docReducer from "pages/doc/store/reducer";
import platSettingReducer from "pages/platSetting/store/reducer";
import billingReducer from "pages/billing/store/reducer";
import productTypeReducer from "pages/productType/store/reducer";
import accountReducer from "pages/account/store/reducer";
import preferentialReducer from "pages/preferential/store/reducer";
import chargeConsumeReducer from "pages/chargeConsume/store/reducer";
import chargeRechargeReducer from "pages/chargeRecharge/store/reducer";
import applyOrderReducer from "pages/applyOrder/store/reducer";
import linkReducer from "pages/link/store/reducer";
import questionReducer from "pages/question/store/reducer";
import clientUserReducer from "pages/clientUser/store/reducer";
import tokenPowerReducer from "pages/tokenPower/store/reducer";
import tokenRoleReducer from "pages/tokenRole/store/reducer";
import chargeConfigReducer from "pages/chargeConfig/store/reducer";
import adminLogsReducer from "pages/adminLogs/store/reducer";
import safeStrategyReducer from "pages/safeStrategy/store/reducer";
import verifyServerReducer from "pages/verifyServer/store/reducer";
import oApiTypesReducer from "pages/oApiTypes/store/reducer";
import oApiReducer from "pages/oApi/store/reducer";
import oApiParamsReducer from "pages/oApiParams/store/reducer";
import userLogsReducer from "pages/userLogs/store/reducer";
import appLogsReducer from "pages/appLogs/store/reducer";
import userOrgReducer from "pages/userOrg/store/reducer";
import rechargeRuleListReducer from "pages/rechargeRuleList/store/reducer";

export default {
  appLogs: appLogsReducer,
  userLogs: userLogsReducer,
  login: loginReducer,
  slider: sliderReducer,
  header: headReducer,
  admin: adminReducer,
  role: roleReducer,
  menu: menuReducer,
  user: userReducer,
  app: appReducer,
  dictType: dictTypeReducer,
  dictData: dictDataReducer,
  notice: noticeReducer,
  org: orgReducer,
  cert: certReducer,
  product: productReducer,
  certification: certificationReducer,
  docCatalog: docCatalogReducer,
  doc: docReducer,
  platSetting: platSettingReducer,
  billing: billingReducer,
  productType: productTypeReducer,
  account: accountReducer,
  preferential: preferentialReducer,
  chargeConsume: chargeConsumeReducer,
  chargeRecharge: chargeRechargeReducer,
  applyOrder: applyOrderReducer,
  link: linkReducer,
  question: questionReducer,
  clientUser: clientUserReducer,
  tokenPower: tokenPowerReducer,
  tokenRole: tokenRoleReducer,
  chargeConfig: chargeConfigReducer,
  adminLogs: adminLogsReducer,
  verifyServer: verifyServerReducer,
  safeStrategy: safeStrategyReducer,
  oApiTypes: oApiTypesReducer,
  oApi: oApiReducer,
  oApiParams: oApiParamsReducer,
  userOrg: userOrgReducer,
  rechargeRuleList: rechargeRuleListReducer,
};
