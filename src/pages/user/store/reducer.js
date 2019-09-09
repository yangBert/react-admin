import * as types from './actionTypes'

const defaultState = {
  list: []
};

export default (state = defaultState, action) => {
  if (action.type === types.QUERY_USER_LIST) {
    return { ...state, ...action.list }
  }
  return state
}