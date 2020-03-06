import React from 'react';
import { Button, Popconfirm, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import { withRouter, Link } from 'react-router-dom';

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "5px" };
  return (
    <div>
      <Link
        to={{
          pathname: "/tokenRole/add",
          state: { editRecord: props.record }
        }}
      >
        <Button
          style={fontSmall}
          type="primary"
          size="small"
          ghost
        >修改</Button>
      </Link>
      <Link
        to={{
          pathname: "/tokenRole/config",
          state: { record: props.record }
        }}
      >
        <Button
          style={fontSmall}
          type="primary"
          size="small"
          ghost
        >配置</Button>
      </Link>
      <Button
        style={fontSmall}
        type="primary"
        size="small"
        ghost
        onClick={() => {
          const data = "roleName=" + props.record.name
          props.updatePower({ props, data })
        }}
      >立即更新权限</Button>
      <Popconfirm
        placement="left"
        title="确定删除吗?"
        onConfirm={() => {
          const data = "id=" + props.record.id
          props.delete({ props, data })
        }}
        okText="确定"
        icon={<Icon type="question-circle" />}
        cancelText="取消">
        <Button style={fontSmall} type="danger" size="small" ghost>删除</Button>
      </Popconfirm>

    </div >
  )
}

const mapDispatch = dispatch => ({
  delete: req => {
    const action = creators.deleteAction(req);
    dispatch(action);
  },
  updatePower: req => {
    const action = creators.updatePowerAction(req);
    dispatch(action);
  },
})

export default withRouter(connect(null, mapDispatch)(Oper));
