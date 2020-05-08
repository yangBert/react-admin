import React, { Component } from 'react';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import SearchForm from './components/SearchForm';
import styles from './css/UserList.module.css';
import Oper from './components/Operation';
import $$ from 'static/js/base';

const columns = [
  { title: '产品名称', dataIndex: 'productName', key: 'productName', align: 'center' },
  { title: '计费策略', dataIndex: 'ruleName', key: 'ruleName', align: 'center' },
  { title: '优惠策略', dataIndex: 'perfertialName', key: 'perfertialName', align: 'center' },
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
    this.props.setAppCode(this.props.location.state.appCode)
  }

  paginationChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  paginationShowSizeChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  sendFn(pageNo, pageSize) {
    let data = { pageNo, pageSize }
    data.appCode = this.props.location.state.appCode
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
          <SearchForm appCode={this.props.location.state.appCode} />
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
  list: state.chargeConfig.list,
  pagination: state.chargeConfig.pagination,
  spinning: state.chargeConfig.spinning,
  params: state.chargeConfig.params,
})

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  setAppCode: req => {
    const action = creators.setAppCodeAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(List);