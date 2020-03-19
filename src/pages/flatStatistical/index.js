import React, { Component } from 'react';
import { Table } from 'antd';
import styles from './css/UserList.module.css';
import SearchForm from './components/SearchForm'

const { Column } = Table;

const data = [
  {
    key: '0',
    v0: '省级互联网统一身份认证平台',
    v1: '404',
    v2: '345',
    v3: '345345',
  },
  {
    key: '0',
    v0: '大数据分析系统',
    v1: '756',
    v2: '345',
    v3: '20020',
  },
  {
    key: '0',
    v0: '贵州云应用系统',
    v1: '900',
    v2: '345',
    v3: '2031',
  },
  {
    key: '0',
    v0: '中国大数据分析DATA',
    v1: '567',
    v2: '345',
    v3: '6012',
  },
  {
    key: '0',
    v0: '实体物流系统',
    v1: '43',
    v2: '345',
    v3: '3026',
  },
  {
    key: '0',
    v0: '物联网系统',
    v1: '110',
    v2: '345',
    v3: '800',
  },
  {
    key: '0',
    v0: '云医疗系统',
    v1: '109',
    v2: '1000',
    v3: '95006',
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
          <Column title="合计次数" dataIndex="v1" key="v1" align='center' />
          <Column title="应激金额" dataIndex="v2" key="v2" align='center' />
          <Column title="优惠金额" dataIndex="v3" key="v3" align='center' />
        </Table>
      </div >
    )
  }
}


export default List;