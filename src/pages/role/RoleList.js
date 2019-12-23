import React, { Component } from 'react';
import { Table, Button, Spin, Tag, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import Oper from './components/Operation';
import AddModal from './components/AddModal';
import MenuModal from './components/MenuModal';
import styles from './css/UserList.module.css';

const columns = [
  { title: '角色名称', dataIndex: 'roleName', key: 'roleName', align: 'center' },
  {
    title: '角色状态', dataIndex: 'roleStatue', key: 'roleStatue', align: 'center',
    render: roleStatue => <span>{roleStatue === 1 ? <Tag color="green">已启用</Tag> : <Tag color="red">已禁用</Tag>}</span>,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => <Oper text={text} record={record} />,
  },
];

class UserList extends Component {

  componentDidMount() {
    this.props.queryRoleList({ props: this.props, data: {} });
  }

  rowSelection = {
    onChange: selectedRowKeys => {
      this.props.changeSelectedKeys(selectedRowKeys)
    },
  };

  render() {
    const list = this.props.list
    // const pagination = {
    //   ...this.props.pagination,
    //   onChange: this.paginationChange,
    //   onShowSizeChange: this.paginationShowSizeChange,
    // }

    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <AddModal changeSpinning={this.props.changeSpinning} />
        <MenuModal />
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className={styles.buttonForm}>
            <Button
              type="primary"
              className={styles.addButton}
              onClick={() => this.props.changeAddModalvisible(true, "add", {})}
            ><Icon type="plus" />新增</Button>
            {/* <Button
              className={styles.addButton}
              onClick={() => this.props.changeMenuModalvisible(true)}
            ><Icon type="user-add" />权限配置</Button> */}
          </div>
          <Table
            bordered
            columns={columns}
            dataSource={list}
            rowKey={record => record.roleId}
            pagination={false}
          />
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  list: state.role.list,
  pagination: state.role.pagination,
  spinning: state.role.spinning,
  menuModalvisible: state.role.menuModalvisible,
})

const mapDispatch = dispatch => ({
  queryRoleList: req => {
    const action = creators.queryRoleListAction(req);
    dispatch(action);
  },
  changeAddModalvisible: (addModalvisible, operationType) => {
    const action = creators.changeAddModalvisibleAction(addModalvisible, operationType);
    dispatch(action);
  },

})

export default connect(mapState, mapDispatch)(UserList);