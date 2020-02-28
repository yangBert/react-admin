import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import $$ from 'static/js/base.js';

const logoutAction = () => ({
  type: types.USER_LOGOUT,
  loginState: false
})

//初始化当前登录管理员信息
const initAdminInfoAction = adminInfo => ({
  type: types.INIT_ADMIN_INFO,
  adminInfo
})

//查询管理员信息
const getAdminInfoAction = req => {
  return (dispatch) => {
    request.getJson(requestURL.managerSelectLoginAdminInfo, {}, res => {
      console.log("res",res)
      if (res.data) {
        const { success, data } = res.data && res.data
        if (success) {
          dispatch(initAdminInfoAction(data))
          $$.localStorage.set("adminId", data.adminId)
          $$.localStorage.set("adminName", data.adminName)
          $$.localStorage.set("signcert", data.signcert)
        } else {
          $$.logout(req.propsGlobal)
        }
      } else {
        $$.logout(req.propsGlobal)
      }
    })
  }
}

export { logoutAction, getAdminInfoAction }