import * as types from './actionTypes';

const defaultState = {
  menus: []
};

export default (state = defaultState, action) => {
  if (action.type === types.INIT_MENUS) {
    const newState = {...state, ...action.menus};
    console.log("newState", newState);
    return newState;
  }
  return state;
}