import * as types from './actionTypes';

const defaultState = {
  menus: [],
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case types.INIT_MENUS:
      newState.menus = action.menus
      break;
    default:
      break;
  }
  return newState
}