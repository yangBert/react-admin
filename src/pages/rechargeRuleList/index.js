import React, { Component } from 'react';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import SearchForm from './components/SearchForm';
import styles from './css/UserList.module.css';
import Oper from './components/Operation';
import $$ from 'static/js/base';

const columns = [
  { title: '账户', dataIndex: 'accountCode', key: 'accountCode', align: 'center' },
  { title: '产品名称', dataIndex: 'productCode', key: 'productCode', align: 'center' },
  { title: '计费策略', dataIndex: 'rechargeId', key: 'rechargeId', align: 'center' },
  { title: '优惠策略', dataIndex: 'preferentialId', key: 'preferentialId', align: 'center' },
  {
    title: '创建时间', dataIndex: 'createAt', key: 'createAt', align: 'center',
    render: createTime => (
      <span>{createTime ? $$.getHours(createTime) : "--"}</span>
    )
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
    let data = { pageNo, pageSize }
    data.accountCode = this.props.location.state.accountCode
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
          <h2 style={{ fontSize: "17px" }}>收费配置</h2>
          <br />
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
  list: state.rechargeRuleList.rechargeRuleList,
  pagination: state.rechargeRuleList.pagination,
  spinning: state.rechargeRuleList.spinning,
  params: state.rechargeRuleList.params,
})

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(List);