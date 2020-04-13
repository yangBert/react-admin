import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import styles from './css/UserList.module.css';
import $$ from 'static/js/base';
import Oper from './components/Operation';
import SearchForm from './components/SearchForm';
import { connect } from "react-redux";
import * as creators from "./store/creators";

const { Column, ColumnGroup } = Table;

const data = [
  {
    key: '0',
    type1: '123',
    type2: '563',
    type3: '567',
    type4: '33',
    type5: '21',
    v0: '省级互联网统一身份认证平台',
    v1: '123',
    v2: '345',
    v3: '345345',
    v4: '10000',
    v5: '123123',
    tags: ['loser'],
  },
  {
    key: '0',
    type1: '123',
    type2: '563',
    type3: '567',
    type4: '33',
    type5: '21',
    v0: '大数据分析系统',
    v1: '123',
    v2: '345',
    v3: '345345',
    v4: '10000',
    v5: '123123',
    tags: ['loser'],
  },
  {
    key: '0',
    type1: '123',
    type2: '563',
    type3: '567',
    type4: '33',
    type5: '21',
    v0: '贵州云应用系统',
    v1: '123',
    v2: '345',
    v3: '345345',
    v4: '10000',
    v5: '123123',
    tags: ['loser'],
  },
  {
    key: '0',
    type1: '123',
    type2: '563',
    type3: '567',
    type4: '33',
    type5: '21',
    v0: '中国大数据分析DATA',
    v1: '123',
    v2: '345',
    v3: '345345',
    v4: '10000',
    v5: '123123',
    tags: ['loser'],
  },
  {
    key: '0',
    type1: '123',
    type2: '563',
    type3: '567',
    type4: '33',
    type5: '21',
    v0: '实体物流系统',
    v1: '123',
    v2: '345',
    v3: '345345',
    v4: '10000',
    v5: '123123',
    tags: ['loser'],
  },
  {
    key: '0',
    type1: '123',
    type2: '563',
    type3: '567',
    type4: '33',
    type5: '21',
    v0: '物联网系统',
    v1: '10',
    v2: '345',
    v3: '2312',
    v4: '111',
    v5: '10000',
    tags: ['loser'],
  },
  {
    key: '0',
    type1: '121233',
    type2: '100',
    type3: '400',
    type4: '33',
    type5: '100',
    v0: '云医疗系统',
    v1: '109',
    v2: '1000',
    v3: '11',
    v4: '2341',
    v5: '123123',
    tags: ['loser'],
  },
];

class List extends Component {
  componentDidMount() {
    this.props.querylist({
      props: this.props,
      data: {}
    })
  }
  render() {
    console.log(this.props.list)
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <SearchForm />
        <Table
          dataSource={this.props.tableList}
          bordered
          pagination={false}
          rowKey={(record, index) => index}
        >
          <Column title="应用名称" dataIndex="v0" key="v0" align='center' />
          <ColumnGroup title="操作类型">
            {
              this.props.typesList.map(item => <Column title={item.operTypeName} dataIndex={item.operType} key={item.operType} />)
            }
          </ColumnGroup>
          <Column title="合计次数" dataIndex="v1" key="v1" />
          <Column title="应激金额" dataIndex="v2" key="v2" />
          <Column title="优惠金额" dataIndex="v3" key="v3" />
          <Column title="实际应激" dataIndex="v4" key="v4" />
          <Column title="账户余额" dataIndex="v5" key="v5" />
          <Column
            title="操作"
            dataIndex="tags"
            key="tags"
            render={tags => (
              <span>
                详情
              </span>
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
});

export default connect(mapState, mapDispatch)(List);