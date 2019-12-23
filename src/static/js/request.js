import axios from 'axios';
import qs from 'qs';
import $$ from 'static/js/base';

const error500 = "500，服务器发生错误"

function configFn(url, data, method) {
  const config = {
    url,
    method,
    data,
  }
  const AuthToken = $$.token.get()
  console.log("AuthToken--------------", AuthToken)
  // const urlArr = url.split("/")
  // const bl = urlArr[urlArr.length - 1] === 'selectAdminMenu'
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
    callback(error500)
  })
}

function getJson(requestURL, requestData, callback) {
  const config = configFn(requestURL, requestData, 'get')
  axios(config).then(res => {
    callback(res)
  }).catch(err => {
    console.log(err)
    callback(error500)
  })
}

function jsonArr(requestURL, requestData, callback) {
  axios({
    url: requestURL,
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    data: requestData,
  }).then(res => {
    callback(res)
  }).catch(() => {
    callback(error500)
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
    callback(error500)
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
    callback(error500)
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
    callback(error500)
  })
}

export { json, jsonArr, formString, formData, urlToBlob, getJson }