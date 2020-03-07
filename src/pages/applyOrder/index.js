import React, { Component } from 'react';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import SearchForm from './components/SearchForm';
import styles from './css/UserList.module.css';
import $$ from 'static/js/base';
import Oper from './components/Operation';
import * as config from './config';

const columns = [
  { title: '受理单号', dataIndex: 'instanceCode', key: 'instanceCode', align: 'center' },
  {
    title: '订单类型', dataIndex: 'instanceType', key: 'instanceType', align: 'center',
    render: instanceType => <span>{config.instanceType[instanceType] ? config.instanceType[instanceType] : "--"}</span>,
  },
  { title: '申请单名称', dataIndex: 'name', key: 'name', align: 'center' },


  {
    title: '创建时间', dataIndex: 'createTime', key: 'createTime', align: 'center',
    render: createTime => (
      <span>{createTime && $$.getHours(createTime)}</span>
    )
  },
  {
    title: '收费编码', dataIndex: 'paySum', key: 'paySum', align: 'center',
    render: paySum => (
      <span>{paySum}</span>
    )
  },
  {
    title: '当前状态', dataIndex: 'status', key: 'status', align: 'center',
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
  list: state.applyOrder.list,
  pagination: state.applyOrder.pagination,
  spinning: state.applyOrder.spinning,
  params: state.applyOrder.params,
})

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(List);