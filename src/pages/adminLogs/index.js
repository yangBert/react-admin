import React, { Component } from 'react';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import styles from './css/UserList.module.css';
import SearchForm from './components/SearchForm';
import $$ from 'static/js/base';
import Oper from './components/Operation';
import * as config from './config';

const columns = [
  { title: '操作人', dataIndex: 'adminId', key: 'adminId', align: 'center' },
  { title: '操作编码', dataIndex: 'operateType', key: 'operateType', align: 'center' },
  {
    title: '操作描述', dataIndex: 'method', key: 'method', align: 'center',
    render: method => <span>{config.method[method] ? config.method[method] : "--"}</span>,
  },
  {
    title: '操作时间', dataIndex: 'logTime', key: 'logTime', align: 'center',
    render: logTime => (
      <span>{logTime && $$.getHours(logTime)}</span>
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
            pagination={pagination}
            rowClassName={styles.table}
            size="small"
          />
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  list: state.adminLogs.list,
  pagination: state.adminLogs.pagination,
  spinning: state.adminLogs.spinning,
  params: state.adminLogs.params,
})

const mapDispatch = dispatch => ({
  queryList: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(List);