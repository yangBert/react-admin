import React, { Component } from 'react';
import { Table, Spin, Button, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import styles from './css/UserList.module.css';
import Oper from './components/Operation';
import AddModal from './components/AddModal';
import SearchForm from './components/SearchForm';
import $$ from 'static/js/base';
import * as enumerate from 'static/js/enumerate';

const columns = [
  { title: '产品编码', dataIndex: 'productCode', key: 'productCode', align: 'center' },
  { title: '产品名称', dataIndex: 'productName', key: 'productName', align: 'center' },
  { title: '产品描述', dataIndex: 'productDesc', key: 'productDesc', align: 'center' },
  {
    title: '创建时间', dataIndex: 'publishAt', key: 'publishAt', align: 'center',
    render: publishAt => (
      <span>{$$.getHours(publishAt)}</span>
    )
  },
  {
    title: '产品状态', dataIndex: 'status', key: 'status', align: 'center',
    render: status => enumerate.baseState.get(status)
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => <Oper text={text} record={record} />,
  }
];

class ProductList extends Component {
  componentDidMount() {
    //this.props.queryList({ props: this.props, data: { pageNo: 1, pageSize: 10 } })
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
    //this.props.queryDictlist({ props: this.props, data });
    this.props.queryList({ props: this.props, data })
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
          <AddModal />
          <SearchForm />
          <div className={styles.buttonForm}>
            <Button
              type="primary"
              className={styles.addButton}
              onClick={() => this.props.changeAddModalvisible(true, "add", {})}
            ><Icon type="plus" />新增</Button>
          </div>
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
  list: state.product.list,
  pagination: state.product.pagination,
  spinning: state.product.spinning,
  params: state.product.params,
})

const mapDispatch = dispatch => ({
  changeAddModalvisible: (addModalvisible, operationType, record) => {
    const action = creators.changeAddModalvisibleAction(addModalvisible, operationType, record);
    dispatch(action);
  },
  queryList: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },

})

export default withRouter(connect(mapState, mapDispatch)(ProductList));