import React from 'react';
import { Button, Popconfirm, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as creators from '../store/creators';

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "10px" };
  return (
    <div>
      <Link
        to={{
          pathname: "/platSetting/add",
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
      <Popconfirm
        placement="left"
        title="确定删除吗?"
        onConfirm={() => {
          const data = { id: props.record.id }
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
  delete: value => {
    const action = creators.deleteAction(value);
    dispatch(action);
  },
})

export default connect(null, mapDispatch)(Oper);
