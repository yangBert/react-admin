import axios from 'axios';
import qs from 'qs';
export default {
  axios: (requestURL, requestData, callback) => {
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
}