import React, { useState } from 'react';
import { Button, Popconfirm, Icon, Switch } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';


function Oper(props) {
  const fontSmall = { fontSize: "12px" };
  const [switchLoading, setSwitchLoading] = useState(false)
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
        onConfirm={() => props.deleteUser(props.record.adminId)}
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
          props.changeStatus({ status: status, adminId: props.record.adminId })
        }}
      />
    </div >
  )
}

const mapDispatch = dispatch => ({
  changeAddModalvisible: (addModalvisible, operationType, record) => {
    console.log("record", record)
    const action = creators.changeAddModalvisibleAction(addModalvisible, operationType, record);
    dispatch(action);
  },
  deleteUser: adminId => {
    const requestData = "adminId=" + adminId
    const action = creators.createDeleteUserAction(requestData);
    dispatch(action);
  },
  changeStatus: requestData => {
    const action = creators.createChangeStatusAction(requestData);
    dispatch(action);
  },
})

export default connect(null, mapDispatch)(Oper);
