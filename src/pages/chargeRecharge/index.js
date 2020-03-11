import React, { Component } from "react";
import { Table, Spin, Tag } from "antd";
import { connect } from "react-redux";
import * as creators from "./store/creators";
import SearchForm from "./components/SearchForm";
import styles from "./css/UserList.module.css";
import $$ from "static/js/base";
import Oper from "./components/Operation";
import * as config from "./config";

const columns = [
  {
    title: "账户编码",
    dataIndex: "accountCode",
    key: "accountCode",
    align: "center"
  },
  {
    title: "账户类型",
    dataIndex: "accountType",
    key: "accountType",
    align: "center",
    render: accountType => (
      <span>
        {config.accountType[accountType]
          ? config.accountType[accountType]
          : "--"}
      </span>
    )
  },
  {
    title: "充值金额",
    dataIndex: "rechargeMoney",
    key: "rechargeMoney",
    align: "center",
    render: rechargeMoney => (
      <span>{!rechargeMoney ? "0.00" : rechargeMoney.toFixed(2)}</span>
    )
  },

  {
    title: "充值时间",
    dataIndex: "rechargeTime",
    key: "rechargeTime",
    align: "center",
    render: rechargeTime => (
      <span>{rechargeTime && $$.getHours(rechargeTime)}</span>
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
  list: state.chargeRecharge.list,
  pagination: state.chargeRecharge.pagination,
  spinning: state.chargeRecharge.spinning,
  params: state.chargeRecharge.params
});

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(List);
