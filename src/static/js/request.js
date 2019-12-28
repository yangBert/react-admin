import axios from 'axios';
import qs from 'qs';
import $$ from 'static/js/base';
import notification from 'pages/common/layer/notification';
const errorMsg = "请求失败"

function authRedirect() {
  $$.token.set("")
  if (window.$GLOBALPROPS) {
    window.$GLOBALPROPS.history.push("/")
  }
  notification("error", errorMsg)
}

function configFn(url, data, method) {
  const config = {
    url,
    method,
    data,
  }
  const AuthToken = $$.token.get()
  if (AuthToken) {
    config.headers = {}
    config.headers.AuthToken = AuthToken
  }
  return config
}

function json(requestURL, requestData, callback) {
  const config = configFn(requestURL, requestData, 'post')
  axios(config).then(res => {
    callback(res)
  }).catch(err => {
    console.log(err)
    authRedirect()
  })
}

function getJson(requestURL, requestData, callback) {
  const config = configFn(requestURL, requestData, 'GET')
  axios(config).then(res => {
    callback(res)
  }).catch(err => {
    console.log(err)
    authRedirect()
  })
}

function jsonArr(requestURL, requestData, callback) {
  let config = {
    url: requestURL,
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    data: requestData,
  }
  const AuthToken = $$.token.get()
  if (AuthToken) {
    config.headers.AuthToken = AuthToken
  }
  axios(config).then(res => {
    callback(res)
  }).catch(() => {
    authRedirect()
  })
}

function formString(requestURL, requestData, callback) {
  axios({
    url: requestURL,
    method: 'post',
    data: qs.stringify(requestData),
  }).then(res => {
    callback(res)
  }).catch(() => {
    authRedirect()
  })
}

function formData(requestURL, requestData, callback) {
  axios({
    url: requestURL,
    method: 'post',
    data: requestData,
    headers: { 'Content-Type': 'multipart/form-data' },
    // transformRequest: [function (data) {
    //   return qs.stringify(data);
    // }],
  }).then(res => {
    callback(res)
  }).catch(() => {
    authRedirect()
  })
}

function urlToBlob(requestURL, callback) {
  axios({
    url: requestURL,
    method: 'get',
    responseType: 'blob'
  }).then(res => {
    callback(res)
  }).catch(() => {
    authRedirect()
  })
}

export { json, jsonArr, formString, formData, urlToBlob, getJson }