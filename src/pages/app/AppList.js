import React, { Component } from "react";
import { Table, Spin, Tag } from "antd";

import { connect } from "react-redux";
import * as creators from "./store/creators";
import SearchForm from "./components/SearchForm";
import styles from "./css/UserList.module.css";
import Oper from "./components/Operation";
import $$ from "static/js/base";

const columns = [
  { title: "应用编码", dataIndex: "appCode", key: "appCode" },
  { title: "应用名称", dataIndex: "appName", key: "appName" },
  {
    title: '创建时间', dataIndex: 'createTime', key: 'createTime', align: 'center',
    render: createTime => (
      <span>{$$.getHours(createTime)}</span>
    )
  },
  {
    title: "应用状态",
    dataIndex: "appStatus",
    key: "appStatus",
    render: appStatus => (
      <span>
        {appStatus === 1 ? (
          <Tag color="green">已上线</Tag>
        ) : (
            <Tag color="#ccc">未上线</Tag>
          )}
      </span>
    )
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    render: (text, record) => <Oper text={text} record={record} />
  }
];

class AppList extends Component {
  componentDidMount() {
    //查询所有登陆认证方式
    this.props.queryLoginType({ props: this.props, data: {} });

    //查询所有支持CA机构
    this.props.queryAllSupportCAs({ props: this.props, data: {} });

    //查询所有的应用类型
    this.props.queryAllAppType({ props: this.props, data: {} });

    //获取认证源等级
    this.props.getAuthLevel({ props: this.props, data: {} });

    //查询所有产品类型
    this.props.getProductType({ props: this.props, data: {} });

    this.props.emptyValue();

    this.props.setIconBase64("");

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
    this.props.queryApplist({ props: this.props, data });
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
            rowKey={record => record.appCode}
            size="small"
            pagination={pagination}
          />
        </Spin>
      </div>
    );
  }
}

const mapState = state => ({
  list: state.app.list,
  pagination: state.app.pagination,
  spinning: state.app.spinning,
  params: state.app.params
});

const mapDispatch = dispatch => ({
  queryApplist: req => {
    const action = creators.createQueryAppListAction(req);
    dispatch(action);
  },
  queryLoginType: value => {
    const action = creators.queryLoginTypeAction(value);
    dispatch(action);
  },
  queryAllSupportCAs: value => {
    const action = creators.queryAllSupportCAsAction(value);
    dispatch(action);
  },
  queryAllAppType: value => {
    const action = creators.queryAllAppTypeAction(value);
    dispatch(action);
  },
  getAuthLevel: req => {
    const action = creators.getAuthLevelAction(req);
    dispatch(action);
  },
  getProductType: req => {
    const action = creators.getProductTypeAction(req);
    dispatch(action);
  },
  emptyValue: () => {
    const action = creators.emptyAddValueAction();
    dispatch(action);
  },
  setIconBase64: value => {
    const action = creators.setIconBase64Action(value);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(AppList);
