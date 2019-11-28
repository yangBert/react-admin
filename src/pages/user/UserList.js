import React, { Component } from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';

import Oper from './components/Oper';
import Add from './components/Add';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
  { title: '手机号', dataIndex: 'phone', key: 'phone' },
  { title: '居民身份证号', dataIndex: 'idcard', key: 'idcard' },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    render: () => <Oper />,
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
        <Add></Add>
        <Table
          columns={columns}
          dataSource={list}
          size="small"
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
        />
      </div >
    )
  }
}

const mapState = state => ({
  list: state.user.list
})

const mapDispatch = dispatch => ({
  queryUserList: () => {
    const action = creators.getUserList();
    dispatch(action);
  }
})
export default connect(mapState, mapDispatch)(UserList);