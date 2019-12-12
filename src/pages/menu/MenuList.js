import React, { Component } from 'react';
import { Table, Button, Spin, Icon,Tag } from 'antd';
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
    title: '路由地址',
    dataIndex: 'menuRoute',
    key: 'menuRoute',
  },
  {
    title: '菜单图标',
    dataIndex: 'menuLogo',
    key: 'menuLogo',
    align: 'center',
    render: menuLogo => (
      <Icon type={menuLogo} />
    )
  },
  {
    title: '菜单状态',
    dataIndex: 'menuStatue',
    key: 'menuStatue',
    align: 'center',
    render: roleStatue => (
      <span>
        {
          roleStatue === 1 ?
            <Tag color="green">已启用</Tag> :
            <Tag color="red">已禁用</Tag>
        }
      </span>
    ),
  },

  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => <Oper text={text} record={record} />,
  },
];

class MenuList extends Component {
  componentDidMount() {
    this.props.queryMenuList({});
  }

  render() {
    const list = this.props.list

    return (
      <div className="pageContentColor">

        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className={styles.buttonForm}>
            <Button
              type="primary"
              className={styles.addButton}
              onClick={() => this.props.changeAddModalvisible(true)}
            ><Icon type="plus" />新增</Button>
          </div>
          <Table
            bordered
            expandIconAsCell={true}
            columns={columns}
            dataSource={list}
            rowKey={record => record.key}
            size="small"
            pagination={false}
          />
        </Spin>
        <Add />
        <Edit />
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