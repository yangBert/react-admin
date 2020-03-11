import React, { Component } from "react";
import { Table, Spin, Button, Icon, Tag } from "antd";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as creators from "./store/creators";
import styles from "./css/UserList.module.css";
import Oper from "./components/Operation";
import SearchForm from "./components/SearchForm";
import * as config from "./config";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";

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
    title: "产品类型",
    dataIndex: "productTypeCode",
    key: "productDesc",
    align: "center"
  },
  {
    title: "产品价格",
    dataIndex: "productPrice",
    key: "productPrice",
    align: "center",
    render: productPrice => (
      <span>{productPrice && Number(productPrice).toFixed(2)}</span>
    )
  },
  {
    title: "产品状态",
    dataIndex: "status",
    key: "status",
    align: "center",

    render: status => (
      <Tag
        color={
          status === config.status.NORMAL
            ? "green"
            : status === config.status.INVILD
            ? "#ccc"
            : ""
        }
      >
        {config.status.get(status)}
      </Tag>
    )
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    render: (text, record) => <Oper text={text} record={record} />
  }
];

class ProductList extends Component {
  componentDidMount() {
    //查询所有产品类型
    this.props.getProductType({ props: this.props, data: {} });

    this.sendFn(1, 10);
    this.props.setProductName("");
    this.props.setProductPrice(0);
    this.props.setProductPaying("");
    this.props.setProductTypeCode("");
    this.props.setEditContent(BraftEditor.createEditorState(""));
    this.props.setProductRemark("");
    this.props.setTag("");
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
    //this.props.queryDictlist({ props: this.props, data });
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
            <Link
              to={{
                pathname: "/product/add",
                state: { allProductType: this.props.allProductType }
              }}
            >
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
          />
        </Spin>
      </div>
    );
  }
}

const mapState = state => ({
  list: state.product.list,
  pagination: state.product.pagination,
  spinning: state.product.spinning,
  params: state.product.params,
  allProductType: state.product.allProductType
});

const mapDispatch = dispatch => ({
  queryList: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  getProductType: req => {
    const action = creators.getProductTypeAction(req);
    dispatch(action);
  },
  setProductName: req => {
    const action = creators.setProductNameAction(req);
    dispatch(action);
  },
  setEditContent: req => {
    const action = creators.setEditContentAction(req);
    dispatch(action);
  },
  setProductPrice: req => {
    const action = creators.setProductPriceAction(req);
    dispatch(action);
  },
  setProductPaying: req => {
    const action = creators.setProductPayingAction(req);
    dispatch(action);
  },
  setProductTypeCode: req => {
    const action = creators.setProductTypeCodeAction(req);
    dispatch(action);
  },
  setProductRemark: req => {
    const action = creators.setProductRemarkAction(req);
    dispatch(action);
  },
  setTag: req => {
    const action = creators.setTagAction(req);
    dispatch(action);
  }
});

export default withRouter(connect(mapState, mapDispatch)(ProductList));
