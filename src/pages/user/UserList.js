import React, { Component } from 'react';
import { Table, Button, Spin, Tag, Icon, Modal, message } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import Oper from './components/Operation';
import AddModal from './components/AddModal';
import SearchForm from './components/SearchForm';
import styles from './css/UserList.module.css';

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
  { title: '更新时间', dataIndex: 'lastTime', key: 'lastTime' },
  {
    title: '签名证书', dataIndex: 'signcert', key: 'signcert',
    render: signcert => (
      <span type="primary" style={{ fontSize: "12px", color: "#3E8FFD", cursor: "pointer" }}
        onClick={() => showConfirm(signcert)}
      >查看签名证书</span>
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

class UserList extends Component {
  componentDidMount() {
    this.props.queryUserList({});
  }

  render() {
    const list = this.props.list
    return (
      <div className="pageContentColor">
        <AddModal changeSpinning={this.props.changeSpinning} />
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <SearchForm />
          <div className={styles.buttonForm}>
            <Button
              type="primary"
              className={styles.addButton}
              onClick={() => this.props.changeAddModalvisible(true, "add", {})}
            ><Icon type="plus" />新增</Button>
            <Button
              className={styles.addButton}
              onClick={() => this.props.changeAddModalvisible(true, "add", {})}
            ><Icon type="user-add" />角色配置</Button>
          </div>
          <Table
            columns={columns}
            dataSource={list}
            rowKey={record => record.adminId}
            size="small"
          />
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  list: state.user.list,
  spinning: state.user.spinning
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

export default connect(mapState, mapDispatch)(UserList);