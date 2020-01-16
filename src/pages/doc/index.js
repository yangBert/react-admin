import React, { Component } from 'react';
import { Table, Spin, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import SearchForm from './components/SearchForm';
import styles from './css/UserList.module.css';
import { Link } from 'react-router-dom';
import $$ from 'static/js/base';
import Oper from './components/Operation';
import * as enumerate from 'static/js/enumerate';

const columns = [
  { title: '文档标题', dataIndex: 'title', key: 'title' },
  { title: '创建人', dataIndex: 'createBy', key: 'createBy', align: 'center' },
  { title: '发布人', dataIndex: 'publishBy', key: 'publishBy', align: 'center' },
  {
    title: '创建时间', dataIndex: 'createAt', key: 'createAt', align: 'center',
    render: createAt => (
      <span>{createAt && $$.getHours(createAt)}</span>
    )
  },
  {
    title: '发布时间', dataIndex: 'publishAt', key: 'publishAt', align: 'center',
    render: publishAt => (
      <span>{publishAt && $$.getHours(publishAt)}</span>
    )
  },
  {
    title: '状态', dataIndex: 'status', key: 'status', align: 'center',
    render: status => enumerate.baseState.get(status)
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => <Oper text={text} record={record} />,
  },
];

class DocList extends Component {
  componentDidMount() {
    this.props.queryProductlist({ props: this.props, data: { pageNo: 1, pageSize: 1000 } });
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
                pathname: '/doc/add',
                state: { productAllList: this.props.productAllList }
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
  list: state.doc.list,
  productAllList: state.doc.productAllList,
  pagination: state.doc.pagination,
  spinning: state.doc.spinning,
  params: state.doc.params,
})

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.querylistAction(req);
    dispatch(action);
  },
  queryProductlist: req => {
    const action = creators.queryProductlistAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(DocList);