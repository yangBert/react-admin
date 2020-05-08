import React, { Component } from 'react';
import { Table, Icon, Popconfirm } from 'antd';
import styles from './css/UserList.module.css';
import SearchForm from './components/SearchForm';
import { connect } from "react-redux";
import * as creators from "./store/creators";

const { Column, ColumnGroup } = Table;

const blueStyle = {
  color: "#3E8FFD",
  fontWeight: "bold"
}

const redStyle = {
  color: "red",
  fontWeight: "bold"
}

class List extends Component {
  componentDidMount() {
    this.sendFn(1, 10)
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
    this.props.querylist({ props: this.props, data });
  }
  render() {
    const tableList = this.props.tableList;
    const pagination = {
      ...this.props.pagination,
      onChange: this.paginationChange,
      onShowSizeChange: this.paginationShowSizeChange
    };
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <SearchForm />
        <Table
          dataSource={tableList}
          bordered
          pagination={pagination}
          rowKey={(record, index) => index}
          size="middle"
          scroll={{ x: 1200, y: 0 }}
        >
          <Column
            title="账户名称"
            dataIndex="accountName"
            key="accountName"
            fixed='left'
            width={100}
            className={styles.column}
          />
          <ColumnGroup title="类型">
            {
              this.props.typesList.map(item => <Column
                className={styles.column}
                title={item.operTypeName}
                align='center'
                dataIndex={item.operType}
                key={item.operType}

                render={text => (
                  <span style={blueStyle}>
                    {text}
                  </span>
                )}
                style={{ border: "2px solid red" }}
              />)
            }
          </ColumnGroup>
          <Column
            title="合计次数"
            dataIndex="sumTotal"
            className={styles.column}
            key="sumTotal"
            align='center'
            render={text => (
              <span style={blueStyle}>{text}</span>
            )}
          />
          <Column
            title="应激金额"
            dataIndex="total"
            className={styles.column}
            align='center'
            key="total"
            render={text => (
              <span style={redStyle}>{text}</span>
            )}
          />
          <Column
            title="优惠金额"
            dataIndex="preferentialMoney"
            className={styles.column}
            align='center'
            key="preferentialMoney"
            render={text => (
              <span style={redStyle}>{text}</span>
            )}
          />
          <Column
            title="实际应激"
            dataIndex="actPayMoney"
            className={styles.column}
            align='center'
            key="actPayMoney"
            render={text => (
              <span style={redStyle}>{text}</span>
            )}
          />
          <Column
            fixed='right'
            width={80}
            title="账户余额"
            className={styles.column}
            dataIndex="balanceMoney"
            align='center'
            key="balanceMoney"
            render={text => (
              <span style={redStyle}>{text ? text : 0}</span>
            )}
          />
          {/* <Column
            fixed='right'
            title="操作"
            dataIndex="tags"
            key="tags"
            align='center'
            render={(text, record) => (
              record.actPayMoney > 0 && record.balanceMoney - record.actPayMoney > 0 ?
                <Popconfirm
                  placement="left"
                  title="确定缴费吗?"
                  onConfirm={() => {
                    const { actPayMoney, accountCode } = record
                    this.props.consume({
                      props: this.props,
                      data: { consumeMoney: actPayMoney, accountCode }
                    })
                  }}
                  okText="确定"
                  icon={<Icon type="question-circle" />}
                  cancelText="取消"
                ><a>缴费</a> </Popconfirm>
                : ""
            )}
          /> */}

        </Table>
      </div >
    )
  }
}

const mapState = state => ({
  typesList: state.accountStatistical.typesList,
  tableList: state.accountStatistical.tableList,
  pagination: state.accountStatistical.pagination,
});

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  consume: req => {
    const action = creators.consumeAction(req);
    dispatch(action);
  },
});

export default connect(mapState, mapDispatch)(List);