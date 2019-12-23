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

];

class CertList extends Component {
  componentDidMount() {
    this.sendFn(1, 10)
  }

  paginationChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  paginationShowSizeChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  sendFn(pageNo, pageSize) {
    //const params = this.props.params
    const data = { pageNo, pageSize }
    this.props.queryCertlist({ props: this.props, data });
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
            rowKey={(record, index) => index}
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
  spinning: state.admin.spinning,
  params: state.admin.params,
})

const mapDispatch = dispatch => ({
  queryCertlist: req => {
    const action = creators.createQueryCertlistAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(CertList);