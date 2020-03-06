import React, { Component } from 'react';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import styles from './css/UserList.module.css';
import $$ from 'static/js/base';
import Oper from './components/Operation';
import SearchForm from './components/SearchForm'

const columns = [
  { title: '操作人', dataIndex: 'user', key: 'user' },
  { title: '操作描述', dataIndex: 'methodName', key: 'methodName' },
  {
    title: '创建时间', dataIndex: 'methodTime', key: 'methodTime',
    render: methodTime => (
      <span>{methodTime && $$.getHours(methodTime)}</span>
    )
  },
  {
    title: '', dataIndex: 'operation', key: 'operation',
    render: (text, record) => <Oper text={text} record={record} />,
  },
];

class List extends Component {
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
    //const params = this.props.params
    const data = { pageNo, pageSize }
    this.props.queryList({ props: this.props, data });
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
            rowClassName={styles.table}
          />
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  list: state.verifyServer.list,
  pagination: state.verifyServer.pagination,
  spinning: state.verifyServer.spinning,
  params: state.verifyServer.params,
})

const mapDispatch = dispatch => ({
  queryList: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(List);