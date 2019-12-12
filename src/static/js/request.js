import axios from 'axios';
import qs from 'qs';

const error500 = "500，服务器发生错误"

function json(requestURL, requestData, callback) {
  axios({
    url: requestURL,
    method: 'post',
    data: requestData,
  }).then(res => {
    callback(res)
  }).catch(() => {
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
    transformRequest: [function (data) {
      return qs.stringify(data);
    }],
  }).then(res => {
    callback(res)
  }).catch(() => {
    callback(error500)
  })
}

export { json, jsonArr, formString, formData }