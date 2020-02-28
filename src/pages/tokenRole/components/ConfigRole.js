import React, { Component } from 'react';
import { Table, Spin, Button } from 'antd';
import { connect } from 'react-redux';
import * as creators from 'pages/tokenPower/store/creators';
import styles from '../css/UserList.module.css';

const columns = [
  { title: '接口标题', dataIndex: 'title', key: 'title', align: 'center' },
  { title: '接口地址', dataIndex: 'url', key: 'url', align: 'center' },
];

class ConfigRole extends Component {

  componentDidMount() {
    const roleId = this.props.location.state.record.id
    this.props.initRoleId(roleId)
    this.props.queryBinded({ props: this.props, data: { roleId } })
  }

  paginationChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  paginationShowSizeChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  sendFn(pageNo, pageSize) {
    const data = { pageNo, pageSize }
    this.props.querylist({ props: this.props, data });
  }

  onSelectChange = selectedRowKeys => {
    this.props.changeSelectedRowKeys(selectedRowKeys);
  };

  render() {
    const list = this.props.list
    const pagination = {
      ...this.props.pagination,
      onChange: this.paginationChange,
      onShowSizeChange: this.paginationShowSizeChange,
    }

    const { selectedRowKeys } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={() => this.props.saveConfigRole({ props: this.props })}
            >保存</Button>&nbsp;&nbsp;
            <Button
              type="primary"
              onClick={() => this.props.changeSelectedRowKeys([])}
              disabled={!hasSelected}
            >重选</Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `已选择 ${selectedRowKeys.length} 项` : ''}
            </span>
            <Button className="pullRight" type="primary" onClick={() => this.props.history.goBack()}>返回</Button>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={list}
            rowKey={record => record.id}
            pagination={pagination}
          />
        </Spin>
      </div>
    )
  }
}

const mapState = state => ({
  list: state.tokenPower.list,
  pagination: state.tokenPower.pagination,
  spinning: state.tokenPower.spinning,
  selectedRowKeys: state.tokenPower.selectedRowKeys,
})

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  changeSelectedRowKeys: req => {
    const action = creators.changeSelectedRowKeysAction(req);
    dispatch(action);
  },
  initRoleId: req => {
    const action = creators.initRoleIdAction(req);
    dispatch(action);
  },
  saveConfigRole: req => {
    const action = creators.saveConfigRoleAction(req);
    dispatch(action);
  },
  queryBinded: req => {
    const action = creators.queryBindedAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(ConfigRole);