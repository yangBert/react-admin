import React, { Component } from 'react';
import { Table, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/UserList.module.css';
// import Oper from './components/Operation';
import $$ from 'static/js/base';
import { Link } from 'react-router-dom';

const columns = [
  { title: '应用编码', dataIndex: 'appCode', key: 'appCode', align: 'center' },
  { title: '产品名称', dataIndex: 'productName', key: 'productName', align: 'center' },
  { title: '计费策略', dataIndex: 'ruleName', key: 'ruleName', align: 'center' },
  { title: '优惠策略', dataIndex: 'perfertialName', key: 'perfertialName', align: 'center' },
  {
    title: '创建时间', dataIndex: 'createAt', key: 'createAt', align: 'center',
    render: createTime => (
      <span>{createTime ? $$.getHours(createTime) : "--"}</span>
    )
  },
  // {
  //   title: '操作',
  //   dataIndex: 'operation',
  //   key: 'operation',
  //   render: (text, record) => <Oper text={text} record={record} />,
  // },
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
    let data = { pageNo, pageSize }
    data.appCode = this.props.location.state.appCode
    this.props.queryRechargeRuleList({ props: this.props, data });
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
        <h2 style={{ fontSize: "17px" }}>收费配置</h2>
        <Link
          to={{
            pathname: "/chargeConfig/add",
            //state: { appCode: props.location.state.appCode }
          }}
        >
          <Button type="primary" ghost>
            <Icon type="plus" />
            新增
            </Button>
        </Link>
        &nbsp;&nbsp;
          <Link
          to={{
            pathname: "/app/appList"
          }}
        >
          <Button type="primary" ghost>
            <Icon type="rollback" />
            返回
            </Button>
        </Link>
        <br />
        <Table
          bordered
          columns={columns}
          dataSource={list}
          rowKey={(record, index) => index}
          size="small"
          pagination={pagination}
          rowClassName={styles.table}
          loading={this.props.rechargeRuleListLoading}
        />
      </div >
    )
  }
}

const mapState = state => ({
  list: state.account.rechargeRuleList,
  pagination: state.account.rechargeRulePagination,
  rechargeRuleListLoading: state.account.rechargeRuleListLoading,
})

const mapDispatch = dispatch => ({
  queryRechargeRuleList: req => {
    const action = creators.queryRechargeRuleListAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(List);