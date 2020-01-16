import React, { Component } from 'react';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import SearchForm from './components/SearchForm';
import styles from './css/UserList.module.css';
import Oper from './components/Operation';

const columns = [

  { title: '配置项名称', dataIndex: 'settingExp', key: 'settingExp', align: 'center' },
  { title: '配置项字段', dataIndex: 'settingKey', key: 'settingKey', align: 'center' },
  { title: '配置项值', dataIndex: 'settingValue', key: 'settingValue', align: 'center' },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => <Oper text={text} record={record} />,
  },
];

class PlatSettingList extends Component {
  componentDidMount() {
    this.sendFn(1, 10)
  }

  paginationChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  paginationShowSizeChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  sendFn(pageNo, pageSize) {
    //const params = this.props.params
    const data = { pageNo, pageSize }
    this.props.querylist({ props: this.props, data });
  }

  render() {
    const list = this.props.list
    const pagination = {
      ...this.props.pagination,
      onChange: this.paginationChange,
      onShowSizeChange: this.paginationShowSizeChange,
    }

    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <SearchForm />
          <Table
            bordered
            columns={columns}
            dataSource={list}
            rowKey={(record, index) => index}
            size="small"
            pagination={pagination}
            rowClassName={styles.table}
          />
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  list: state.platSetting.list,
  pagination: state.platSetting.pagination,
  spinning: state.platSetting.spinning,
  params: state.platSetting.params,
})

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.querylistAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(PlatSettingList);