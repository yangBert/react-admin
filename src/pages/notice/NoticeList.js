import React, { Component } from 'react';
import { Table, Spin, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import SearchForm from './components/SearchForm';
import styles from './css/UserList.module.css';
import { Link } from 'react-router-dom';
import $$ from 'static/js/base';
import Oper from './components/Operation';
import config from './config';

const columns = [
  { title: '标题', dataIndex: 'title', key: 'title' },
  { title: '创建人', dataIndex: 'createrName', key: 'createrName', align: 'center' },
  {
    title: '发布人', dataIndex: 'publisherName', key: 'publisherName', align: 'center',
    render: publisherName => (
      <span>{publisherName ? publisherName : "--"}</span>
    )
  },
  {
    title: '发布时间', dataIndex: 'publishTime', key: 'publishTime', align: 'center',
    render: publishTime => (
      <span>{publishTime ? $$.getHours(publishTime) : "--"}</span>
    )
  },
  {
    title: '发布状态', dataIndex: 'state', key: 'state', align: 'center',
    render: state => (
      <span>{state && config.state.get(state)}</span>
    )
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => <Oper text={text} record={record} />,
  },
];

class NoticeList extends Component {
  componentDidMount() {
    this.sendFn(1, 10)
    this.props.changeEditTitle("");
    this.props.changeEditNoticeType("");
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
    this.props.queryNoticelist({ props: this.props, data });
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
          <div className={styles.buttonForm}>
            <Link to="/notice/noticeAdd">
              <Button
                type="primary"
                className={styles.addButton}
              ><Icon type="plus" />新增</Button>
            </Link>
          </div>
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
  list: state.notice.list,
  pagination: state.notice.pagination,
  spinning: state.notice.spinning,
  params: state.notice.params,
})

const mapDispatch = dispatch => ({
  queryNoticelist: req => {
    const action = creators.queryNoticelistAction(req);
    dispatch(action);
  },
  changeEditTitle: req => {
    const action = creators.changeEditTitleAction(req);
    dispatch(action);
  },
  changeEditNoticeType: req => {
    const action = creators.changeEditNoticeTypeAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(NoticeList);