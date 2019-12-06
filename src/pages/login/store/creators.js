import axios from 'axios';
import * as types from './actionTypes';

const loginAction = state => ({
  type: types.USER_LOGIN,
  loginState: state
})

const logoutAction = propsGlobal => ({
  type: types.USER_LOGOUT,
  loginState: false,
  propsGlobal: propsGlobal
})

const loginSubmit = data => {
  return dispatch => {
    axios.get('/login.json', data)
      .then(function (res) {
        // handle success
        console.log(res);
        if (res.data.success) {
          const action = loginAction(res.data.success);
          dispatch(action);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
}

export { loginSubmit, logoutAction }