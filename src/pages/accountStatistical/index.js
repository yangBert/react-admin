import React, { Component } from 'react';
import { Table } from 'antd';
import styles from './css/UserList.module.css';
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
    v0: '张三',
    v1: '503',
    v2: '100',
    v3: '1202',
    v4: '10000',
    v5: '1000000',
    tags: ['loser'],
  },
  {
    key: '0',
    type1: '123',
    type2: '563',
    type3: '567',
    type4: '33',
    type5: '21',
    v0: '李四',
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
    v0: '王二',
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
    v0: '麻子',
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
    v0: '朱六',
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
    v0: '凌老大',
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
    v0: '卓七',
    v1: '6000',
    v2: '100000',
    v3: '20120',
    v4: '602',
    v5: '3000002',
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
          <Column title="用户名" dataIndex="v0" key="v0" align='center' />
          <ColumnGroup title="使用产品">
            <Column title="人脸识别" dataIndex="type1" key="type1" />
            <Column title="手机号" dataIndex="type2" key="type2" />
            <Column title="加密" dataIndex="type3" key="type3" />
            <Column title="解密" dataIndex="type4" key="type4" />
            <Column title="签名验签" dataIndex="type5" key="type5" />
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
              <div>
                <span>详情</span>&nbsp;
                <span>缴费</span>
              </div>
            )}
          />

        </Table>
      </div >
    )
  }
}


export default List;