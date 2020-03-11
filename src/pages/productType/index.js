import React, { Component } from "react";
import { Table, Button, Spin, Icon, Tag } from "antd";
import { connect } from "react-redux";
import * as creators from "./store/creators";
import Oper from "./components/Operation";
import Add from "./components/Add";
import Edit from "./components/Edit";
import styles from "./css/UserList.module.css";
import * as enumerate from "static/js/enumerate";

const columns = [
  {
    title: "产品类型编码",
    dataIndex: "productTypeCode",
    key: "productTypeCode"
  },
  {
    title: "产品类型名称",
    dataIndex: "productTypeName",
    key: "productTypeName"
  },
  {
    title: "菜单状态",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: status => (
      <span>
        {status === "NORMAL" ? (
          <Tag color="green">已启用</Tag>
        ) : (
          <Tag color="red">{enumerate.baseState.get(status)}</Tag>
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

class List extends Component {
  componentDidMount() {
    this.props.queryMenuList({ props: this.props, data: {} });
  }

  render() {
    const list = this.props.list;

    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className={styles.buttonForm}>
            <Button
              type="primary"
              className={styles.addButton}
              onClick={() => this.props.changeAddModalvisible(true)}
            >
              <Icon type="plus" />
              新增
            </Button>
          </div>
          <Table
            bordered
            expandIconAsCell={true}
            columns={columns}
            dataSource={list}
            rowKey={record => record.key}
            size="small"
            pagination={false}
          />
        </Spin>
        <Add />
        <Edit />
      </div>
    );
  }
}

const mapState = state => ({
  list: state.productType.list,
  spinning: state.productType.spinning,
  addModalvisible: state.productType.addModalvisible
});

const mapDispatch = dispatch => ({
  queryMenuList: req => {
    const action = creators.queryMenuAction(req);
    dispatch(action);
  },
  changeAddModalvisible: visible => {
    const action = creators.changeAddModalvisibleAction(visible);
    dispatch(action);
  }
});
export default connect(mapState, mapDispatch)(List);
