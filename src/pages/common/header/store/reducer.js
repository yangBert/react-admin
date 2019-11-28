import * as types from './actionTypes'
const defaultState = {
  loginUser: "yang",
  collapsed: false,
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  if (action.type === types.CHANGE_MENU_COLLAPSED) {
    console.log({ collapsed: !newState.collapsed });
    return { collapsed: !newState.collapsed }
  }
  return newState;
}