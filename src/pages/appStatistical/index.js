import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';
import styles from './css/UserList.module.css';
import $$ from 'static/js/base';
import Oper from './components/Operation';
import SearchForm from './components/SearchForm'

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

  render() {

    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <SearchForm />
        <Table
          dataSource={data}
          bordered
          pagination={false}
          rowKey={(record, index) => index}
        >
          <Column title="应用名称" dataIndex="v0" key="v0" align='center' />
          <ColumnGroup title="操作类型">
            <Column title="人脸识别" dataIndex="type1" key="type1" />
            <Column title="手机号" dataIndex="type2" key="type2" />
            <Column title="手机盾" dataIndex="type3" key="type3" />
            <Column title="usbKey" dataIndex="type4" key="type4" />
            <Column title="微信" dataIndex="type5" key="type5" />
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


export default List;