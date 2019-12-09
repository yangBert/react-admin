import React, { useState, useEffect } from 'react';
import { Modal, Input, Form } from 'antd';
import styles from 'pages/user/css/add.module.css';
import { connect } from 'react-redux';
import * as creators from '../store/creators';

function AddModal(props) {
  const [addModalvisible, setAddModalvisible] = useState(false)
  const [roleName, setRoleName] = useState("")
  const [roleId, setRoleId] = useState("")

  const [refRoleName, setRefRoleName] = useState(null)

  const $operationType = props.operationType
  const $addModalvisible = props.addModalvisible
  const $roleName = $operationType === "edit" ? props.record.roleName : ""
  const $roleId = $operationType === "edit" ? props.record.roleId : ""

  useEffect(() => {
    setAddModalvisible($addModalvisible)
    setRoleName($roleName);
    setRoleId($roleId);
  }, [$addModalvisible, $operationType, $roleName, $roleId]);


  //新增管理员提交数据
  function collectData() {
    if (roleName === "") {
      refRoleName.focus()
      return;
    }
    props.addRole({
      roleName,
      roleId
    }, $operationType === "edit")
  }

  return (
    <div className={styles.tableForm}>

      <Modal
        title={$operationType === "edit" ? "编辑角色名称" : "新增角色"}
        width={600}
        style={{ top: 20 }}
        visible={addModalvisible}
        cancelText="取消"
        okText="确定"
        onOk={() => collectData()}
        onCancel={() => props.changeAddModalvisible(false, "", {})}
      >
        <Form>

          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">角色名称：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                ref={input => setRefRoleName(input)}
                onChange={e => setRoleName(e.target.value)}
                value={roleName} />
            </div>
          </div>
        </Form>
      </Modal>
    </div >
  )
}

const mapState = state => ({
  addModalvisible: state.role.addModalvisible,
  operationType: state.role.operationType,
  record: state.role.record,
  spinning: state.role.spinning
})

const mapDispatch = dispatch => ({
  changeAddModalvisible: (addModalvisible, operationType, record) => {
    const action = creators.changeAddModalvisibleAction(addModalvisible, operationType, record);
    dispatch(action);
  },
  addRole: (requestData, type) => {
    const action = creators.createAddRoleAction(requestData, type);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(AddModal);
