import axios from 'axios';
import * as types from './actionTypes';

const initUserList = list => ({
  type: types.QUERY_USER_LIST,
  list
})

const getUserList = () => {
  return dispatch => {
    axios.get('/api/user/userList.json')
      .then(function (res) {
        // handle success
        console.log(res);
        if (res.data.list.length > 0) {
          const action = initUserList(res.data.list);
          dispatch(action);
        }

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
}

export { getUserList }