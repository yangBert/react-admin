import axios from 'axios';
import * as types from './actionTypes';

const initMenu = menus => ({
  type: types.INIT_MENUS,
  menus
})

const getMenus = () => {
  return dispatch => {
    axios.get('/menu.json')
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

export { getMenus }