import * as types from './actionTypes';
import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
//import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import $$ from 'static/js/base.js';


const loginSubmit = req => {
  return dispatch => {
    console.log("req=>",req.data.signData);
    request.json(requestURL.managerLoginURL, req.data, res => {
      dispatch(changeLoginLoading(false))
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          $$.token.set(data)
          req.props.history.push("/home")
        } else {
          notification('error', message)
        }
      } else {
        notification('error', res)
      }
    })
  }
}

//签名
function pkcs1SignData_PIN(props, dispatch, GZCA, containerName, original, certserial) {
  GZCA.GZCA_Pkcs1SignData_PIN(containerName, original, function (res) {
    console.log(res)
    if (res.success) {
      const signData = res.SignData;
      const data = { certserial, signData };
      dispatch(loginSubmit({ data, props }));
    } else {
      dispatch(changeLoginLoading(false))
      notification('error', res.msg)
    }
  });
}

//改变编辑弹出层提交按钮loading状态
const changeLoginLoading = loginLoading => ({
  type: types.CHANGE_LOGIN_LOADING,
  loginLoading,
})

//获取随机数原文
const getRandomAction = params => {
  return dispatch => {
    dispatch(changeLoginLoading(true))
    console.log("certserial=", "certserial=" + params.certserial)
    request.json(requestURL.managerBuildRandNumURL, "certserial=" + params.certserial, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data
        if (success) {
          pkcs1SignData_PIN(params.props, dispatch, params.GZCA, params.ContainerName, data, params.certserial)
        } else {
          notification('error', message)
          dispatch(changeLoginLoading(false))
        }
      } else {
        notification('error', res)
        dispatch(changeLoginLoading(false))
      }
    })
  }
}

export {
  getRandomAction,
  changeLoginLoading,
}