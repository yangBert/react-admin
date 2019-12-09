import React from 'react';
import { Button, Popconfirm, Icon, Switch } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';


function Oper(props) {
  const fontSmall = { fontSize: "12px" };

  return (
    <div>

      <Button
        onClick={() => props.changeAddModalvisible(true, "edit", props.record)}
        style={fontSmall}
        type="primary"
        size="small"
        ghost
      >编辑</Button>&nbsp;&nbsp;
      <Popconfirm
        placement="left"
        title="确定删除吗?"
        onConfirm={() => {
          const data = "roleId=" +props.record.roleId
          props.deleteRole(data)
        }}
        okText="确定"
        icon={<Icon type="question-circle" />}
        cancelText="取消">
        <Button style={fontSmall} type="danger" size="small" ghost>删除</Button>
      </Popconfirm>&nbsp;&nbsp;
      <Switch
        checkedChildren="启用"
        unCheckedChildren="禁用"
        defaultChecked={props.record.status === "1" ? true : false}
        onChange={checked => {
          const status = checked ? "1" : "0"
          const requestData = {
            status: status,
            roleId: props.record.roleId
          }
          const params = { ...props.params}
          props.changeStatus({ requestData, params })
        }}
      />
    </div >
  )
}

const mapState = state => ({
  params: state.user.params,
  isQuery: state.user.isQuery
})

const mapDispatch = dispatch => ({
  changeAddModalvisible: (addModalvisible, operationType, record) => {
    const action = creators.changeAddModalvisibleAction(addModalvisible, operationType, record);
    dispatch(action);
  },
  deleteRole: req => {
    const action = creators.createDeleteRoleAction(req);
    dispatch(action);
  },
  changeStatus: req => {
    const action = creators.createChangeStatusAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(Oper);
