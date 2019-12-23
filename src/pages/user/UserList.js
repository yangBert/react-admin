import React, { Component } from 'react';
import { Table, Spin, Tag } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import SearchForm from './components/SearchForm';
import $$ from 'static/js/base';
import styles from './css/UserList.module.css';

// createTime: "2019-12-11T12:15:02.000+0000"
// id: 26
// idCard: "MTIzMTM="
// idCardHash: "633928E344711BDAEB1834B078B0089B6D4D671F767101ECB840BBB52FFC03C1"
// lastUpdateTime: "2019-12-11T12:15:02.000+0000"
// name: null
// password: null
// realName: "dasdasdas"
// sourceId: 0
// state: "1"

const columns = [
  { title: '用户名称', dataIndex: 'realName', key: 'realName' },
  { title: '身份证号', dataIndex: 'idCard', key: 'idCard' },
  {
    title: '注册时间', dataIndex: 'createTime', key: 'createTime',
    render: createTime => (
      <span>{$$.getHours(createTime)}</span>
    )
  },
  {
    title: '最后登录时间', dataIndex: 'lastUpdateTime', key: 'lastUpdateTime',
    render: lastUpdateTime => (
      <span>{$$.getHours(lastUpdateTime)}</span>
    )
  },
  {
    title: '状态', dataIndex: 'state', key: 'state',
    render: state => <span>{state === "1" ? <Tag color="green">已启用</Tag> : <Tag color="red">已禁用</Tag>}</span>,
  }
];

class UserList extends Component {
  componentDidMount() {
    this.sendFn(1, 10)
  }

  paginationChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  paginationShowSizeChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  sendFn(pageNo, pageSize) {
    const data = { pageNo, pageSize }
    this.props.queryUserList({ props: this.props, data });
  }

  render() {
    const list = this.props.list
    const pagination = {
      ...this.props.pagination,
      onChange: this.paginationChange,
      onShowSizeChange: this.paginationShowSizeChange,
    }

    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <SearchForm />
          <Table
            bordered
            columns={columns}
            dataSource={list}
            rowKey={(record, index) => index}
            size="small"
            pagination={pagination}
          />
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  list: state.user.list,
  pagination: state.user.pagination,
  spinning: state.user.spinning
})

const mapDispatch = dispatch => ({
  queryUserList: req => {
    const action = creators.createQueryUserAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(UserList);