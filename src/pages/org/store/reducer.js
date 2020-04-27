import * as types from './actionTypes';
const defaultState = {
  list: [],
  spinning: false,
  editParentOrgName: "",
  editPid: 100000000,
  editPorgCode: "",
  editOrgName: "",
  editOrgCode: "",
  editOrgDesc: "",
  editId: "",
  treeList: [],
  saveLoading: false,
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case types.ORG_INIT_ORG_LIST:
      newState.list = action.list
      break;
    case types.ORG_SET_ORG_NAME:
      newState.editOrgName = action.editOrgName
      break;
    case types.ORG_SET_ORG_CODE:
      newState.editOrgCode = action.editOrgCode
      break;
    case types.ORG_SET_ORG_DESC:
      newState.editOrgDesc = action.editOrgDesc
      break;
    case types.ORG_INIT_FORM_VALUES:
      if (action.record) {
        newState.editOrgName = action.record.orgName
        newState.editOrgCode = action.record.orgCode
        newState.editOrgDesc = action.record.orgDesc
        newState.editId = action.record.id
        newState.editPid = action.record.pid
        newState.editPorgCode = action.record.porgCode
      } else {
        newState.editOrgName = ""
        newState.editOrgCode = ""
        newState.editOrgDesc = ""
        newState.editId = ""
        newState.editPid = ""
        newState.editPorgCode = ""
      }
      break;
    case types.ORG_INIT_ORG_TREE_DATA:
      newState.treeList = action.treeList
      break;
    case types.ORG_SET_EDIT_TREE_VALUE:
      newState.editPorgCode = action.tree.orgCode
      newState.editPid = action.tree.id
      break;
    case types.ORG_CHANGE_SAVE_LOADING:
      newState.saveLoading = action.saveLoading
      break;
    default:
      break;
  }
  return newState
}