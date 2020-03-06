import React, { Component } from 'react';
import { Table, Spin, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import styles from './css/UserList.module.css';
import Oper from './components/Operation';
import Add from './components/Add';
import * as config from './config';

const columns = [
  { title: '类型编码', dataIndex: 'typeId', key: 'typeId', align: 'center' },
  {
    title: '类型名称', dataIndex: 'typeName', key: 'typeName', align: 'center'
  },
  { title: '备注', dataIndex: 'typeRemarks', key: 'typeRemarks', align: 'center' },
  {
    title: '状态', dataIndex: 'state', key: 'state', align: 'center',
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
    this.props.querylist({ props: this.props, data: { state: 1 } });
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
  list: state.oApiTypes.list,
  pagination: state.oApiTypes.pagination,
  spinning: state.oApiTypes.spinning,
  params: state.oApiTypes.params,
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