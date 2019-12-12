import * as types from './actionTypes';
const defaultState = {
  list: [],
  operationType: "",
  addModalvisible: false,
  editModalvisible: false,
  editRecord: null,
  spinning: false,
  addConfirmLoading: false,
  editConfirmLoading: false,
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case types.CHANGE_ADD_CONFIRM_LOADING:
      newState.addConfirmLoading = action.addConfirmLoading
      break;
    case types.CHANGE_EDIT_CONFIRM_LOADING:
      newState.editConfirmLoading = action.editConfirmLoading
      break;
    case types.INIT_MENU_LIST:
      newState.list = action.list
      break;
    case types.CHANGE_ADD_MODAL_VISIBLE:
      newState.addModalvisible = action.addModalvisible
      break;
    case types.CHANGE_EDIT_MODAL_VISIBLE:
      newState.editModalvisible = action.editModalvisible
      break;
    case types.CHANGE_EDIT_RECORD:
      newState.editRecord = action.editRecord
      break;
  }
  return newState
}