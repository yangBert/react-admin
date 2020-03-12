import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Spin, Button } from "antd";
import styles from "../css/UserList.module.css";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import $$ from "static/js/base";

const columns = [
  { title: "编码", dataIndex: "code", key: "code", align: "center" },
  { title: "计费策略", dataIndex: "title", key: "title", align: "center" },
  {
    title: "创建时间",
    dataIndex: "createAt",
    key: "createAt",
    align: "center",
    render: createAt => <span>{createAt ? $$.getHours(createAt) : "--"}</span>
  }
];

class Billing extends Component {
  state = {
    billing: null
  };
  componentDidMount() {
    this.sendFn(1, 10);
    if (this.props.location.state.params) {
      this.props.changeBillingSelectedKeys([this.props.location.state.params]);
    }
  }

  collectData(billingCode, billingName) {
    this.props.changeBillingSelectedKeys([billingCode]);
    this.setState({
      billing: {
        billingCode,
        billingName
      }
    });
  }

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const { code, title } = selectedRows[0];
      this.collectData(code, title);
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
    this.props.queryBillingList({ props: this.props, data });
  }
  render() {
    const billingList = this.props.billingList;
    const pagination = {
      ...this.props.billingListPagination,
      onChange: this.paginationChange,
      onShowSizeChange: this.paginationShowSizeChange
    };
    this.rowSelection.selectedRowKeys = this.props.billingSelectedKeys;
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <h2 style={{ fontSize: "17px" }}>计费策略</h2>
          <div style={{ marginBottom: "20px", textAlign: "right" }}>
            <Link
              to={{
                pathname: "/chargeConfig/add",
                state: {
                  billing: this.state.billing,
                  appCode: this.props.location.state.appCode
                }
              }}
            >
              <Button type="primary" className={styles.back}>
                确定
              </Button>
            </Link>
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
            dataSource={billingList}
            rowKey={record => record.code}
            pagination={pagination}
            size="small"
            onRow={record => {
              return {
                onClick: () => {
                  const { code, title } = record;
                  this.collectData(code, title);
                  this.props.changeBillingSelectedKeys([code]);
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
  billingList: state.chargeConfig.billingList,
  billingListPagination: state.chargeConfig.billingListPagination,
  spinning: state.chargeConfig.spinning,
  billingSelectedKeys: state.chargeConfig.billingSelectedKeys
});

const mapDispatch = dispatch => ({
  queryBillingList: req => {
    const action = creators.queryBillingListAction(req);
    dispatch(action);
  },
  changeBillingSelectedKeys: req => {
    const action = creators.changeBillingSelectedKeysAction(req);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(Billing);
