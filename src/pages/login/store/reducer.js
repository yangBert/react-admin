import * as types from './actionTypes'
const defaultState = {
  loginLoading: false
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case types.CHANGE_LOGIN_LOADING:
      newState.loginLoading = action.loginLoading
      break;
    default:
      break;
  }
  return newState
}