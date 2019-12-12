import React, { useEffect, useState } from 'react';
import { Modal, Checkbox } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';

function RoleModal(props) {
  const [selectedRoles, setSelectedRoles] = useState([])
  const [roleAllList, setRoleAllList] = useState([])


  const _roleAllList = props.roleAllList
  const _selectedRoles = props.selectedRoles

  useEffect(() => {
    setSelectedRoles(_selectedRoles)
    setRoleAllList(_roleAllList)
  }, [_selectedRoles, _roleAllList]);

  function changeCheckboxGroup(keys) {
    setSelectedRoles(keys)
  }

  function submitBindRole() {
    let arr = []
    for (let i = 0; i < selectedRoles.length; i++) {
      arr.push({
        userId: props.roleAdminId,
        roleId: selectedRoles[i]
      })
    }
    props.bindRole(arr)
  }

  return (
    <Modal
      title="角色配置"
      style={{ top: 20 }}
      width={360}
      bodyStyle={{ height: "300px", overflow: "auto" }}
      visible={props.roleModalVisible}
      confirmLoading={props.ConfirmLoadingRole}
      onOk={() => submitBindRole()}
      onCancel={() => props.changeRoleModalvisible(false)}
    >
      <Checkbox.Group
        options={roleAllList}
        defaultValue={selectedRoles}
        onChange={changeCheckboxGroup}
      />
    </Modal>
  )
}

const mapState = state => ({
  roleAllList: state.admin.roleAllList,
  selectedRoles: state.admin.selectedRoles,
  roleModalVisible: state.admin.roleModalVisible,
  ConfirmLoadingRole: state.admin.ConfirmLoadingRole,
  roleAdminId: state.admin.roleAdminId
})

const mapDispatch = dispatch => ({
  changeRoleModalvisible: roleModalvisible => {
    const action = creators.changeRoleModalVisibleAction(roleModalvisible);
    dispatch(action);
  },
  bindRole: req => {
    const action = creators.bindRoleAction(req);
    dispatch(action);
  },
  queryAllRole: req => {
    const action = creators.queryAllRoleAction(req);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(RoleModal);
