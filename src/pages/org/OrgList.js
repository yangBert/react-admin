import React, { Component } from 'react';
import { Table, Button, Spin, Icon, Tag } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import Oper from './components/Operation';
import Add from './components/Add';
import Edit from './components/Edit';
import styles from './css/UserList.module.css';

const columns = [
  {
    title: '机构名称',
    dataIndex: 'orgName',
    key: 'orgName',
  },
  {
    title: '机构编码',
    dataIndex: 'orgCode',
    key: 'orgCode',
  },
  {
    title: '机构描述',
    dataIndex: 'orgDesc',
    key: 'orgDesc',
    align: 'center'
  },

  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => <Oper text={text} record={record} />,
  },
];

class OrgList extends Component {
  componentDidMount() {
    this.props.queryOrgList({ props: this.props, data: {} });
  }

  render() {
    const list = this.props.list

    return (
      <div className={`${styles.pageContet} pageContentColor`}>

        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className={styles.buttonForm}>
            <Button
              type="primary"
              className={styles.addButton}
              onClick={() => this.props.changeAddModalvisible(true)}
            ><Icon type="plus" />新增</Button>
          </div>
          <Table
            bordered
            expandIconAsCell={true}
            columns={columns}
            dataSource={list}
            rowKey={record => record.orgCode}
            size="small"
            pagination={false}
          />
        </Spin>
        <Add />
        <Edit />
      </div >
    )
  }
}

const mapState = state => ({
  list: state.menu.list,
  spinning: state.menu.spinning,
  addModalvisible: state.menu.addModalvisible,
})

const mapDispatch = dispatch => ({
  queryOrgList: req => {
    const action = creators.queryOrgListAction(req);
    dispatch(action);
  },
  changeAddModalvisible: visible => {
    const action = creators.changeAddModalvisibleAction(visible);
    dispatch(action);
  }
})
export default connect(mapState, mapDispatch)(OrgList);