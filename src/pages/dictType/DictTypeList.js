import React, { Component } from 'react';
import { Table, Spin, Button, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import styles from './css/UserList.module.css';
import Oper from './components/Operation';
import AddModal from './components/AddModal';

const columns = [
  { title: '类型编码', dataIndex: 'type', key: 'type', align: 'center' },
  { title: '类型名称', dataIndex: 'typeName', key: 'typeName', align: 'center' },
  {
    title: '备注', dataIndex: 'remarks', key: 'remarks'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => <Oper text={text} record={record} />,
  }
];

class DictTypeList extends Component {
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
    //this.props.queryDictlist({ props: this.props, data });
    this.props.queryDictList({ props: this.props, data })
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
          {/* <SearchForm /> */}
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
  list: state.dictType.list,
  pagination: state.dictType.pagination,
  spinning: state.dictType.spinning,
  params: state.dictType.params,
})

const mapDispatch = dispatch => ({
  changeAddModalvisible: (addModalvisible, operationType, record) => {
    const action = creators.changeAddModalvisibleAction(addModalvisible, operationType, record);
    dispatch(action);
  },
  queryDictList: req => {
    const action = creators.queryDictTypeListAction(req);
    dispatch(action);
  },
})

export default withRouter(connect(mapState, mapDispatch)(DictTypeList));