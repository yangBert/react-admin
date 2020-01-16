import sliderReducer from 'pages/common/menu/store/reducer';
import headReducer from 'pages/common/header/store/reducer';
import adminReducer from 'pages/admin/store/reducer';
import loginReducer from 'pages/login/store/reducer';
import roleReducer from 'pages/role/store/reducer';
import menuReducer from 'pages/menu/store/reducer';
import userReducer from 'pages/user/store/reducer';
import appReducer from 'pages/app/store/reducer';
import dictTypeReducer from 'pages/dictType/store/reducer';
import dictDataReducer from 'pages/dictData/store/reducer';
import noticeReducer from 'pages/notice/store/reducer';
import orgReducer from 'pages/org/store/reducer';
import certReducer from 'pages/cert/store/reducer';
import productReducer from 'pages/product/store/reducer';
import certificationReducer from 'pages/certification/store/reducer';
import docCatalogReducer from 'pages/docCatalog/store/reducer';
import docReducer from 'pages/doc/store/reducer';
import platSettingReducer from 'pages/platSetting/store/reducer';
import billingReducer from 'pages/billing/store/reducer';
import productTypeReducer from 'pages/productType/store/reducer';
import accountReducer from 'pages/account/store/reducer';
import preferentialReducer from 'pages/preferential/store/reducer';
import chargeConsumeReducer from 'pages/chargeConsume/store/reducer';
import chargeRechargeReducer from 'pages/chargeRecharge/store/reducer';

export default {
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
  chargeRecharge: chargeRechargeReducer
};