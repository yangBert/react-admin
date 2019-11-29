import * as types from './actionTypes'
import * as logoutTypes from 'pages/common/header/store/actionTypes'
import $$ from 'static/js/base.js';

const defaultState = {
  loginState: false
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  if (action.type === types.USER_LOGIN) {
    return { ...newState, loginState: action.loginState }
  }else if(action.type === logoutTypes.USER_LOGOUT) {
    $$.logout(action.propsGlobal)
    return { ...newState, loginState: action.loginState }
  }
  return state
}