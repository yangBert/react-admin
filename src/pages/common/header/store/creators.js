import * as types from './actionTypes';

const logoutAction = () => ({
  type: types.USER_LOGOUT,
  loginState: false
})

export { logoutAction }