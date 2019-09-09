import menuReducer from 'pages/common/menu/store/reducer';
import headReducer from 'pages/common/header/store/reducer';
import userReducer from 'pages/user/store/reducer';

export default {
  sideMenu: menuReducer,
  header: headReducer,
  user: userReducer
};