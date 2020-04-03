import React, { Component } from "react";
import { Table, Spin, Button } from "antd";
import styles from "../css/UserList.module.css";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import * as config from "../config";
import $$ from "static/js/base";
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
    title: "账户状态",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: status => (
      <span>{config.status[status] ? config.status[status] : "--"}</span>
    )
  },

];

class Billing extends Component {
  state = {
    app: null
  };
  componentDidMount() {
    this.sendFn(1, 10);
    if (this.props.location.state.appCode) {
      const { appCode } = this.props.location.state
      this.props.getbindAppAccount({
        props: this.props,
        data: { appCode }
      });
    }
  }

  collectData(appCode) {
    this.props.changeBillingSelectedKeys([appCode]);
    this.setState({
      app: {
        appCode,
      }
    });
  }

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const { appCode } = selectedRows[0];
      this.collectData(appCode);
    }
  };

  paginationChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize);
  };

  paginationShowSizeChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize);
  };

  sendFn(pageNo, pageSize) {
    let data = { pageNo, pageSize };
    this.props.queryList({ props: this.props, data });
  }

  bindSave = () => {
    const { appCode } = this.props.location.state
    const userNo = $$.localStorage.get("adminId");
    const data = { accountCode: this.props.appSelectedKeys[0], appCode, userNo }

    this.props.bindSave({ props: this.props, data });
  }

  render() {
    const list = this.props.list;
    const pagination = {
      ...this.props.pagination,
      onChange: this.paginationChange,
      onShowSizeChange: this.paginationShowSizeChange
    };

    this.rowSelection.selectedRowKeys = this.props.appSelectedKeys;
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <h2 style={{ fontSize: "17px" }}>账户列表</h2>
          <div style={{ marginBottom: "20px", textAlign: "right" }}>
            <Button
              type="primary"
              className={styles.back}
              onClick={this.bindSave}
            >确定</Button>
            &nbsp;&nbsp;
            <Button
              type="primary"
              className={styles.back}
              onClick={() => this.props.history.goBack()}
            >
              返回
            </Button>
          </div>
          <Table
            rowSelection={{
              type: "radio",
              ...this.rowSelection
            }}
            columns={columns}
            dataSource={list}
            rowKey={record => record.accountCode}
            pagination={pagination}
            size="small"
            onRow={record => {
              return {
                onClick: () => {
                  const { accountCode } = record;
                  this.collectData(accountCode);
                  this.props.changeBillingSelectedKeys([accountCode]);
                }
              };
            }}
          />
        </Spin>
      </div>
    );
  }
}

const mapState = state => ({
  list: state.account.appList,
  pagination: state.account.appListPagination,
  spinning: state.account.spinning,
  params: state.account.params,
  appSelectedKeys: state.account.appSelectedKeys,
});

const mapDispatch = dispatch => ({
  queryList: req => {
    const action = creators.createQueryAppListAction(req);
    dispatch(action);
  },
  changeBillingSelectedKeys: req => {
    const action = creators.changeBillingSelectedKeysAction(req);
    dispatch(action);
  },
  bindSave: req => {
    const action = creators.bindSaveAction(req);
    dispatch(action);
  },
  getbindAppAccount: req => {
    const action = creators.getbindAppAccountAction(req);
    dispatch(action);
  },
});

export default connect(mapState, mapDispatch)(Billing);
