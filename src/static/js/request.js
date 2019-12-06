import axios from 'axios';
import qs from 'qs';

function json(requestURL, requestData, callback) {
  axios({
    url: requestURL,
    method: 'post',
    data: requestData,
  }).then(res => {
    console.log("Jlksdjfklsdf", res)
    callback(res)
  }).catch(error => {
    callback(error)
  })
}

function formString(requestURL, requestData, callback) {
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

export {formString, formData, json, string}