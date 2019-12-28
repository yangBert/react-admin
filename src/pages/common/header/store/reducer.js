import * as types from './actionTypes'
const defaultState = {
  collapsed: false,
  adminInfo: null
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case types.CHANGE_MENU_COLLAPSED:
      newState.collapsed = !newState.collapsed
      break;
    case types.INIT_ADMIN_INFO:
      newState.adminInfo = action.adminInfo
      break;
    default:
      break;
  }
  return newState
}