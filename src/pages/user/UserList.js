import React, { Component } from 'react';
import { Table, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import Oper from './components/Operation';
import AddModal from './components/AddModal'

const columns = [
  { title: '管理员名称', dataIndex: 'adminName', key: 'name' },
  { title: '签名证书序列号', dataIndex: 'adminId', key: 'age' },
  { title: '所属部门', dataIndex: 'department', key: 'address' },
  { title: '签名证书', dataIndex: 'signcert', key: 'phone' },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: (text, record) => <Oper text={text} record={record} />,
  },
];

class UserList extends Component {
  componentDidMount() {
    this.props.queryUserList();
  }

  render() {
    const list = this.props.list
    return (
      <div className="pageContentColor">
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <Button type="primary" onClick={() => this.props.changeAddModalvisible(true, "add", {})}>新增</Button>
          <AddModal changeSpinning={this.props.changeSpinning} />
          <Table
            columns={columns}
            dataSource={list}
            size="small"
            expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
          />
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  list: state.user.list,
  spinning: state.user.spinning
})

const mapDispatch = dispatch => ({
  queryUserList: () => {
    const action = creators.getUserList();
    dispatch(action);
  },
  changeAddModalvisible: (addModalvisible, operationType) => {
    const action = creators.createChangeAddModalvisibleAction(addModalvisible, operationType);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(UserList);