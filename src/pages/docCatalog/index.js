import React, { Component } from 'react';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import SearchForm from './components/SearchForm';
import styles from './css/UserList.module.css';
import Oper from './components/Operation';
import * as enumerate from 'static/js/enumerate';

const columns = [
  { title: '认证源名称', dataIndex: 'authName', key: 'authName' },
  { title: '认证接入URL', dataIndex: 'url', key: 'url' },
  {
    title: '认证源接口方式', dataIndex: 'authStyle', key: 'authStyle', align: 'center',
    render: authStyle => enumerate.interfaceTypes.get(authStyle)
  },
  {
    title: '认证等级', dataIndex: 'authLevel', key: 'authLevel', align: 'center',
    render: authLevel => enumerate.authSafety.get(authLevel)
  },
  {
    title: '认证源状态', dataIndex: 'status', key: 'status', align: 'center',
    render: status => enumerate.baseState.get(status)
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
})

export default connect(mapState, mapDispatch)(DocCatalogList);