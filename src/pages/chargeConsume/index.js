import React, { Component } from "react";
import { Table, Spin, Button, Icon, Tag } from "antd";
import { connect } from "react-redux";
import * as creators from "./store/creators";
import SearchForm from "./components/SearchForm";
import styles from "./css/UserList.module.css";
import { Link } from "react-router-dom";
import $$ from "static/js/base";
import Oper from "./components/Operation";

const columns = [
  {
    title: "账户编码",
    dataIndex: "accountCode",
    key: "accountCode",
    align: "center"
  },
  {
    title: "账户名",
    dataIndex: "accountName",
    key: "accountName",
    align: "center"
  },
  {
    title: "账户类型",
    dataIndex: "accountType",
    key: "accountType",
    align: "center"
  },
  {
    title: "充值总金额",
    dataIndex: "totalMoney",
    key: "totalMoney",
    align: "center"
  },
  {
    title: "可用余额",
    dataIndex: "balanceMoney",
    key: "balanceMoney",
    align: "center"
  },
  {
    title: "创建人",
    dataIndex: "createdBy",
    key: "createdBy",
    align: "center"
  },
  {
    title: "账户状态",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: status => (
      <span>
        {status === "0" ? (
          <Tag color="green">已启用</Tag>
        ) : (
          <Tag color="red">已禁用</Tag>
        )}
      </span>
    )
  },
  {
    title: "最后更新时间",
    dataIndex: "lastUpdatedTime",
    key: "lastUpdatedTime",
    align: "center",
    render: lastUpdatedTime => (
      <span>{lastUpdatedTime && $$.getHours(lastUpdatedTime)}</span>
    )
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    render: (text, record) => <Oper text={text} record={record} />
  }
];

class List extends Component {
  componentDidMount() {
    this.sendFn(1, 10);
  }

  paginationChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize);
  };

  paginationShowSizeChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize);
  };

  sendFn(pageNo, pageSize) {
    //const params = this.props.params
    const data = { pageNo, pageSize };
    this.props.querylist({ props: this.props, data });
  }

  render() {
    const list = this.props.list;
    const pagination = {
      ...this.props.pagination,
      onChange: this.paginationChange,
      onShowSizeChange: this.paginationShowSizeChange
    };

    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <SearchForm />
          <Table
            bordered
            columns={columns}
            dataSource={list}
            rowKey={(record, index) => index}
            size="small"
            pagination={pagination}
            rowClassName={styles.table}
          />
        </Spin>
      </div>
    );
  }
}

const mapState = state => ({
  list: state.chargeConsume.list,
  pagination: state.chargeConsume.pagination,
  spinning: state.chargeConsume.spinning,
  params: state.chargeConsume.params,
  editOrgList: state.chargeConsume.editOrgList
});

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(List);
