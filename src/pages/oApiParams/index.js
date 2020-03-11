import React, { Component } from "react";
import { Table, Spin, Button, Icon } from "antd";
import { connect } from "react-redux";
import * as creators from "./store/creators";
import styles from "./css/UserList.module.css";
import Oper from "./components/Operation";
import { Link } from "react-router-dom";

const columns = [
  { title: "参数编码", dataIndex: "paramId", key: "paramId", align: "center" },
  {
    title: "参数名称",
    dataIndex: "paramName",
    key: "paramName",
    align: "center"
  },
  {
    title: "参数类型",
    dataIndex: "paramType",
    key: "paramType",
    align: "center"
  },

  {
    title: "是否必传",
    dataIndex: "isNess",
    key: "isNess",
    align: "center",
    render: isNess => <span>{isNess === "true" ? "是" : "否"}</span>
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
    const { apiId } = this.props.location.state.record;
    this.props.querylist({ props: this.props, data: { apiId } });
  }

  render() {
    const list = this.props.list;
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className={styles.buttonForm}>
            <Link
              to={{
                pathname: "/oApiParams/add",
                state: { apiId: this.props.location.state.record.apiId }
              }}
            >
              <Button type="primary" className={styles.addButton}>
                <Icon type="plus" />
                新增
              </Button>
            </Link>
            <Link
              to={{
                pathname: "/oApi/list"
              }}
            >
              <Button type="primary" className={styles.addButton}>
                <Icon type="rollback" />
                返回
              </Button>
            </Link>
          </div>
          <Table
            bordered
            columns={columns}
            dataSource={list}
            rowKey={(record, index) => index}
            rowClassName={styles.table}
            pagination={false}
          />
        </Spin>
      </div>
    );
  }
}

const mapState = state => ({
  list: state.oApiParams.list,
  pagination: state.oApiParams.pagination,
  spinning: state.oApiParams.spinning,
  params: state.oApiParams.params
});

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(List);
