import * as types from './actionTypes';
import $fetch from 'static/js/fetch';
import * as requestURL from 'static/js/requestURL';
import loading from 'pages/common/spinning'

const createChangeAddModalvisibleAction = (addModalvisible, operationType, record) => ({
  type: types.CHANGE_ADD_MODAL_VISIBLE,
  addModalvisible,
  operationType,
  record,
})

const initUserList = list => ({
  type: types.QUERY_USER_LIST,
  list
})

const createAddUserAction = requestData => {
  return dispatch => {
    dispatch(loading(true));
    $fetch.axios(requestURL.managerRegistertURL, requestData, res => {
      const {success, message} = res.data.result
      if(success){
        dispatch(loading(false));
        alert(message)
      }else{
        dispatch(loading(false));
      }
    })

  }
}

const getUserList = () => {
  return dispatch => {
    // axios.get('/api/user/userList.json')
    //   .then(function (res) {
    //     // handle success
    //     console.log(res);
    //     if (res.data.list.length > 0) {
    //       const action = initUserList(res.data.list);
    //       dispatch(action);
    //     }

    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
  }
}

export {
  getUserList,
  createChangeAddModalvisibleAction,
  createAddUserAction,
}