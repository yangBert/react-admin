import * as types from './actionTypes';
const defaultState = {
  list: [],
  operationType: "",
  addModalvisible: false,
  editModalvisible:false,
  editRecord: {},
  spinning: false,
  addConfirmLoading: false,
  editConfirmLoading: false,
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  if (action.type === types.CHANGE_ADD_CONFIRM_LOADING) {
    return { ...newState, addConfirmLoading: action.addConfirmLoading }
  } else if (action.type === types.CHANGE_EDIT_CONFIRM_LOADING) {
    return { ...newState, editConfirmLoading: action.editConfirmLoading }
  } else if (action.type === types.INIT_MENU_LIST) {
    return { ...newState, list: action.list, pagination: action.pagination }
  } else if (action.type === types.CHANGE_ADD_MODAL_VISIBLE) {
    return { ...newState, addModalvisible: action.addModalvisible }
  } else if (action.type === types.CHANGE_EDIT_MODAL_VISIBLE) {
    return { ...newState, editRecord: action.editRecord, editModalvisible: action.editModalvisible }
  }
  return state
}