import axios from 'axios';
import * as types from './actionTypes';

const initData = list => ({
  type: types.QUERY_USER_LIST,
  list
})

const getData = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.get(requestURL.managerOApiSelectAllParamByApiId, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data;
        if (success) {
          const action = initData(data);
          dispatch(action);
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

export { getData }