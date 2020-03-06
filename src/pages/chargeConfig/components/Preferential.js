import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Spin, Button } from 'antd';
import styles from '../css/UserList.module.css';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import $$ from 'static/js/base';

const columns = [
  { title: '编码', dataIndex: 'strategyCode', key: 'strategyCode', align: 'center' },
  { title: '优惠策略', dataIndex: 'strategyName', key: 'strategyName', align: 'center' },
  {
    title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', align: 'center',
    render: createdAt => (
      <span>{createdAt ? $$.getHours(createdAt) : "--"}</span>
    )
  },
];

class Preferential extends Component {
  state = {
    preferential: null
  }
  componentDidMount() {
    this.sendFn(1, 10)
    if (this.props.location.state.params) {
      this.props.changePreferentialSelectedKeys([this.props.location.state.params])
    }
  }
  collectData(strategyCode, strategyName) {
    this.props.changePreferentialSelectedKeys([strategyCode])
    this.setState({
      preferential: {
        strategyCode,
        strategyName,
      }
    })
  }

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const { strategyCode, strategyName } = selectedRows[0]
      this.collectData(strategyCode, strategyName)
    },
  }

  paginationChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  paginationShowSizeChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  sendFn(pageNo, pageSize) {
    let data = { pageNo, pageSize }
    this.props.queryPreferentialList({ props: this.props, data });
  }
  render() {
    const preferentialList = this.props.preferentialList
    const pagination = {
      ...this.props.preferentialListPagination,
      onChange: this.paginationChange,
      onShowSizeChange: this.paginationShowSizeChange,
    }
    this.rowSelection.selectedRowKeys = this.props.preferentialSelectedKeys
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <h2 style={{ fontSize: "17px" }}>优惠策略</h2>
          <div style={{ marginBottom: "20px", textAlign: "right" }}>
            <Link
              to={{
                pathname: "/chargeConfig/add",
                state: {
                  preferential: this.state.preferential,
                  appCode: this.props.location.state.appCode,
                }
              }}
            >
              <Button
                type="primary"
                className={styles.back}
              >确定</Button>
            </Link>&nbsp;&nbsp;
            <Button
              type="primary"
              className={styles.back}
              onClick={() => this.props.history.goBack()}
            >返回</Button>
          </div>
          <Table
            rowSelection={{
              type: 'radio',
              ...this.rowSelection,
            }}
            columns={columns}
            dataSource={preferentialList}
            rowKey={record => record.strategyCode}
            pagination={pagination}
            size="small"
            onRow={record => {
              return {
                onClick: () => {
                  const { strategyCode, strategyName } = record
                  this.collectData(strategyCode, strategyName)
                  this.props.changePreferentialSelectedKeys([strategyCode])
                }
              }
            }}
          />
        </Spin>
      </div>
    )
  }

}

const mapState = state => ({
  preferentialList: state.chargeConfig.preferentialList,
  preferentialListPagination: state.chargeConfig.preferentialListPagination,
  spinning: state.chargeConfig.spinning,
  preferentialSelectedKeys: state.chargeConfig.preferentialSelectedKeys,
})

const mapDispatch = dispatch => ({
  queryPreferentialList: req => {
    const action = creators.queryPreferentialListAction(req);
    dispatch(action);
  },
  changePreferentialSelectedKeys: req => {
    const action = creators.changePreferentialSelectedKeysAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(Preferential);