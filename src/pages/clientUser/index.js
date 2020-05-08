import React, { Component } from 'react';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import SearchForm from './components/SearchForm';
import styles from './css/UserList.module.css';
import * as config from './config';
import Oper from './components/Operation';
import ModalModify from './components/ModalModify';

const columns = [
  { title: '账号', dataIndex: 'userName', key: 'userName', align: 'center' },
  { title: '真实姓名', dataIndex: 'userRealname', key: 'userRealname', align: 'center' },
  { title: '性别', dataIndex: 'sex', key: 'sex', align: 'center' },
  { title: '电话号码', dataIndex: 'phoneNo', key: 'phoneNo', align: 'center' },
  { title: '居民身份证', dataIndex: 'idCard', key: 'idCard', align: 'center' },

  {
    title: '状态', dataIndex: 'status', key: 'status', align: 'center',
    render: status => <span>{config.status[status] ? config.status[status] : "--"}</span>,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
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
    this.props.querylist({ props: this.props, data });
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
          <ModalModify />
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
  list: state.clientUser.list,
  pagination: state.clientUser.pagination,
  spinning: state.clientUser.spinning,
  params: state.clientUser.params,
})

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(List);