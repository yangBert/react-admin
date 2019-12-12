import axios from 'axios';
import qs from 'qs';

function json(requestURL, requestData, callback) {
  axios({
    url: requestURL,
    method: 'post',
    data: requestData,
  }).then(res => {
    console.log("-==========", res)
    callback(res)
  }).catch(err => {
    console.log("500，服务器发生错误-----------------", err)
    callback("500，服务器发生错误")
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
    callback("500，服务器发生错误")
  })
}

function formString(requestURL, requestData, callback) {
  console.log(qs.stringify(requestData))
  axios({
    url: requestURL,
    method: 'post',
    data: qs.stringify(requestData),
  }).then(res => {
    callback(res)
  }).catch(error => {
    callback(error)
  })
}

function formData(requestURL, requestData, callback) {
  axios({
    url: requestURL,
    method: 'post',
    data: requestData,
    transformRequest: [function (data) {
      return qs.stringify(data);
    }],
  }).then(res => {
    callback(res)
  }).catch(error => {
    callback(error)
  })
}

function string(requestURL, requestData, callback) {
  axios({
    url: requestURL,
    method: 'post',
    data: requestData,
  }).then(res => {
    callback(res)
  }).catch(error => {
    callback(error)
  })
}

export { formString, formData, json, jsonArr, string }