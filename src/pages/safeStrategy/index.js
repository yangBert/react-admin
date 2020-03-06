import React, { Component } from 'react';
import { Table, Spin, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import styles from './css/UserList.module.css';
import Oper from './components/Operation';
import Add from './components/Add';
import * as config from './config';

const columns = [
  { title: '安全策略名称', dataIndex: 'strategyName', key: 'strategyName', align: 'center' },
  {
    title: '安全策略编码', dataIndex: 'strategyCode', key: 'strategyCode', align: 'center'
  },
  {
    title: '登录次数', dataIndex: 'strategyTimes', key: 'strategyTimes', align: 'center',
    render: strategyTimes => <span>{strategyTimes ? strategyTimes : 0}</span>,
  },
  {
    title: '状态', dataIndex: 'strategyStatus', key: 'strategyStatus', align: 'center',
    render: status => <span>{config.status[status] ? config.status[status] : "--"}</span>,
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
    this.props.querylist({ props: this.props, data: {} });
  }

  render() {
    const list = this.props.list
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <Add></Add>
          <div className={styles.buttonForm}>
            <Button
              type="primary"
              className={styles.addButton}
              onClick={() => this.props.changeModalVisible(true, false, config.record)}
            ><Icon type="plus" />新增</Button>
          </div>
          <Table
            bordered
            columns={columns}
            dataSource={list}
            rowKey={(record, index) => index}
            rowClassName={styles.table}
            pagination={false}
          />
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  list: state.safeStrategy.list,
  pagination: state.safeStrategy.pagination,
  spinning: state.safeStrategy.spinning,
  params: state.safeStrategy.params,
})

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  changeModalVisible: (modalVisible, edit, record) => {
    const action = creators.changeModalVisibleAction(modalVisible, edit, record);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(List);