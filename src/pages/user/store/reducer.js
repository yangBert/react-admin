import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  operationType: "",
  addModalvisible: false,
  record: {},
  spinning: false,
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  if (action.type === spinningTypes) {
    return { ...newState, spinning: action.spinning }
  }else if (action.type === types.QUERY_USER_LIST) {
    return { ...newState, list: action.list }
  }else if(action.type === types.CHANGE_ADD_MODAL_VISIBLE){
    return { ...newState, operationType: action.operationType, addModalvisible:action.addModalvisible, record: action.record }
  }
  return state
}