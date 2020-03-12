import React, { Component } from "react";
import { Table, Button, Spin, Icon } from "antd";
import { connect } from "react-redux";
import * as creators from "./store/creators";
import Oper from "./components/Operation";
import styles from "./css/UserList.module.css";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "机构名称",
    dataIndex: "orgName",
    key: "orgName"
  },
  {
    title: "机构编码",
    dataIndex: "orgCode",
    key: "orgCode"
  },
  {
    title: "机构描述",
    dataIndex: "orgDesc",
    key: "orgDesc",
    align: "center"
  },

  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    render: (text, record) => <Oper text={text} record={record} />
  }
];

class OrgList extends Component {
  componentDidMount() {
    this.sendFn(1, 10);
  }

  paginationChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize);
  };

  paginationShowSizeChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize);
  };

  sendFn(pageNo, pageSize) {
    const params = this.props.params;
    const data = { ...params, pageNo, pageSize };
    this.props.queryOrgList({ props: this.props, data });
  }

  render() {
    const list = this.props.list;
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className={styles.buttonForm}>
            <Link
              to={{ pathname: "/org/orgAdd", state: { list: this.props.list } }}
            >
              <Button type="primary" className={styles.addButton}>
                <Icon type="plus" />
                新增
              </Button>
            </Link>
          </div>
          <Table
            bordered
            expandIconAsCell={true}
            columns={columns}
            dataSource={list}
            rowKey={record => record.id}
            size="small"
            pagination={false}
          />
        </Spin>
      </div>
    );
  }
}

const mapState = state => ({
  list: state.org.list,
  spinning: state.org.spinning
});

const mapDispatch = dispatch => ({
  queryOrgList: req => {
    const action = creators.queryOrgListAction(req);
    dispatch(action);
  }
});
export default connect(mapState, mapDispatch)(OrgList);
