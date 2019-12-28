import React, { Component } from 'react';
import { Table, Spin, Tag } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import SearchForm from './components/SearchForm';
import styles from './css/UserList.module.css';
import $$ from 'static/js/base';
import Oper from './components/Operation';

const columns = [
  { title: '签名证书序列号', dataIndex: 'certSerNum', key: 'certSerNum' },
  {
    title: '有效开始日期', dataIndex: 'validityBegin', key: 'validityBegin',
    render: validityBegin => (
      <span>{$$.getHours(validityBegin)}</span>
    )
  },
  {
    title: '有效结束日期', dataIndex: 'validityEnd', key: 'validityEnd',
    render: validityEnd => (
      <span>{$$.getHours(validityEnd)}</span>
    )
  },
  {
    title: '状态', dataIndex: 'state', key: 'state',
    render: state => (
      <span>
        {
          state === '1' ?
            <Tag color="green">已启用</Tag> :
            <Tag color="red">已禁用</Tag>
        }
      </span>
    )
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => <Oper text={text} record={record} />,
  },
];

class CertList extends Component {
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
    this.props.queryCertlist({ props: this.props, data });
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
  list: state.cert.list,
  pagination: state.cert.pagination,
  spinning: state.cert.spinning,
  params: state.cert.params,
})

const mapDispatch = dispatch => ({
  queryCertlist: req => {
    const action = creators.createQueryCertlistAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(CertList);