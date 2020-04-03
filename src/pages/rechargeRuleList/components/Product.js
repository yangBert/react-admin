import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Spin, Button } from "antd";
import styles from "../css/UserList.module.css";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import $$ from "static/js/base";

const columns = [
  {
    title: "产品编码",
    dataIndex: "productCode",
    key: "productCode",
    align: "center"
  },
  {
    title: "产品名称",
    dataIndex: "productName",
    key: "productName",
    align: "center"
  },
  {
    title: "上架时间",
    dataIndex: "publishAt",
    key: "publishAt",
    align: "center",
    render: publishAt => (
      <span>{publishAt ? $$.getHours(publishAt) : "--"}</span>
    )
  }
];

class Product extends Component {
  state = {
    product: null
  };
  componentDidMount() {
    this.sendFn(1, 10);
    if (this.props.location.state.params) {
      this.props.changeProductSelectedKeys([this.props.location.state.params]);
    }
  }

  collectData(productCode, productName) {
    this.props.changeProductSelectedKeys([productCode]);
    this.setState({
      product: {
        productCode,
        productName
      }
    });
  }

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const { productCode, productName } = selectedRows[0];
      this.collectData(productCode, productName);
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
    this.props.queryProductList({ props: this.props, data });
  }
  render() {
    const productList = this.props.productList;
    const pagination = {
      ...this.props.productPagination,
      onChange: this.paginationChange,
      onShowSizeChange: this.paginationShowSizeChange
    };
    this.rowSelection.selectedRowKeys = this.props.productSelectedKeys;
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <h2 style={{ fontSize: "17px" }}>产品</h2>
          <div style={{ marginBottom: "20px", textAlign: "right" }}>
            <Link
              to={{
                pathname: "/rechargeRule/add",
                state: {
                  product: this.state.product,
                  accountCode: this.props.location.state.accountCode
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
            dataSource={productList}
            rowKey={record => record.productCode}
            pagination={pagination}
            size="small"
            onRow={record => {
              return {
                onClick: () => {
                  const { productCode, productName } = record;
                  this.collectData(productCode, productName);
                  this.props.changeProductSelectedKeys([productCode]);
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
  productList: state.rechargeRuleList.productList,
  productPagination: state.rechargeRuleList.productPagination,
  spinning: state.rechargeRuleList.spinning,
  productSelectedKeys: state.rechargeRuleList.productSelectedKeys
});

const mapDispatch = dispatch => ({
  queryProductList: req => {
    const action = creators.queryProductListAction(req);
    dispatch(action);
  },
  changeProductSelectedKeys: req => {
    const action = creators.changeProductSelectedKeysAction(req);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(Product);
