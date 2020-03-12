import React, { Component } from "react";
import { Table, Spin } from "antd";
import { connect } from "react-redux";
import * as creators from "./store/creators";
import SearchForm from "./components/SearchForm";
import styles from "./css/UserList.module.css";
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
    title: "产品",
    dataIndex: "productCode",
    key: "productCode",
    align: "center"
  },

  {
    title: "消费金额",
    dataIndex: "consumeMoney",
    key: "consumeMoney",
    align: "center"
  },
  {
    title: "优惠金额",
    dataIndex: "preferentialMoney",
    key: "preferentialMoney",
    align: "center"
  },
  {
    title: "合计消费金额",
    dataIndex: "total",
    key: "total",
    align: "center"
  },
  {
    title: "消费时间",
    dataIndex: "consumeTime",
    key: "consumeTime",
    align: "center",
    render: consumeTime => (
      <span>{consumeTime && $$.getHours(consumeTime)}</span>
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
  params: state.chargeConsume.params
});

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(List);
