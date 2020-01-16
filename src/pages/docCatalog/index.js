import React, { Component } from 'react';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import SearchForm from './components/SearchForm';
import styles from './css/UserList.module.css';
import Oper from './components/Operation';
import $$ from 'static/js/base';

const columns = [

  { title: '分类编码', dataIndex: 'code', key: 'code' },
  { title: '分类名称', dataIndex: 'name', key: 'name', align: 'center' },
  { title: '所属产品', dataIndex: 'productName', key: 'productName', align: 'center' },
  {
    title: '创建日期', dataIndex: 'createAt', key: 'createAt', align: 'center',
    render: createAt => $$.getHours(createAt)
  },
  {
    title: '创建人', dataIndex: 'createBy', key: 'createBy', align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => <Oper text={text} record={record} />,
  },
];

class DocCatalogList extends Component {
  componentDidMount() {
    this.sendFn(1, 10)
    this.props.queryProductList({ props: this.props, data: { pageSize: 10, pageNo: 1 } })
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
          {/* <div className={styles.buttonForm}>
            <Link to="/notice/noticeAdd">
              <Button
                type="primary"
                className={styles.addButton}
              ><Icon type="plus" />新增</Button>
            </Link>
          </div> */}
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
  list: state.docCatalog.list,
  pagination: state.docCatalog.pagination,
  spinning: state.docCatalog.spinning,
  params: state.docCatalog.params,
})

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.querylistAction(req);
    dispatch(action);
  },
  queryProductList: req => {
    const action = creators.queryProductListAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(DocCatalogList);