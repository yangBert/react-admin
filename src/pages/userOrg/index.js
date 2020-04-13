import React, { Component } from 'react';
import { Table, Spin, Tag } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import SearchForm from './components/SearchForm';
import styles from './css/UserList.module.css';
import Oper from './components/Operation';
import $$ from 'static/js/base';

const columns = [
  { title: '机构名称', dataIndex: 'orgName', key: 'orgName', align: 'center' },
  { title: '统一社会信用代码', dataIndex: 'orgCode', key: 'orgCode', align: 'center' },
  // {
  //   title: '审核通过时间', dataIndex: 'applyTime', key: 'applyTime', align: 'center',
  //   render: applyTime => (
  //     <span>{applyTime ? $$.getHours(applyTime) : "--"}</span>
  //   )
  // },
  { title: '申请人', dataIndex: 'userName', key: 'userName', align: 'center' },
  {
    title: '状态', dataIndex: 'state', key: 'state', align: 'center',
    render: state => <span>
      {state === '0' ? <Tag color="purple">待审核</Tag> : state === '1' ? <Tag color="green">审核通过</Tag> : <Tag color="magenta">审核未通过</Tag>}
    </span>,
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
          {/* <SearchForm /> */}
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
  list: state.userOrg.list,
  pagination: state.userOrg.pagination,
  spinning: state.userOrg.spinning,
  params: state.userOrg.params,
})

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(List);