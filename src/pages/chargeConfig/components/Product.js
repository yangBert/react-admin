import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider, Spin, Button } from 'antd';
import styles from '../css/UserList.module.css';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import $$ from 'static/js/base';

const columns = [
  { title: '产品编码', dataIndex: 'productCode', key: 'productCode', align: 'center' },
  { title: '产品名称', dataIndex: 'productName', key: 'productName', align: 'center' },
  {
    title: '上架时间', dataIndex: 'publishAt', key: 'publishAt', align: 'center',
    render: publishAt => (
      <span>{publishAt ? $$.getHours(publishAt) : "--"}</span>
    )
  },
];

class Product extends Component {
  state = {
    product: null
  }
  componentDidMount() {
    this.sendFn(1, 10)
  }

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const { productCode, productName } = selectedRows[0]
      this.setState({
        product: {
          productCode,
          productName,
        }
      })
    },
  }

  paginationChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  paginationShowSizeChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  sendFn(pageNo, pageSize) {
    let data = { pageNo, pageSize }
    this.props.queryProductList({ props: this.props, data });
  }
  render() {
    const productList = this.props.productList
    const pagination = {
      ...this.props.productPagination,
      onChange: this.paginationChange,
      onShowSizeChange: this.paginationShowSizeChange,
    }
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <h2 style={{ fontSize: "17px" }}>产品</h2>
          <div style={{ marginBottom: "20px", textAlign: "right" }}>
            <Link
              to={{
                pathname: "/chargeConfig/add",
                state: {
                  product: this.state.product,
                  appCode: this.props.location.state.appCode,
                }
              }}
            >
              <Button
                type="primary"
                className={styles.back}
              >确定</Button>
            </Link>
            &nbsp;&nbsp;
            <Button
              type="primary"
              className={styles.back}
              onClick={() => this.props.history.goBack()}
            >返回</Button>
          </div>
          <Table
            rowSelection={{
              type: 'radio',
              ...this.rowSelection,
            }}
            columns={columns}
            dataSource={productList}
            rowKey={(record, index) => index}
            pagination={pagination}
            size="small"
          />
        </Spin>
      </div>
    )
  }
}

const mapState = state => ({
  productList: state.chargeConfig.productList,
  productPagination: state.chargeConfig.productPagination,
  spinning: state.chargeConfig.spinning,
})

const mapDispatch = dispatch => ({
  queryProductList: req => {
    const action = creators.queryProductListAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(Product);