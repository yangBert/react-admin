import React, { Component } from "react";
import { Table, Spin } from "antd";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import SearchForm from "./SearchForm";
import styles from "../css/UserList.module.css";
import $$ from "static/js/base";
import AuditOper from "./AuditOper";
import * as config from "../config";

const columns = [
  {
    title: "受理单号",
    dataIndex: "instanceCode",
    key: "instanceCode",
    align: "center"
  },
  {
    title: "订单类型",
    dataIndex: "instanceType",
    key: "instanceType",
    align: "center",
    render: instanceType => (
      <span>
        {config.instanceType[instanceType]
          ? config.instanceType[instanceType]
          : "--"}
      </span>
    )
  },
  { title: "申请单名称", dataIndex: "name", key: "name", align: "center" },

  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    align: "center",
    render: createTime => <span>{createTime && $$.getHours(createTime)}</span>
  },
  {
    title: "用户编码",
    dataIndex: "userNo",
    key: "userNo",
    align: "center"
  },
  {
    title: "当前状态",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: status => (
      <span>{config.status.get(status)}</span>
    )
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    render: (text, record) => <AuditOper text={text} record={record} />
  }
];

class List extends Component {
  componentDidMount() {
    this.sendFn(1, 10);
    this.props.initDetail(null);
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
            rowKey={record => record.instanceCode}
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
  list: state.applyOrder.list,
  pagination: state.applyOrder.pagination,
  spinning: state.applyOrder.spinning,
  params: state.applyOrder.params
});

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  initDetail: value => {
    const action = creators.initDetailAction(value);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(List);
