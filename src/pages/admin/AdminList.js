import React, { Component } from 'react';
import { Table, Button, Spin, Tag, Icon, Modal, message } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import Oper from './components/Operation';
import AddModal from './components/AddModal';
import RoleModal from './components/RoleModal';
import SearchForm from './components/SearchForm';
import styles from './css/UserList.module.css';
import $$ from 'static/js/base';

const { confirm } = Modal;

function showConfirm(signcert) {
  confirm({
    title: '签名证书Base64',
    okText: "复制",
    cancelText: "取消",
    width: 516,
    content: <div>
      <textarea name="" id="document-copy-textarea-text" cols="60" rows="5" defaultValue={signcert}></textarea>
    </div>,
    onOk() {
      var input = document.getElementById("document-copy-textarea-text");
      input.value = signcert;
      input.select();
      document.execCommand("copy");
      message.success('复制成功');
    }
  });
}

const columns = [
  { title: '管理员名称', dataIndex: 'adminName', key: 'adminName' },
  { title: '签名证书序列号', dataIndex: 'adminId', key: 'adminId' },
  { title: '所属部门', dataIndex: 'department', key: 'department' },
  {
    title: '更新时间', dataIndex: 'lastTime', key: 'lastTime',
    render: lastTime => (
      <span>{$$.getHours(lastTime)}</span>
    )
  },
  {
    title: '签名证书', dataIndex: 'signcert', key: 'signcert', align: 'center',
    render: signcert => (
      <span type="primary"
        style={{ fontSize: "12px", color: "#3E8FFD", cursor: "pointer" }}
        onClick={() => showConfirm(signcert)}
      >查看</span>
    )
  },
  {
    title: '状态', dataIndex: 'status', key: 'status',
    render: text => <span>{text === "1" ? <Tag color="green">已启用</Tag> : <Tag color="red">已禁用</Tag>}</span>,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => <Oper text={text} record={record} />,
  },
];

class AdminList extends Component {
  componentDidMount() {
    this.props.queryUserList({ pageSize: 10, pageNo: 1 });
  }

  paginationChange = (pageNo, pageSize) => {
    this.props.queryUserList({ pageSize, pageNo })
  }

  paginationShowSizeChange = (pageNo, pageSize) => {
    this.props.queryUserList({ pageSize, pageNo })
  }

  render() {
    const list = this.props.list
    const pagination = {
      ...this.props.pagination,
      onChange: this.paginationChange,
      onShowSizeChange: this.paginationShowSizeChange,
    }

    return (
      <div className="pageContentColor">
        <AddModal changeSpinning={this.props.changeSpinning} />
        <RoleModal />
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <SearchForm />
          <div className={styles.buttonForm}>
            <Button
              type="primary"
              className={styles.addButton}
              onClick={() => this.props.changeAddModalvisible(true, "add", {})}
            ><Icon type="plus" />新增</Button>
            {/* <Button
              className={styles.addButton}
              onClick={() => this.props.querySelectedRole(true, "add", {})}
            ><Icon type="user-add" />角色配置</Button> */}
          </div>
          <Table
            bordered
            columns={columns}
            dataSource={list}
            rowKey={record => record.adminId}
            size="small"
            pagination={pagination}
          />
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  list: state.admin.list,
  pagination: state.admin.pagination,
  spinning: state.admin.spinning
})

const mapDispatch = dispatch => ({
  queryUserList: requestData => {
    const action = creators.createQueryUserAction(requestData);
    dispatch(action);
  },
  changeAddModalvisible: (addModalvisible, operationType) => {
    const action = creators.changeAddModalvisibleAction(addModalvisible, operationType);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(AdminList);