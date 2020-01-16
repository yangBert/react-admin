import React from 'react';
import { Button, Popconfirm, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import { withRouter } from 'react-router-dom';
import $$ from 'static/js/base';

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
      >修改</Button>&nbsp;&nbsp;
      <Popconfirm
        placement="left"
        title="确定删除吗?"
        onConfirm={() => {
          const userNo = $$.localStorage.get("adminId")
          const data = {
            userNo,
            productCode: props.record.productCode,
            status: "DEL",
          }
          props.deleteRow({ props, data })
        }}
        okText="确定"
        icon={<Icon type="question-circle" />}
        cancelText="取消">
        <Button style={fontSmall} type="danger" size="small" ghost>删除</Button>
      </Popconfirm>&nbsp;&nbsp;
    </div >
  )
}

const mapState = state => ({
  params: state.dictData.params,
  isQuery: state.dictData.isQuery
})

const mapDispatch = dispatch => ({
  changeAddModalvisible: (addModalvisible, operationType, record) => {
    const action = creators.changeAddModalvisibleAction(addModalvisible, operationType, record);
    dispatch(action);
  },
  deleteRow: req => {
    const action = creators.deleteRowAction(req);
    dispatch(action);
  },
})

export default withRouter(connect(mapState, mapDispatch)(Oper));
