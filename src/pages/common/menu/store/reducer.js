import * as types from './actionTypes';

const defaultState = {
  menus: []
};

export default (state = defaultState, action) => {
  if (action.type === types.INIT_MENUS) {
    const newState = {...state, ...action.menus};
    return newState;
  }
  return state;
}