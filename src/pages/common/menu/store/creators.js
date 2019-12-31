import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import notification from 'pages/common/layer/notification';
import axios from 'axios';

//初始化菜单
const initMenuAction = menus => ({
  type: types.INIT_MENUS,
  menus,
})

//查询死菜单
const getMenus = req => {
  return dispatch => {
    axios.get('/menu.json')
      .then(function (res) {
        // handle success
        if (res.data.menus.length > 0) {

          const action = initMenuAction(res.data.menus);
          dispatch(action);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
}

//查询权限菜单
const queryMenuAction = req => {
  return dispatch => {
    request.getJson(requestURL.powerSelectAdminMenu, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          const action = initMenuAction(data)
          dispatch(action)
        } else {
          notification('error', message)
        }
      } else {
        req.props.history.push("/")
      }
    })
  }
}

export { getMenus, queryMenuAction }