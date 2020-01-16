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
  { title: '编码', dataIndex: 'strategyCode', key: 'strategyCode', align: 'center' },
  { title: '优惠策略', dataIndex: 'strategyName', key: 'strategyName', align: 'center' },
  {
    title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', align: 'center',
    render: createdAt => (
      <span>{createdAt && $$.getHours(createdAt)}</span>
    )
  },
  {
    title: '创建人', dataIndex: 'createdBy', key: 'createdBy', align: 'center'
  },
  {
    title: '状态', dataIndex: 'status', key: 'status', align: 'center',
    render: status => <span>{status === "0" ? <Tag color="green">已启用</Tag> : <Tag color="red">已禁用</Tag>}</span>,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => <Oper text={text} record={record} />,
  },
];

class PreferentialList extends Component {
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
            <Link to="/preferential/add">
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
  list: state.preferential.list,
  pagination: state.preferential.pagination,
  spinning: state.preferential.spinning,
  params: state.preferential.params,
})

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(PreferentialList);