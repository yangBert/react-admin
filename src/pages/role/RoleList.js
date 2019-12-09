import React, { Component } from 'react';
import { Table, Button, Spin, Tag, Icon, Modal, message } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import Oper from './components/Operation';
import AddModal from './components/AddModal';
import styles from './css/UserList.module.css';

const columns = [
  { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
  { title: '角色ID', dataIndex: 'roleId', key: 'roleId' },
  {
    title: '角色状态', dataIndex: 'roleStatue', key: 'roleStatue',
    render: text => <span>{text === "1" ? <Tag color="green">已启用</Tag> : <Tag color="red">已禁用</Tag>}</span>,
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
    this.props.queryRoleList({});
  }

  // paginationChange = (pageNo, pageSize) => {
  //   this.props.queryRoleList({ pageSize, pageNo })
  // }

  // paginationShowSizeChange = (pageNo, pageSize) => {
  //   this.props.queryRoleList({ pageSize, pageNo })
  // }

  render() {
    const list = this.props.list
    // const pagination = {
    //   ...this.props.pagination,
    //   onChange: this.paginationChange,
    //   onShowSizeChange: this.paginationShowSizeChange,
    // }

    return (
      <div className="pageContentColor">
        <AddModal changeSpinning={this.props.changeSpinning} />
        <Spin tip="Loading..." spinning={this.props.spinning}>
          {/* <SearchForm /> */}
          <div className={styles.buttonForm}>
            <Button
              type="primary"
              className={styles.addButton}
              onClick={() => this.props.changeAddModalvisible(true, "add", {})}
            ><Icon type="plus" />新增</Button>
            <Button
              className={styles.addButton}
              onClick={() => this.props.changeAddModalvisible(true, "add", {})}
            ><Icon type="user-add" />权限配置</Button>
          </div>
          <Table
            bordered
            columns={columns}
            dataSource={list}
            rowKey={record => record.roleId}
            size=""
            // pagination={pagination}
          />
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  list: state.role.list,
  pagination: state.role.pagination,
  spinning: state.role.spinning
})

const mapDispatch = dispatch => ({
  queryRoleList: requestData => {
    const action = creators.queryRoleListAction(requestData);
    dispatch(action);
  },
  changeAddModalvisible: (addModalvisible, operationType) => {
    const action = creators.changeAddModalvisibleAction(addModalvisible, operationType);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(UserList);