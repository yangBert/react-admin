import React, { Component } from 'react';
import { Table, Spin, Tag, Modal, message } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import SearchForm from './components/SearchForm';
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

// createTime: "2019-12-11T12:15:02.000+0000"
// id: 26
// idCard: "MTIzMTM="
// idCardHash: "633928E344711BDAEB1834B078B0089B6D4D671F767101ECB840BBB52FFC03C1"
// lastUpdateTime: "2019-12-11T12:15:02.000+0000"
// name: null
// password: null
// realName: "dasdasdas"
// sourceId: 0
// state: "1"

const columns = [
  { title: '用户名称', dataIndex: 'realName', key: 'realName' },
  { title: '身份证号', dataIndex: 'idCard', key: 'idCard' },
  {
    title: '注册时间', dataIndex: 'createTime', key: 'createTime',
    render: createTime => (
      <span>{$$.getHours(createTime)}</span>
    )
  },
  {
    title: '最后登录时间', dataIndex: 'lastUpdateTime', key: 'lastUpdateTime',
    render: lastUpdateTime => (
      <span>{$$.getHours(lastUpdateTime)}</span>
    )
  },
  {
    title: '状态', dataIndex: 'state', key: 'state',
    render: state => <span>{state === "1" ? <Tag color="green">已启用</Tag> : <Tag color="red">已禁用</Tag>}</span>,
  }
];

class UserList extends Component {
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
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <SearchForm />
          <Table
            bordered
            columns={columns}
            dataSource={list}
            rowKey={record => record.id}
            size="small"
            pagination={pagination}
          />
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  list: state.user.list,
  pagination: state.user.pagination,
  spinning: state.user.spinning
})

const mapDispatch = dispatch => ({
  queryUserList: requestData => {
    const action = creators.createQueryUserAction(requestData);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(UserList);