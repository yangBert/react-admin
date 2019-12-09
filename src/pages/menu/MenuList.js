import React, { Component } from 'react';
import { Table, Button, Spin, Tag, Icon, Modal, message } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import Oper from './components/Operation';
import Add from './components/Add';
import Edit from './components/Edit';
import styles from './css/UserList.module.css';

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    key: 'menuName',
  },
  {
    title: '菜单图标',
    dataIndex: 'menuLogo',
    key: 'menuLogo',
  },
  {
    title: '菜单ID',
    dataIndex: 'menuId',
    key: 'menuId',
  },
  {
    title: '菜单状态',
    dataIndex: 'menuStatue',
    key: 'menuStatue',
  },
  {
    title: '路由地址',
    dataIndex: 'menuRoute',
    key: 'menuRoute',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => <Oper text={text} record={record} />,
  },
];

// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

class MenuList extends Component {
  componentDidMount() {
    this.props.queryMenuList({});
  }

  render() {
    const list = this.props.list

    return (
      <div className="pageContentColor">
        <Add />
        <Edit />
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className={styles.buttonForm}>
            <Button
              type="primary"
              className={styles.addButton}
              onClick={() => this.props.changeAddModalvisible(true)}
            ><Icon type="plus" />新增</Button>
            <Button
              className={styles.addButton}
            //onClick={() => this.props.changeAddModalvisible(true, "add", {})}
            ><Icon type="user-add" />角色配置</Button>
          </div>
          <Table
            bordered
            columns={columns}
            dataSource={list}
            rowKey={record => record.key}
            size=""
          // columns={columns} rowSelection={rowSelection} dataSource={data}
          />
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  list: state.menu.list,
  spinning: state.menu.spinning,
  addModalvisible: state.menu.addModalvisible,
})

const mapDispatch = dispatch => ({
  queryMenuList: requestData => {
    const action = creators.queryMenuAction(requestData);
    dispatch(action);
  },
  changeAddModalvisible: visible => {
    const action = creators.changeAddModalvisibleAction(visible);
    dispatch(action);
  }
})
export default connect(mapState, mapDispatch)(MenuList);