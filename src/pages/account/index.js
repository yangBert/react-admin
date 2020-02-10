import React, { Component } from 'react';
import { Table, Spin, Button, Icon, Tag } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import SearchForm from './components/SearchForm';
import styles from './css/UserList.module.css';
import { Link } from 'react-router-dom';
import $$ from 'static/js/base';
import Oper from './components/Operation';

const columns = [
  { title: '账户编码', dataIndex: 'accountCode', key: 'accountCode', align: 'center' },
  { title: '账户名', dataIndex: 'accountName', key: 'accountName', align: 'center' },
  {
    title: '账户类型', dataIndex: 'accountType', key: 'accountType', align: 'center',
    render: accountType => (
      <span>{accountType === '01' ? '个人账户' : accountType === '02' ? '企业账户' : "未定义"}</span>
    )
  },
  {
    title: '充值总金额（元）', dataIndex: 'totalMoney', key: 'totalMoney', align: 'center',
    render: totalMoney => (
      <span>{totalMoney === null ? "0.00" : Number(totalMoney.toFixed(2))}</span>
    )
  },
  {
    title: '可用余额（元）', dataIndex: 'balanceMoney', key: 'balanceMoney', align: 'center',
    render: balanceMoney => (
      <span>{balanceMoney === null ? "0.00" : balanceMoney.toFixed(2)}</span>
    )
  },
  {
    title: '创建人', dataIndex: 'createdBy', key: 'createdBy', align: 'center'
  },
  {
    title: '账户状态', dataIndex: 'status', key: 'status', align: 'center',
    render: status => <span>{status === "0" ? <Tag color="green">已启用</Tag> : <Tag color="red">已禁用</Tag>}</span>,
  },
  {
    title: '最后更新时间', dataIndex: 'lastUpdatedTime', key: 'lastUpdatedTime', align: 'center',
    render: lastUpdatedTime => (
      <span>{lastUpdatedTime && $$.getHours(lastUpdatedTime)}</span>
    )
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => <Oper text={text} record={record} />,
  },
];

class AccountList extends Component {
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
          <div className={styles.buttonForm}>
            <Link
              to={{
                pathname: "/account/add",
                state: {
                  editOrgList: this.props.editOrgList,
                }
              }}
            >
              <Button
                type="primary"
                className={styles.addButton}
              ><Icon type="plus" />新增</Button>
            </Link>
          </div>
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
  list: state.account.list,
  pagination: state.account.pagination,
  spinning: state.account.spinning,
  params: state.account.params,
  editOrgList: state.account.editOrgList,
})

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(AccountList);