import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
//import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';

const loginAction = state => ({
  type: types.USER_LOGIN,
  loginState: state
})

const logoutAction = propsGlobal => ({
  type: types.USER_LOGOUT,
  loginState: false,
  propsGlobal: propsGlobal
})

const loginSubmit = requestData => {
  return dispatch => {
    console.log("requestData",requestData)
    request.json(requestURL.managerLoginURL, requestData, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data

        if (success) {
          const action = loginAction(true)
          dispatch(action)
        } else {
          notification('error', message)
        }
      } else {
        notification('error', res)
      }
      console.log("managerLoginURL",res)
    })
  }
}

// const getRandomAction = propsGlobal => ({
//   type: types.USER_LOGOUT,
//   loginState: false,
//   propsGlobal: propsGlobal
// })


//签名
function pkcs1SignData_PIN(dispatch, GZCA, containerName, original, certserial) {
  GZCA.GZCA_Pkcs1SignData_PIN(containerName, original, function (res) {
    console.log("签名结果=", res);
    if (res.success) {
      const signData = res.SignData;
      const datas = { certserial, signData };
      dispatch(loginSubmit(datas));
    } else {
      notification('error', res.msg)
    }
  });
}

const getRandomAction = params => {
  return dispatch => {
    request.json(requestURL.managerBuildRandNumURL, params.certserial, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          pkcs1SignData_PIN(dispatch, params.GZCA, params.ContainerName, data, params.certserial)
        } else {
          notification('error', message)
        }
      } else {
        notification('error', res)
      }
    })
  }
}

export {
  getRandomAction,

  //loginSubmit,
  logoutAction
}