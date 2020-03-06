import * as types from './actionTypes';
import spinningTypes from 'pages/common/layer/spinning/spinningTypes';

const defaultState = {
  list: [],
  spinning: false,
  saveLoading: false,
  modalVisible: false,
  edit: false,
  record: {},
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case spinningTypes:
      newState.spinning = action.spinning
      break;
    case types.QUERY_LIST:
      newState.list = action.list
      break;
    case types.SAVE_LOADING:
      newState.saveLoading = action.saveLoading
      break;
    case types.CHANGE_MODAL_VISIBLE:
      newState.modalVisible = action.modalVisible
      newState.edit = action.edit
      newState.record = action.record
      break;
    case types.CHANGE_STRATEGY_NAME:
      newState.record.strategyName = action.strategyName
      break;
    case types.CHANGE_STRATEGY_CODE:
      newState.record.strategyCode = action.strategyCode
      break;
    case types.CHANGE_STRATEGY_STATUS:
      newState.record.strategyStatus = action.strategyStatus
      break;
    case types.CHANGE_CONFIRM_LOADING:
      newState.confirmLoading = action.confirmLoading
      break;
    default:
      break;
  }
  return newState
}