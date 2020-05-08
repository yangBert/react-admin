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
    this.props.querylist({
      props: this.props,
      data: {}
    })
  }
  render() {
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <SearchForm />
        <Table
          dataSource={this.props.tableList}
          bordered
          pagination={false}
          rowKey={(record, index) => index}
          size="middle"
        >
          <Column title="应用名称" dataIndex="applicationName" key="applicationName" />
          <ColumnGroup title="登录类型">
            {
              this.props.typesList.map(item => <Column
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
            key="sumTotal"
            align='center'
            render={text => (
              <span style={blueStyle}>{text}</span>
            )}
          />
          <Column
            title="应激金额"
            dataIndex="total"
            align='center'
            key="total"
            render={text => (
              <span style={redStyle}>{text}</span>
            )}
          />
          <Column
            title="优惠金额"
            dataIndex="preferentialMoney"
            align='center'
            key="preferentialMoney"
            render={text => (
              <span style={redStyle}>{text}</span>
            )}
          />
          <Column
            title="实际应激"
            dataIndex="actPayMoney"
            align='center'
            key="actPayMoney"
            render={text => (
              <span style={redStyle}>{text}</span>
            )}
          />
          <Column
            title="账户余额"
            dataIndex="balanceMoney"
            align='center'
            key="balanceMoney"
            render={text => (
              <span style={redStyle}>{text ? text : 0}</span>
            )}
          />
          <Column
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
          />

        </Table>
      </div >
    )
  }
}

const mapState = state => ({
  typesList: state.appStatistical.typesList,
  tableList: state.appStatistical.tableList,
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