//import sliderMenuReducer from 'pages/common/menu/store/reducer';

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


export default {
  login: loginReducer,
  //sideMenu: sliderMenuReducer,
  slider: sliderReducer,
  header: headReducer,
  admin: adminReducer,
  role: roleReducer,
  menu: menuReducer,
  user: userReducer,
  app: appReducer,
  dictType: dictTypeReducer,
  dictData: dictDataReducer,
};