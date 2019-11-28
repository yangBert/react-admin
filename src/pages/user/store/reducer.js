import * as types from './actionTypes'

const defaultState = {
  list: []
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  if (action.type === types.QUERY_USER_LIST) {
    return { ...newState, ...action }
  }
  return state
}