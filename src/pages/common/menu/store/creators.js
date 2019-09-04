import axios from 'axios';
import * as types from './actionTypes';

const initMenu = menus => ({
  type: types.INIT_MENUS,
  menus
})

export const getMenus = () => {
  return dispatch => {
    axios.get('/api/user/index.json')
      .then(function (res) {
        // handle success
        if (res.data.menus.length > 0) {
          const action = initMenu(res.data);
          dispatch(action);
        }
        console.log(res);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
};