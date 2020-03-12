import React, { Component } from "react";
import { Table, Spin, Button, Icon } from "antd";
import { connect } from "react-redux";
import * as creators from "./store/creators";
import SearchForm from "./components/SearchForm";
import styles from "./css/UserList.module.css";
import { Link } from "react-router-dom";
import Oper from "./components/Operation";
import * as config from "./config";

const columns = [
  { title: "接口名称", dataIndex: "apiName", key: "apiName" },
  {
    title: "接口",
    dataIndex: "apiUrl",
    key: "apiUrl"
  },
  {
    title: "请求方法",
    dataIndex: "apiReqType",
    key: "apiReqType"
  },
  {
    title: "Content-Type",
    dataIndex: "apiParamType",
    key: "apiParamType"
  },
  {
    title: "状态",
    dataIndex: "state",
    key: "state",
    render: state => (
      <span>{config.state[state] ? config.state[state] : "--"}</span>
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
    this.props.queryTypeList({ props: this.props, data: {} });
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
    this.props.queryList({ props: this.props, data });
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
          <div className={styles.buttonForm}>
            <Link to="/oApi/add">
              <Button type="primary" className={styles.addButton}>
                <Icon type="plus" />
                新增
              </Button>
            </Link>
          </div>
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
  list: state.oApi.list,
  pagination: state.oApi.pagination,
  spinning: state.oApi.spinning,
  params: state.oApi.params
});

const mapDispatch = dispatch => ({
  queryList: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  queryTypeList: req => {
    const action = creators.queryTypeListAction(req);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(List);
