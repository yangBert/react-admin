import React from 'react';
import {withRouter} from 'react-router-dom';
import { Button, Switch, Popconfirm, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';


function Oper(props) {
  const fontSmall = { fontSize: "12px" };
  return (
    <div>
      <Button
        onClick={() => props.changeEdit(props.record)}
        style={fontSmall}
        type="primary"
        size="small"
        ghost
      >修改</Button>&nbsp;&nbsp;
      <Popconfirm
        placement="left"
        title="确定删除吗?"
        onConfirm={() => {
          const data = "menuId=" + props.record.menuId
          props.deleteMenu({ props, data })
        }}
        okText="确定"
        icon={<Icon type="question-circle" />}
        cancelText="取消">
        <Button style={fontSmall} type="danger" size="small" ghost>删除</Button>
      </Popconfirm>&nbsp;&nbsp;
      <Switch
        checkedChildren="启用"
        unCheckedChildren="禁用"
        defaultChecked={props.record.menuStatue === 1 ? true : false}
        onChange={checked => {
          const status = checked ? 1 : 0
          const data = {
            menuStatue: status,
            menuId: props.record.menuId
          }
          props.updateMenu({ props, data })
        }}
      />
    </div >
  )
}

const mapState = state => ({
  params: state.admin.params,
  isQuery: state.admin.isQuery
})

const mapDispatch = dispatch => ({
  changeEdit: record => {
    const action = creators.changeEditAction(record);
    dispatch(action);
  },
  deleteMenu: req => {
    const action = creators.deleteMenuAction(req);
    dispatch(action);
  },
  updateMenu: req => {
    const action = creators.editMenuAction(req);
    dispatch(action);
  }
})

export default withRouter(connect(mapState, mapDispatch)(Oper));
