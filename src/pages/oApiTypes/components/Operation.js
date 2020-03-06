import React from 'react';
import { Button, Popconfirm, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import { withRouter } from 'react-router-dom';

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "5px" };
  return (
    <div>
      <Button
        style={fontSmall}
        type="primary"
        size="small"
        ghost
        onClick={() => props.changeModalVisible(true, true, props.record)}
      >修改</Button>&nbsp;
      <Popconfirm
        placement="left"
        title="确定删除吗?"
        onConfirm={() => {
          const data = { strategyCode: props.record.strategyCode }
          props.del({ props, data })
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
  changeModalVisible: (modalVisible, edit, record) => {
    const action = creators.changeModalVisibleAction(modalVisible, edit, record);
    dispatch(action);
  },
  del: (id) => {
    const action = creators.delAction(id);
    dispatch(action);
  },
})

export default withRouter(connect(null, mapDispatch)(Oper));
