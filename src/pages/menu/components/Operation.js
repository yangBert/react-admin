import React from 'react';
import { Button, Popconfirm, Icon, Switch } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';


function Oper(props) {
  const fontSmall = { fontSize: "12px" };

  return (
    <div>

      <Button
        onClick={() => props.changeEditModalvisible(true, props.record)}
        style={fontSmall}
        type="primary"
        size="small"
        ghost
      >修改</Button>&nbsp;&nbsp;
       <Popconfirm
        placement="left"
        title="确定删除吗?"
        onConfirm={() => {
          const requestData = "menuId=" + props.record.menuId
          props.deleteMenu(requestData)
        }}
        okText="确定"
        icon={<Icon type="question-circle" />}
        cancelText="取消">
        <Button style={fontSmall} type="danger" size="small" ghost>删除</Button>
      </Popconfirm>&nbsp;&nbsp;
      {/* <Switch
        checkedChildren="启用"
        unCheckedChildren="禁用"
        defaultChecked={props.record.status === "1" ? true : false}
        onChange={checked => {
          const status = checked ? "1" : "0"
          const requestData = {
            status: status,
            adminId: props.record.adminId
          }
          const params = { ...props.params, pageSize: 10, pageNo: 1 }
          props.changeStatus({ requestData, params })
        }}
      /> */}
    </div >
  )
}

const mapState = state => ({
  params: state.user.params,
  isQuery: state.user.isQuery
})

const mapDispatch = dispatch => ({
  changeEditModalvisible: (visible, record) => {
    const action = creators.changeEditModalvisibleAction(visible, record);
    dispatch(action);
  },
  deleteMenu: req => {
    const action = creators.deleteMenuAction(req);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(Oper);
